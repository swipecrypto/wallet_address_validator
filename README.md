# wallet_address_validator

## What it does?

This utility allows REST API call to validate Bitcoin and Ethereum wallet address. This is extremely useful to alert users when they are entering wrong address.

This utility allows checking of case in-sensitive Ethereum address by converting input address to valid check sum format before performing regex validation.

## Usage

Update ```config.js``` deployment bucket and region value to your own AWS Lambda bucket and region. 

### Bitcoin

```

curl <SERVER_URL>/address/validate/<ethereum_address>/btc

```


### Ethereum/ERC20/ERC223

```

curl <SERVER_URL>/address/validate/<ethereum_address>/eth

```

### Result

Returned value is on JSON format with following parameters.

* valid: true/false

* address: check sum address
