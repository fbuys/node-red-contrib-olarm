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

  status() {
    this.#getDevice();
    const result = Utils.pick(this.#device, [
      "deviceId",
      "deviceName",
      "deviceStatus",
    ]);
    result["zones"] = this.#zones();
    return result;
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

    debugger;
    return zones.reduce((acc, cur, i) => {
      // label = zonesLabels[i]
      return Object.assign(acc, { [zonesLabels[i]]: zones[i] });
    }, {});
  }
}

module.exports = Olarm;
