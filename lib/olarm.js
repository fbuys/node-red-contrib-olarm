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
    result["zones"] = this.#zones();
    return result;
  }

  async bypassZones(zoneNumbers) {
    // DUP-1: method very similar to unbypassZone
    await this.#getDevice();
    const results = [];
    const uniqZoneNumbers = [...new Set(zoneNumbers)];
    for (const num of uniqZoneNumbers) {
      if (this.#zone(num).state !== "b") {
        const result = await this.#api.bypassZone(this.#device.deviceId, num);
        results.push(result);
      }
    }
    return results;
  }

  async unbypassZones(zoneNumbers) {
    // DUP-1: method very similar to bypassZone
    await this.#getDevice();
    const results = [];
    const uniqZoneNumbers = [...new Set(zoneNumbers)];
    for (const num of uniqZoneNumbers) {
      if (this.#zone(num).state === "b") {
        const result = await this.#api.bypassZone(this.#device.deviceId, num);
        results.push(result);
      }
    }
    return results;
  }

  // private

  async #getDevice() {
    const { deviceId } = this.#device;
    this.#device = await this.#api.device(deviceId);
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
