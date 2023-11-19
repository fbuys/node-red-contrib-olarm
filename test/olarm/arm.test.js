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

describe("olarm.arm", () => {
  beforeAll(mswSetup);
  afterAll(mswTeardown);
  beforeEach(testSetup);
  afterEach(testTeardown);

  describe("when arming", () => {
    it("arms the specific area", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      n.receive({ payload: "1", topic: "area-arm" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toMatchObject({
        areas: [{ label: "Area 01", state: "arm" }],
      });
    });

    it("stay-arms the specific area", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      n.receive({ payload: "1", topic: "area-stay" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toMatchObject({
        areas: [{ label: "Area 01", state: "stay" }],
      });
    });

    it("sleep-arms the specific area", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      n.receive({ payload: "1", topic: "area-sleep" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toMatchObject({
        areas: [{ label: "Area 01", state: "sleep" }],
      });
    });
  });

  describe("when arming", () => {
    it("disarms the specific area", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      mockDevice.armArea("area-arm", "1");
      expect(mockDevice.device().deviceState.areas[0]).toBe("arm");

      n.receive({ payload: "1", topic: "area-disarm" });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toMatchObject({
        areas: [{ label: "Area 01", state: "disarm" }],
      });
    });
  });
});
