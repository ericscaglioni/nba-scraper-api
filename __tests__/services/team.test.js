const teamService = require('../../server/service/team');
const mock = require('./mock');
const config = require('../../server/config/config');
const cheerio = require('cheerio');
const utilsService = require('../../server/service/utils');

let $ = null;
let teamRosterRows = null;

describe('Team Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();

    $ = cheerio.load(mock.teamRosterTable);
    teamRosterRows = $(`#${config.team.rosterDivId} tbody tr`);
  });

  it('Get Position - Success', () => {
    let response = teamService.getPosition('PG');
    expect(response).toBe('Armador');

    response = teamService.getPosition('SG');
    expect(response).toBe('Ala armador');

    response = teamService.getPosition('SF');
    expect(response).toBe('Ala');

    response = teamService.getPosition('PF');
    expect(response).toBe('Ala pivô');

    response = teamService.getPosition('C');
    expect(response).toBe('Pivô');
  });

  it('Get Position - Failure', () => {
    let response = teamService.getPosition('TT');
    expect(response).toBe('Não definida');

    response = teamService.getPosition('');
    expect(response).toBe('Não definida');

    response = teamService.getPosition();
    expect(response).toBe('Não definida');
  });

  it('Get Player Position - Success', () => {
    let counter = 0;
    let response = '';
    teamRosterRows.each(function () {
      if (counter === 1) return;
      response = teamService.getPlayerPosition($(this));
      counter++;
    });
    expect(response).toBe('Ala armador');
  });

  it('Get Player Position - Failure', () => {
    const getTagTextByTagName = jest
      .spyOn(utilsService, 'getTagTextByTagName')
      .mockReturnValueOnce('');

    let counter = 0;
    let response = '';
    teamRosterRows.each(function () {
      if (counter === 1) return;
      response = teamService.getPlayerPosition($(this));
      counter++;
    });
    expect(response).toBe('Não definida');
    expect(getTagTextByTagName).toHaveBeenCalled();
  });

  it('Convert Pounds to KG', () => {
    let expectedResult = '45.4kg';

    let result = teamService.convertPoundsToKg(100);
    expect(result).toBe(expectedResult);

    expectedResult = '109.3kg';
    result = teamService.convertPoundsToKg(241);
    expect(result).toBe(expectedResult);
  });

  it('Height Conversion - Success', () => {
    let height = '5-11';
    let response = teamService.convertHeight(height);
    expect(response).toBe('1,80m');

    height = '6-11';
    response = teamService.convertHeight(height);
    expect(response).toBe('2,11m');
  });

  it('Height Conversion - Failure', () => {
    let response = teamService.convertHeight('teste');
    expect(response).toBe('');

    response = teamService.convertHeight(3);
    expect(response).toBe('');
  });

  it('Get Measures - Success', () => {
    let counter = 0;
    let response = undefined;
    teamRosterRows.each(function () {
      if (counter === 1) return;
      response = teamService.getPlayerMeasures($(this));
      counter++;
    });
    expect(response.weight).toBe('93.0kg');
    expect(response.height).toBe('1,93m');
  });

  it('Get Player Number', () => {
    let counter = 0;
    let response = undefined;
    teamRosterRows.each(function () {
      if (counter === 1) return;
      response = teamService.getPlayerNumber($(this));
      counter++;
    });
    expect(response).toBe('0');
  });

  it('Get Player Birthday', () => {
    const getTagTextByTagName = jest
      .spyOn(utilsService, 'getTagTextByTagName')
      .mockReturnValueOnce('May 16, 1997');

    let counter = 0;
    let response = undefined;
    teamRosterRows.each(function () {
      if (counter === 1) return;
      response = teamService.getPlayerBirthday($(this));
      counter++;
    });

    expect(response).toBe('16/05/1997');
    expect(getTagTextByTagName).toHaveBeenCalled();
  });

  it('Get Player Age', () => {
    Date.now = jest.fn(() => new Date('2020-01-01T12:33:37.000Z'));
    const response = teamService.getPlayerAge('16/05/1997');
    expect(response).toBe(22);
  });

  it('Get Whole Player - Success', () => {
    Date.now = jest.fn(() => new Date('2020-01-01T12:33:37.000Z'));
    let counter = 0;
    let response = undefined;
    teamRosterRows.each(function () {
      if (counter === 1) return;
      response = teamService.getPlayer($, this);
      counter++;
    });
    expect(response).toEqual(mock.expectedPlayerResponse);
  });

  it('Get Team Roster - Success', () => {
    Date.now = jest.fn(() => new Date('2020-01-01T12:33:37.000Z'));
    const response = teamService.getTeamRoster($, config.team.rosterDivId);
    expect(response).toHaveLength(17);

    const [player] = response;
    expect(player).toEqual(mock.expectedPlayerResponse);
  });

  it('Get Team Roster - Failure', () => {
    const response = teamService.getTeamRoster($, 'config.team.rosterDivId');
    expect(response).toHaveLength(0);
  });
});
