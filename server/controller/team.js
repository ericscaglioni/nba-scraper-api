const teamService = require('../service/team');
const utils = require('../utils/utils');

const getTeam = async (req, res) => {
  const { code: teamCode } = req.params;
  const team = await teamService.getTeam(teamCode);
  if (utils.isEmptyObject(team)) {
    return res.status(500).json({
      userMessage:
        'Ocorreu um problema no servidor. Tente novamente mais tarde.',
      data: {}
    });
  }

  return res.status(200).json({
    userMessage: '',
    data: team
  });
};

module.exports = {
  getTeam
};
