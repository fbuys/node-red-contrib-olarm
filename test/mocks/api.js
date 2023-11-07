const { setupServer } = require("msw/node");
const { http, HttpResponse } = require("msw");

const handlers = [
  http.get("https://apiv4.olarm.co/api/v4/devices", () => {
    return HttpResponse.json({
      page: 1,
      pageLength: 40,
      pageCount: 1,
      search: "",
      data: [
        {
          deviceId: "id",
          deviceName: "name",
          deviceSerial: "serial",
          deviceAlarmType: "type",
          deviceAlarmTypeDetail: null,
          deviceTimestamp: 1699392337904,
          deviceStatus: "online",
          deviceState: [Object],
          deviceProfile: [Object],
          deviceTriggers: [Object],
          deviceTimezone: "Africa/Harare",
          deviceFirmware: "3003.00000500000",
        },
      ],
    });
  }),

  http.get("https://apiv4.olarm.co/api/v4/devices/:deviceId", ({ params }) => {
    return HttpResponse.json({
      deviceId: params.deviceId,
      deviceName: "Olarm",
      deviceSerial: "olarm-serial",
      deviceAlarmType: "paradox",
      deviceAlarmTypeDetail: null,
      deviceTimestamp: new Date().getTime(),
      deviceStatus: "online",
      deviceState: {
        timestamp: new Date().getTime(),
        cmdRecv: 0,
        type: "",
        areas: ["stay"],
        areasDetail: [""],
        areasStamp: [1699384151993],
        zones: [
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
          "c",
        ],
        zonesStamp: [
          1699384099000, 1699378957589, 1699384102751, 1696999972614,
          1696999972615, 1699378237664, 1699360237150, 1698076808996,
          1698762599361, 1699392937920, 1699388197793, 1696420597217,
          1696420597218, 1696420597219, 1696420597220, 1696420597221,
        ],
        pgm: ["c", "c", "c", "c", "c", "c", "c", "c"],
        pgmOb: ["c", "c"],
        ukeys: [],
        power: { AC: "1", Batt: "1" },
      },
      deviceProfile: {
        ver: 1,
        areasLimit: 2,
        areasLabels: ["Home", ""],
        zonesLimit: 16,
        zonesLabels: [
          "Zone 01",
          "Zone 02",
          "Zone 03",
          "Zone 04",
          "Zone 05",
          "Zone 06",
          "Zone 07",
          "Zone 08",
          "Zone 09",
          "Zone 10",
          "Zone 11",
          "Zone 12",
          "Zone 13",
          "Zone 14",
          "Zone 15",
          "Zone 16",
          "Zone 17",
          "Zone 18",
          "Zone 19",
          "Zone 20",
          "Zone 21",
          "Zone 22",
          "Zone 23",
          "Zone 24",
          "Zone 25",
          "Zone 26",
          "Zone 27",
          "Zone 28",
          "Zone 29",
          "Zone 30",
          "Zone 31",
          "",
        ],
        zonesTypes: [
          0,
          0,
          "",
          90,
          90,
          90,
          90,
          20,
          20,
          21,
          0,
          90,
          90,
          90,
          90,
          90,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        pgmLimit: 8,
        pgmLabels: [
          "Panic Radio",
          "Burglary Radio",
          "Status LED",
          "Open/Close Radio",
          "Output 05",
          "Output 06",
          "Output 07",
          "Output 08",
          "",
          "",
          "Output 11",
        ],
        pgmControl: ["000", "000", "000", "000", "000", "000", "000", "000"],
        pgmObLimit: 2,
        pgmObLabels: ["", ""],
        pgmObControl: ["000", "000"],
        ukeysLimit: 16,
        ukeysLabels: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        ukeysControl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        doorsLimit: 4,
        doorsLabels: ["", "", "", ""],
      },
      deviceTriggers: {
        ver: 1,
        lastCheck: 0,
        areasRemind: [[Array], [Array]],
        zonesIdle: [0, 0],
        zonesWatch: [[Array], [Array], [Array]],
      },
      deviceTimezone: "Africa/Harare",
      deviceFirmware: "3003.00000500000",
    });
  }),
];

exports.server = setupServer(...handlers);
