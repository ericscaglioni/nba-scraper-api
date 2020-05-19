const addEnv = (key, value) => process.env[key] || value;

module.exports = addEnv;
