const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config/config');
const constants = require('../utils/constants');

const getParsedHtml = async (url) => {
  try {
    const { data } = await axios(url);
    return cheerio.load(data);
  } catch (error) {
    return '';
  }
};

const getTeam = ($, that) => {
  const teamAnchorLink =
          $(that).find(`[data-stat=${config.conferenceTeams.nameTag}] a`);

  const code = teamAnchorLink.text();
  return {
    logo: config.team.logoUrl.replace(
      constants.stringToReplace,
      getLogoCode(code)
    ),
    code: code,
    name: teamAnchorLink.attr('title'),
    record: {
      wins: $(that).find(
          `[data-stat=${config.conferenceTeams.winsTag}]
              `).text(),
      losses: $(that).find(
          `[data-stat=${config.conferenceTeams.lossesTag}]
              `).text(),
    },
  };
};

const getTeamsByConferenceId = ($, confDivId) => {
  const teamsRows = $(`#${confDivId} tbody tr`);
  if (!teamsRows || !teamsRows.length) return [];

  const teams = [];

  teamsRows.each(function() {
    teams.push(getTeam($, this));
  });

  return teams;
};

const getLogoCode = code => constants.logoCodes[code] || code;

module.exports = {
  getParsedHtml,
  getTeamsByConferenceId,
  getTeam,
  getLogoCode
};
