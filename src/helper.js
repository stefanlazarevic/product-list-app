/**
 * Determines whether the passed value is an array.
 * @param {*} value
 * @returns {boolean}
 */
function is_array(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * Determines whether the passed value is an object.
 * @param {*} value
 * @returns {boolean}
 */
function is_object(value) {
    return value === Object(value) && !is_array(value);
}

/**
 * Determines whether the passed value is an strict string.
 * @param {*} value
 * @returns {boolean}
 */
function is_string(value) {
    return Object.prototype.toString.call(value) === '[object String]' && typeof value === 'string';
}

/**
 * Extract value from an object.
 * @param {string} property
 * @param {object} object
 * @return {*}
 */
function pluck(property, object) {
    if (is_string(property)) {
        if (object === null || object === void 0) {
            return function pluckOnObject(_object) {
                if (is_object(_object)) {
                    return _object[property];
                }
                return null;
            }
        }

        if (is_object(object)) {
            return object[property];
        }
    }

    return null;
};

const _ = {};

_.pluck = pluck;

export default _;
