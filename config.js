const _ = require("lodash");

const defaultValue = {
    deploymentBucket: "xxx-deployments-nvirgina",
    region: "us-east-1"
};

const dev = () => _.extend(defaultValue, {});
const prod = () => _.extend(defaultValue, {
    deploymentBucket: "xxx-deployments-oregon",
    region: "us-west-2"
});

module.exports = {
    dev,
    prod
};