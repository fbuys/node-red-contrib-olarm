class Utils {
  // Provide object and keys to pick
  // Returns object with only the selected keys
  static pick(object, keys) {
    return keys.reduce((obj, key) => {
      if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }
}

module.exports = Utils;
