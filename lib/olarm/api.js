const axios = require("axios");

class API {
  #api;
  constructor(token) {
    this.#api = axios.create({
      baseURL: "https://apiv4.olarm.co/api/v4",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async device(id) {
    const path = `/devices/${id}`;
    const { data } = await this.#api.get(path);
    return data;
  }

  // private
}

module.exports = API;
