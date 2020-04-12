function arrayToObject(arr, key="key") {
    var result = arr.reduce(function (map, obj) {
        map[obj[key]] = obj;
        return map;
    }, {});
    return result;
}

module.exports = {
    arrayToObject,
};
