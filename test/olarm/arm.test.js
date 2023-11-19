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
    it.each([["area-arm"], ["area-stay"], ["area-sleep"], ["area-disarm"]])(
      "%s the specific area",
      async (action) => {
        const n = await getNode("olarm1");
        n.send = vi.fn();

        n.receive({ payload: { [action]: "1" } });
        await Utils.delay(10);

        expect(n.send).toHaveBeenCalledTimes(1);
        expect(n.send.mock.calls[0][0]).toMatchObject({
          areas: [{ label: "Area 01", state: action.split("-")[1] }],
        });
      },
    );
  });

  describe("when arming and bypassing", () => {
    it("works", async () => {
      const n = await getNode("olarm1");
      n.send = vi.fn();

      n.receive({ payload: { "area-arm": "1", "zone-bypass": "2,3" } });
      await Utils.delay(10);

      expect(n.send).toHaveBeenCalledTimes(1);
      expect(n.send.mock.calls[0][0]).toMatchObject({
        areas: [{ label: "Area 01", state: "arm" }],
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
  });
});
