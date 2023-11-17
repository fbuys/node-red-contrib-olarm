const helper = require("node-red-node-test-helper");

const Utils = require("../../lib/utils.js");
const olarmNode = require("../../olarm.js");

const DEFAULT_FLOW = [
  {
    id: "olarm1",
    type: "olarm",
    name: "",
    wires: [],
  },
];

const getNode = async (nodeId, flow = DEFAULT_FLOW) => {
  let node = null;
  await helper.load(
    olarmNode,
    flow,
    { olarm1: { token: "token", deviceId: "deviceId" } },
    () => {
      node = helper.getNode(nodeId);
    },
  );
  // wait for mocked api requests
  await Utils.delay(10);
  return node;
};

module.exports = { DEFAULT_FLOW, getNode };
