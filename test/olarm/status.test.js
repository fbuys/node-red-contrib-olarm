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

describe("olarm.status", () => {
  beforeAll(mswSetup);
  afterAll(mswTeardown);
  beforeEach(testSetup);
  afterEach(testTeardown);

  it("updates the status on any input", async () => {
    const n = await getNode("olarm1");
    n.status = vi.fn();

    n.receive({ payload: "anything" });
    await Utils.delay(10);

    expect(n.status).toHaveBeenCalledTimes(1);
    expect(n.status.mock.calls[0][0]).toEqual({
      fill: "green",
      shape: "dot",
      text: " (online)",
    });
  });
});
