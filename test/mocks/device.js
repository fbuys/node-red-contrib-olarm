let mockDevice = {};

function action(actionCmd, actionNum) {
  const validBypassTypes = ["zone-bypass", "zone-unbypass"];
  if (validBypassTypes.includes(actionCmd)) {
    bypassZone(actionNum);
  }
  const validArmTypes = ["area-disarm", "area-stay", "area-sleep", "area-arm"];
  if (validArmTypes.includes(actionCmd)) {
    armArea(actionCmd, actionNum);
  }
}

function armArea(armType, areaNum) {
  const state = armType.split("-")[1];
  mockDevice.deviceState.areas[areaNum - 1] = state;
}

function bypassZone(zoneNum) {
  if (mockDevice.deviceState.zones[zoneNum - 1] !== "b") {
    mockDevice.deviceState.zones[zoneNum - 1] = "b";
  } else {
    mockDevice.deviceState.zones[zoneNum - 1] = "c";
  }
}

function device(overrides) {
  mockDevice = Object.assign(mockDevice, overrides);
  return mockDevice;
}

function reset() {
  const timestamp = new Date().getTime();
  mockDevice = {
    deviceId: "id",
    deviceName: "name",
    deviceSerial: "serial",
    deviceAlarmType: "alarm-type",
    deviceAlarmTypeDetail: null,
    deviceTimestamp: new Date().getTime(),
    deviceStatus: "online",
    deviceState: {
      timestamp: timestamp,
      cmdRecv: 0,
      type: "",
      areas: ["disarm"],
      areasDetail: [""],
      areasStamp: [timestamp],
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
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
        timestamp,
      ],
      pgm: ["c", "c", "c", "c", "c", "c", "c", "c"],
      pgmOb: ["c", "c"],
      ukeys: [],
      power: { AC: "1", Batt: "1" },
    },
    deviceProfile: {
      ver: 1,
      areasLimit: 2,
      areasLabels: ["Area 01", ""],
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
        "",
        0,
        0,
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
  };
}

module.exports = {
  action,
  device,
  reset,
  bypassZone,
  armArea,
};
