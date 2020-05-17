const service = require('../service');

const getConferences = (req, res) => {
  return res.status(200).send(service.getConferences());
};

module.exports = {getConferences};
