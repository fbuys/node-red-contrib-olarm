import {
  expect,
  it,
  describe,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
const helper = require("node-red-node-test-helper");

const olarmNode = require("../olarm.js");
const { server } = require("./mocks/api.js");

describe("olarm", () => {
  beforeAll(async () => {
    server.listen();
    server.events.on("request:start", ({ request }) => {
      console.log("MSW intercepted:", request.method, request.url);
    });
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    global.console = require("console");
  });

  afterEach(() => {
    helper.unload();
    server.resetHandlers();
  });

  const delay = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  let DEFAULT_FLOW = [
    {
      id: "olarm1",
      type: "olarm",
      name: "",
      wires: [],
    },
  ];

  const getNode = async (nodeId) => {
    let node = null;
    await helper.load(
      olarmNode,
      DEFAULT_FLOW,
      { olarm1: { token: "token", deviceId: "deviceId" } },
      () => {
        node = helper.getNode(nodeId);
      },
    );
    // wait for mocked api requests
    await delay(10);
    return node;
  };

  describe("send", () => {
    it("works", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      n.receive({ payload: "anything" });

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toEqual({
        deviceId: "deviceId",
        deviceName: "Olarm",
        deviceStatus: "online",
        zones: {
          "Zone 01": "c",
          "Zone 02": "c",
          "Zone 03": "c",
          "Zone 04": "c",
          "Zone 05": "c",
          "Zone 06": "c",
          "Zone 07": "c",
          "Zone 08": "c",
          "Zone 09": "c",
          "Zone 10": "c",
          "Zone 11": "c",
          "Zone 12": "c",
          "Zone 13": "c",
          "Zone 14": "c",
          "Zone 15": "c",
          "Zone 16": "c",
        },
      });
    });
  });

  describe("status", () => {
    it("works", async () => {
      const n = await getNode("olarm1");
      n.status = vi.fn();

      n.receive({ payload: "anything" });

      expect(n.status).toHaveBeenCalledTimes(1);
      expect(n.status.mock.calls[0][0]).toEqual({
        fill: "green",
        shape: "dot",
        text: " (online)",
      });
    });
  });
});
