const constants = require('../utils/constants');
const utilsService = require('./utils');
const config = require('../config/config');
const teamService = require('./team');
const moment = require('moment');

exports.getTeam = async (teamCode) => {
  const teamUrl = config.team.url.replace(constants.codeConstant, teamCode);
  const $ = await utilsService.getParsedHtml(teamUrl);
  if (!$) return {};
  const roster = teamService.getTeamRoster($, config.team.rosterDivId);
  return {
    name: utilsService.getTeamNameByCode(teamCode),
    roster: roster
  };
};

exports.getTeamRoster = ($, rosterDivId) => {
  const teamRosterRows = $(`#${rosterDivId} tbody tr`);
  if (!teamRosterRows || !teamRosterRows.length) return [];

  const roster = [];
  teamRosterRows.each(function () {
    roster.push(teamService.getPlayer($, this));
  });

  return roster;
};

exports.getPlayer = ($, that) => {
  const { height, weight } = teamService.getPlayerMeasures($(that));
  const birthday = teamService.getPlayerBirthday($(that));

  return {
    number: teamService.getPlayerNumber($(that)),
    name: teamService.getPlayerName($(that)),
    position: teamService.getPlayerPosition($(that)),
    bio: {
      height: height,
      weight: weight,
      birthday: birthday,
      age: teamService.getPlayerAge(birthday)
    }
  };
};

exports.getPlayerMeasures = ($) => {
  const weight = teamService.convertPoundsToKg(
    utilsService.getTagTextByTagName($, config.team.playerTags.weight)
  );
  const height = teamService.convertHeight(
    utilsService.getTagTextByTagName($, config.team.playerTags.height)
  );

  return { weight, height };
};

exports.convertPoundsToKg = (pounds) => {
  const converted = (pounds / constants.poundsToKgDivisor).toFixed(1);
  return `${converted}kg`;
};

exports.convertHeight = (height) => {
  if (typeof height !== 'string' || !height.includes('-')) return '';

  const [feet, inches] = height.split('-');
  const converted = utilsService.convertFeetInchesToMeters(
    Number(feet),
    Number(inches)
  );
  return `${converted.replace('.', ',')}m`;
};

exports.getPlayerNumber = ($) =>
  utilsService.getTagTextByTagName($, config.team.playerTags.number);

exports.getPlayerName = ($) =>
  utilsService.getTagTextByTagName($, config.team.playerTags.player);

exports.getPlayerPosition = ($) => {
  const position = utilsService.getTagTextByTagName(
    $,
    config.team.playerTags.position
  );

  return teamService.getPosition(position);
};

exports.getPosition = (position) =>
  constants.positions[position] || 'Não definida';

exports.getPlayerBirthday = ($) => {
  const birthday = utilsService.getTagTextByTagName(
    $,
    config.team.playerTags.birthday
  );
  return utilsService.formatDate(new Date(birthday));
};

exports.getPlayerAge = (birthday) => {
  const momentBirthday = moment(birthday, 'DD/MM/YYYY');
  const duration = moment.duration(moment().diff(momentBirthday));
  return Math.trunc(duration.asYears());
};
