const utilsService = require('./utils');
const config = require('../config/config');

const getConferences = async () => {
  const $ =
    await utilsService.getParsedHtml(config.conferenceTeams.url);
  if (!$) return {};

  const easternTeams = getEasternTeams($);
  if (!easternTeams.length) return {};

  const westernTeams = getWesternTeams($);
  if (!westernTeams.length) return {};

  return {
    conferences: {
      eastern: easternTeams,
      western: westernTeams,
    },
  };
};

const getEasternTeams = ($) => {
  return utilsService
      .getTeamsByConferenceId($, config.conferenceTeams.easterndivId);
};

const getWesternTeams = ($) => {
  return utilsService
      .getTeamsByConferenceId($, config.conferenceTeams.westernDivId);
};

module.exports = {
  getEasternTeams,
  getWesternTeams,
  getConferences,
};
