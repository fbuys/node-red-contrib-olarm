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

    this.on("input", function (msg, send, done) {
      // do something with 'msg'
      node.send(msg);

      // Once finished, call 'done'.
      // This call is wrapped in a check that 'done' exists
      // so the node will work in earlier versions of Node-RED (<1.0)
      if (done) {
        done();
      }
    });

    this.on("close", function () {
      // tidy up any state
    });
  }

  RED.nodes.registerType("olarm", OlarmNode);
};
