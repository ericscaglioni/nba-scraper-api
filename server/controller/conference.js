const service = require('../service/conference');
const utils = require('../utils/utils');

const getConferences = async (req, res) => {
  const conferences = await service.getConferences();
  if (utils.isEmptyObject(conferences)) {
    return res.status(500).json({
      userMessage:
        'Ocorreu um problema no servidor. Tente novamente mais tarde.',
      data: {}
    });
  }

  return res.status(200).json({
    userMessage: '',
    data: conferences
  });
};

module.exports = { getConferences };
