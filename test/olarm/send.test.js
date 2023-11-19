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
const { getNode } = require("../support/node_red_helpers.js");
const {
  mswSetup,
  mswTeardown,
  testSetup,
  testTeardown,
} = require("../support/test_helper.js");

describe("olarm.send", () => {
  beforeAll(mswSetup);
  afterAll(mswTeardown);
  beforeEach(testSetup);
  afterEach(testTeardown);

  it("sends the status on any input", async () => {
    const n = await getNode("olarm1");
    n.send = vi.fn();

    n.receive({ payload: "anything" });
    await Utils.delay(10);

    expect(n.send).toHaveBeenCalledTimes(1);
    expect(n.send.mock.calls[0][0]).toEqual({
      areas: [
        { label: "Area 01", state: "disarm" },
      ],
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
