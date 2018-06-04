'use strict';

const WAValidator = require('wallet-address-validator');
const utils = require('./lib/utils');


const validateAddress = async(event, context, callback) => {
  let address = event.pathParameters.address;
  let validBTC = WAValidator.validate(address, 'BTC');
  let validETH = WAValidator.validate(address, 'ETH');

  let valid = false;
  let type = "-";
  if(validBTC){
    valid = true;
    type = "BTC";
  }else if(validETH){
      address = utils.toChecksumAddress(address);
      valid = WAValidator.validate(address, 'ETH');
      type = "ETH";
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify({
        valid:valid,
        address:address,
        type:type

    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

const validateAddressBTC = async(event, context, callback) => {
    let address = event.pathParameters.address;
    let validBTC = WAValidator.validate(address, 'BTC');
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            valid:validBTC,
            address:address
        }),
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

const validateAddressETH = async(event, context, callback) => {
    let address = event.pathParameters.address;

    address = utils.toChecksumAddress(address);

    let validETH = WAValidator.validate(address, 'ETH');
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            valid:validETH,
            address:address
        }),
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports = {
    validateAddress,
    validateAddressBTC,
    validateAddressETH
}
