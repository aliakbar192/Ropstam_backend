// Function to pick specified keys from an object
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

// Function to drop specified keys from an object
const drop = (object, keys) => {
    let obj = { ...object };
    keys.forEach((key) => {
        delete obj[key];
    });
    return obj;
};

// Export the pick and drop functions for use in other modules
module.exports.pick = pick;
module.exports.drop = drop;
