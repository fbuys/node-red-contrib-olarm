module.exports = function (RED) {
  function OlarmNode(config) {
    RED.nodes.createNode(this, config);
    // If a node needs to log something to the console, it can use one of the following functions:
    // this.log("Something happened");
    // this.warn("Something happened you should know about");
    // this.error("Oh no, something bad happened");
    //
    // // Since Node-RED 0.17
    // this.trace("Log some internal detail not needed for normal operation");
    // this.debug("Log something more details for debugging the node's behaviour");
    //
    // node-specific code goes here

    const node = this;
    const token = this.credentials.token;
    const deviceId = this.credentials.deviceId;

    const Olarm = require("./lib/olarm.js");
    node.olarm = new Olarm(token, deviceId);
    node.olarm.status().then(updateStatus);

    this.on("input", async function (msg, send, done) {
      // Arm actions
      // TODO: Refactor global const for validArmTypes
      const validArmTypes = ["area-disarm", "area-stay", "area-sleep", "area-arm"];
      if (validArmTypes.includes(msg?.topic)) {
        // msg = {payload: '1,2', topic: 'area-arm'}
        const areasString = msg?.payload || "";
        const armAreasResult = await node.olarm.armAreas(
          msg.topic,
          areasString.split(","),
        );
      }

      // Bypass actions
      // DUP-2: if very similar to unbypass if
      if (msg?.topic === "zone-bypass") {
        // msg = {payload: '1,2', topic: 'bypass'}
        const zonesString = msg?.payload || "";
        const bypassZonesResult = await node.olarm.bypassZones(
          zonesString.split(","),
        );
      }
      // DUP-2: if very similar to bypass if
      if (msg?.topic === "zone-unbypass") {
        // msg = {payload: '1,2', topic: 'unbypass'}
        const zonesString = msg?.payload || "";
        const bypassZonesResult = await node.olarm.unbypassZones(
          zonesString.split(","),
        );
      }

      const status = await node.olarm.status();
      send(status);
      updateStatus(status);
      // Once finished, call 'done'.
      // This call is wrapped in a check that 'done' exists
      // so the node will work in earlier versions of Node-RED (<1.0)
      if (done) done();
    });

    this.on("close", function () {
      // tidy up any state
    });

    // End of node config
    function send(status) {
      node.send({ status });
    }

    function updateStatus(status) {
      const { deviceStatus } = status;
      const text = ` (${deviceStatus})`;
      let color = "";

      if (deviceStatus == "online") {
        color = "green";
      } else if (deviceStatus === "offline") {
        color = "red";
      } else {
        color = "yellow";
      }

      node.status({ fill: color, shape: "dot", text });
    }
  }

  RED.nodes.registerType("olarm", OlarmNode, {
    credentials: {
      token: { type: "text" },
      deviceId: { type: "text" },
    },
  });
};
