const helper = require("node-red-node-test-helper");

const mockDevice = require("../mocks/device.js");
const { server } = require("../mocks/api.js");

const mswSetup = () => {
  server.listen({
    onUnhandledRequest: "error",
  });
  server.events.on("request:start", ({ request }) => {
    console.log("MSW intercepted:", request.method, request.url);
  });
};

const mswTeardown = () => {
  server.listen({
    onUnhandledRequest: "error",
  });
  server.events.on("request:start", ({ request }) => {
    console.log("MSW intercepted:", request.method, request.url);
  });
};

const testSetup = () => {
  mockDevice.reset();
  global.console = require("console");
};

const testTeardown = () => {
    helper.unload();
    server.resetHandlers();
};

module.exports = { mswSetup, mswTeardown, testSetup, testTeardown };
