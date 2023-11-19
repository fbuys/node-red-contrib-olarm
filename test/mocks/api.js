const { setupServer } = require("msw/node");
const { http, HttpResponse } = require("msw");
const mockDevice = require("./device.js");

const handlers = [
  http.get("https://apiv4.olarm.co/api/v4/devices/:deviceId", ({ params }) => {
    const device = mockDevice.device({ deviceId: params.deviceId });
    return HttpResponse.json(device);
  }),

  http.post(
    "https://apiv4.olarm.co/api/v4/devices/:deviceId/actions",
    async ({ request }) => {
      const action = await request.json();

      mockDevice.action(action.actionCmd, action.actionNum)

      return HttpResponse.json({
        actionId: crypto.randomUUID(),
        actionStatus: "OK",
        actionMsg: "",
      });
    },
  ),
];

exports.server = setupServer(...handlers);
