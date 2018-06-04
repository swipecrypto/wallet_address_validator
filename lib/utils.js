var sha3 = require('./sha3.js');

/**
 * Should be called to pad string to expected length
 *
 * @method padLeft
 * @param {String} string to be padded
 * @param {Number} characters that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
var padLeft = function (string, chars, sign) {
    return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
};

/**
 * Should be called to pad string to expected length
 *
 * @method padRight
 * @param {String} string to be padded
 * @param {Number} characters that result string should have
 * @param {String} sign, by default 0
 * @returns {String} right aligned string
 */
var padRight = function (string, chars, sign) {
    return string + (new Array(chars - string.length + 1).join(sign ? sign : "0"));
};

/**
 * Checks if the given string is strictly an address
 *
 * @method isStrictAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isStrictAddress = function (address) {
    return /^0x[0-9a-f]{40}$/i.test(address);
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());

    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};



/**
 * Makes a checksum address
 *
 * @method toChecksumAddress
 * @param {String} address the given HEX adress
 * @return {String}
 */
var toChecksumAddress = function (address) {
    if (typeof address === 'undefined') return '';

    address = address.toLowerCase().replace('0x','');
    var addressHash = sha3(address);
    var checksumAddress = '0x';

    for (var i = 0; i < address.length; i++ ) {
        // If ith character is 9 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
    }
    return checksumAddress;
};

/**
 * Transforms given string to valid 20 bytes-length addres with 0x prefix
 *
 * @method toAddress
 * @param {String} address
 * @return {String} formatted address
 */
var toAddress = function (address) {
    if (isStrictAddress(address)) {
        return address;
    }

    if (/^[0-9a-f]{40}$/.test(address)) {
        return '0x' + address;
    }

    return '0x' + padLeft(toHex(address).substr(2), 40);
};


module.exports = {
    toAddress: toAddress,
    isStrictAddress: isStrictAddress,
    isAddress: isAddress,
    isChecksumAddress: isChecksumAddress,
    toChecksumAddress: toChecksumAddress,
}

console.log(toChecksumAddress('0x86c70bf8c83b498d88447e574e90d46308fb2321'));

//0x86C70Bf8C83b498D88447E574e90d46308fb2321
//0x86C70Bf8C83b498D88447E574e90d46308fb2321
//0x86C70Bf8C83b498D88447E574e90d46308fb2321