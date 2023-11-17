const axios = require("axios");
const Utils = require("../utils.js");

class API {
  #api;
  constructor(token) {
    this.#api = axios.create({
      baseURL: "https://apiv4.olarm.co/api/v4",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // There is no need for throttling while testing
    if (process.env.TEST !== "true") {
      this.#api.interceptors.request.use(async function (req) {
        await Utils.delay(20000);
        return req;
      });
    }
  }

  async device(id) {
    const path = `/devices/${id}`;
    const { data } = await this.#api.get(path);
    return data;
  }

  async bypassZone(deviceId, zoneNumber) {
    const path = `/devices/${deviceId}/actions`;
    const { data } = await this.#api.post(path, {
      actionCmd: "zone-bypass",
      actionNum: zoneNumber,
    });
    return data;
  }

  // private
}

module.exports = API;
