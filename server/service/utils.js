const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config/config');

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

  return {
    code: teamAnchorLink.text(),
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

module.exports = {
  getParsedHtml,
  getTeamsByConferenceId,
  getTeam,
};
