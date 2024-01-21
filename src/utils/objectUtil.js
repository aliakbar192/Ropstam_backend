const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const drop = (object, keys) => {
    let obj = { ...object };
    keys.forEach((key) => {
        delete obj[key];
    });
    return obj;
};

module.exports.pick = pick;
module.exports.drop = drop;
