const API = require("./olarm/api.js");
const Utils = require("./utils.js");

class Olarm {
  #api;
  #device;
  constructor(token, deviceId) {
    this.#api = new API(token);
    this.#device = { deviceId };
    this.#getDevice();
  }

  async status() {
    await this.#getDevice();
    const result = Utils.pick(this.#device, [
      "deviceId",
      "deviceName",
      "deviceStatus",
    ]);
    result["areas"] = this.#areas();
    result["zones"] = this.#zones();
    return result;
  }

  async perform(actionType, actionArgs) {
    await this.#getDevice();
    const results = [];
    const actionNumbers = `${actionArgs}`.split(",");
    const uniqActionNumbers = [...new Set(actionNumbers)];
    const validArmTypes = [
      "area-disarm",
      "area-stay",
      "area-sleep",
      "area-arm",
    ];
    for (const num of uniqActionNumbers) {
      let result = null;
      if (validArmTypes.includes(actionType)) {
        result = await this.#api.armArea(
          this.#device.deviceId,
          actionType,
          num,
        );
      } else if (actionType === "zone-bypass") {
        if (this.#zone(num).state !== "b") {
          result = await this.#api.bypassZone(this.#device.deviceId, num);
        } else {
          result = `Zone (${num}) already bypassed, skipping.`;
        }
      } else if (actionType === "zone-unbypass") {
        if (this.#zone(num).state === "b") {
          result = await this.#api.bypassZone(this.#device.deviceId, num);
        } else {
          result = `Zone (${num}) already unbypassed, skipping.`;
        }
      }
      if (result === null) {
        throw new Error(
          `Invalid actionType (${actionType}) or actionArgs (${actionArgs})`,
        );
      }
      results.push(result);
    }
    return results;
  }

  // private

  async #getDevice() {
    const { deviceId } = this.#device;
    this.#device = await this.#api.device(deviceId);
  }

  #areas() {
    const {
      deviceState: { areas },
      deviceProfile: { areasLabels },
    } = this.#device;

    return areas.map((area, i) => {
      return { label: areasLabels[i], state: area };
    });
  }

  #zones() {
    const {
      deviceState: { zones },
      deviceProfile: { zonesLabels },
    } = this.#device;

    return zones.map((zone, i) => {
      return { label: zonesLabels[i], state: zone };
    });
  }

  #zone(ref) {
    const zones = this.#zones();
    if (typeof ref === "string" && Number.parseInt(ref)) {
      return zones[Number.parseInt(ref) - 1];
    }
  }
}

module.exports = Olarm;
