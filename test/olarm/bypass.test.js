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

const Utils = require("../../lib/utils.js");
const mockDevice = require("../mocks/device.js");
const { getNode } = require("../support/node_red_helpers.js");
const {
  mswSetup,
  mswTeardown,
  testSetup,
  testTeardown,
} = require("../support/test_helper.js");

describe("olarm.bypass", () => {
  beforeAll(mswSetup);
  afterAll(mswTeardown);
  beforeEach(testSetup);
  afterEach(testTeardown);

  describe("when bypassing", () => {
    it("bypasses zones and sends the updated status", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      n.receive({ payload: "2,3", topic: "zone-bypass" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toEqual({
        deviceId: "deviceId",
        deviceName: "name",
        deviceStatus: "online",
        zones: [
          { label: "Zone 01", state: "c" },
          { label: "Zone 02", state: "b" },
          { label: "Zone 03", state: "b" },
          { label: "Zone 04", state: "c" },
          { label: "Zone 05", state: "c" },
          { label: "Zone 06", state: "c" },
          { label: "Zone 07", state: "c" },
          { label: "Zone 08", state: "c" },
          { label: "Zone 09", state: "c" },
          { label: "Zone 10", state: "c" },
          { label: "Zone 11", state: "c" },
          { label: "Zone 12", state: "c" },
          { label: "Zone 13", state: "c" },
          { label: "Zone 14", state: "c" },
          { label: "Zone 15", state: "c" },
          { label: "Zone 16", state: "c" },
        ],
      });
    });

    it("does not unbypass when duplicate payload zones are provided", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      n.receive({ payload: "1,1", topic: "zone-bypass" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toEqual({
        deviceId: "deviceId",
        deviceName: "name",
        deviceStatus: "online",
        zones: [
          { label: "Zone 01", state: "b" },
          { label: "Zone 02", state: "c" },
          { label: "Zone 03", state: "c" },
          { label: "Zone 04", state: "c" },
          { label: "Zone 05", state: "c" },
          { label: "Zone 06", state: "c" },
          { label: "Zone 07", state: "c" },
          { label: "Zone 08", state: "c" },
          { label: "Zone 09", state: "c" },
          { label: "Zone 10", state: "c" },
          { label: "Zone 11", state: "c" },
          { label: "Zone 12", state: "c" },
          { label: "Zone 13", state: "c" },
          { label: "Zone 14", state: "c" },
          { label: "Zone 15", state: "c" },
          { label: "Zone 16", state: "c" },
        ],
      });
    });

    it("bypasses only unbypassed zones", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      mockDevice.bypassZone("1");
      n.receive({ payload: "1, 2", topic: "zone-bypass" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toEqual({
        deviceId: "deviceId",
        deviceName: "name",
        deviceStatus: "online",
        zones: [
          { label: "Zone 01", state: "b" },
          { label: "Zone 02", state: "b" },
          { label: "Zone 03", state: "c" },
          { label: "Zone 04", state: "c" },
          { label: "Zone 05", state: "c" },
          { label: "Zone 06", state: "c" },
          { label: "Zone 07", state: "c" },
          { label: "Zone 08", state: "c" },
          { label: "Zone 09", state: "c" },
          { label: "Zone 10", state: "c" },
          { label: "Zone 11", state: "c" },
          { label: "Zone 12", state: "c" },
          { label: "Zone 13", state: "c" },
          { label: "Zone 14", state: "c" },
          { label: "Zone 15", state: "c" },
          { label: "Zone 16", state: "c" },
        ],
      });
    });
  });

  describe("when unbypassing", () => {
    it("unbypasses zones and sends the updated status", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      mockDevice.bypassZone("1");
      mockDevice.bypassZone("2");
      n.receive({ payload: "2,3", topic: "zone-unbypass" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toEqual({
        deviceId: "deviceId",
        deviceName: "name",
        deviceStatus: "online",
        zones: [
          { label: "Zone 01", state: "b" },
          { label: "Zone 02", state: "c" },
          { label: "Zone 03", state: "c" },
          { label: "Zone 04", state: "c" },
          { label: "Zone 05", state: "c" },
          { label: "Zone 06", state: "c" },
          { label: "Zone 07", state: "c" },
          { label: "Zone 08", state: "c" },
          { label: "Zone 09", state: "c" },
          { label: "Zone 10", state: "c" },
          { label: "Zone 11", state: "c" },
          { label: "Zone 12", state: "c" },
          { label: "Zone 13", state: "c" },
          { label: "Zone 14", state: "c" },
          { label: "Zone 15", state: "c" },
          { label: "Zone 16", state: "c" },
        ],
      });
    });

    it("does not bypass again when duplicate payload zones are provided", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      mockDevice.bypassZone("1");
      n.receive({ payload: "1,1", topic: "zone-unbypass" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toEqual({
        deviceId: "deviceId",
        deviceName: "name",
        deviceStatus: "online",
        zones: [
          { label: "Zone 01", state: "c" },
          { label: "Zone 02", state: "c" },
          { label: "Zone 03", state: "c" },
          { label: "Zone 04", state: "c" },
          { label: "Zone 05", state: "c" },
          { label: "Zone 06", state: "c" },
          { label: "Zone 07", state: "c" },
          { label: "Zone 08", state: "c" },
          { label: "Zone 09", state: "c" },
          { label: "Zone 10", state: "c" },
          { label: "Zone 11", state: "c" },
          { label: "Zone 12", state: "c" },
          { label: "Zone 13", state: "c" },
          { label: "Zone 14", state: "c" },
          { label: "Zone 15", state: "c" },
          { label: "Zone 16", state: "c" },
        ],
      });
    });

    it("unbypasses only bypassed zones", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      mockDevice.bypassZone("1");
      n.receive({ payload: "1, 2", topic: "zone-unbypass" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toEqual({
        deviceId: "deviceId",
        deviceName: "name",
        deviceStatus: "online",
        zones: [
          { label: "Zone 01", state: "c" },
          { label: "Zone 02", state: "c" },
          { label: "Zone 03", state: "c" },
          { label: "Zone 04", state: "c" },
          { label: "Zone 05", state: "c" },
          { label: "Zone 06", state: "c" },
          { label: "Zone 07", state: "c" },
          { label: "Zone 08", state: "c" },
          { label: "Zone 09", state: "c" },
          { label: "Zone 10", state: "c" },
          { label: "Zone 11", state: "c" },
          { label: "Zone 12", state: "c" },
          { label: "Zone 13", state: "c" },
          { label: "Zone 14", state: "c" },
          { label: "Zone 15", state: "c" },
          { label: "Zone 16", state: "c" },
        ],
      });
    });
  });
});
