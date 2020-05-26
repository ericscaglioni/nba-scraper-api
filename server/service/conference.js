const utilsService = require('./utils');
const config = require('../config/config');
const constants = require('../utils/constants');
const conferenceService = require('./conference');

exports.getConferences = async () => {
  const $ = await utilsService.getParsedHtml(config.conferenceTeams.url);
  if (!$) return {};

  const easternTeams = conferenceService.getEasternTeams($);
  if (!easternTeams.length) return {};

  const westernTeams = conferenceService.getWesternTeams($);
  if (!westernTeams.length) return {};

  return {
    conferences: {
      eastern: easternTeams,
      western: westernTeams
    }
  };
};

exports.getEasternTeams = ($) => {
  return conferenceService.getTeamsByConferenceId(
    $,
    config.conferenceTeams.easterndivId
  );
};

exports.getWesternTeams = ($) => {
  return conferenceService.getTeamsByConferenceId(
    $,
    config.conferenceTeams.westernDivId
  );
};

exports.getTeamsByConferenceId = ($, confDivId) => {
  const teamsRows = $(`#${confDivId} tbody tr`);
  if (!teamsRows || !teamsRows.length) return [];

  const teams = [];

  teamsRows.each(function () {
    teams.push(conferenceService.getTeam($, this));
  });

  return teams;
};

exports.getTeam = ($, that) => {
  const teamAnchorLink = $(that).find(
    `[data-stat=${config.conferenceTeams.nameTag}] a`
  );

  const code = teamAnchorLink.text();
  return {
    logo: config.team.logoUrl.replace(
      constants.stringToReplace,
      conferenceService.getLogoCode(code)
    ),
    code: code,
    name: teamAnchorLink.attr('title'),
    record: {
      wins: utilsService.getTagTextByTagName(
        $(that),
        config.conferenceTeams.winsTag
      ),
      losses: utilsService.getTagTextByTagName(
        $(that),
        config.conferenceTeams.lossesTag
      )
    }
  };
};

exports.getLogoCode = (code) => constants.logoCodes[code] || code;
