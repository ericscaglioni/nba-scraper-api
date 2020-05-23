/**
 * @jest-environment node
 */
const service = require('../../server/service/conference');
const mock = require('./mock');
const cheerio = require('cheerio');
const config = require('../../server/config/config');
const utilsService = require('../../server/service/utils');

let $ = null;

describe('Conference Service', () => {
  beforeEach(() => {
    $ = cheerio.load(mock.teamsDiv);
  });

  it('Get Team - Success', () => {
    const teamsRows = $(`#${config.conferenceTeams.easterndivId} tbody tr`);
    let counter = 0;
    let response = undefined;
    teamsRows.each(function() {
      if (counter === 1) return;
      response = service.getTeam($, this);
      counter++;
    });
    expect(response).not.toBeUndefined();
    expect(response).toHaveProperty('code');
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('record');
    expect(response.record).toHaveProperty('wins');
    expect(response.record).toHaveProperty('losses');
  });
  
  it('By Conference Id - Success', () => {
    const response = service
        .getTeamsByConferenceId($, config.conferenceTeams.easterndivId);
  
    expect(response).toHaveLength(15);
  
    const [team] = response;
    expect(team).toHaveProperty('code');
    expect(team).toHaveProperty('name');
    expect(team).toHaveProperty('record');
    expect(team.record).toHaveProperty('wins');
    expect(team.record).toHaveProperty('losses');
  });
  
  it('By Conference Id - Failure', () => {
    const response = service
        .getTeamsByConferenceId($, 'teste');
  
    expect(response).toHaveLength(0);
  });
  
  it('Eastern Teams - Success', () => {
    const response = service.getEasternTeams($);
    expect(response).toHaveLength(15);
  
    const [team] = response;
    expect(team).toHaveProperty('code');
    expect(team).toHaveProperty('name');
    expect(team).toHaveProperty('record');
    expect(team.record).toHaveProperty('wins');
    expect(team.record).toHaveProperty('losses');
  });
  
  it('Eastern Teams - Failure', () => {
    config.conferenceTeams.easterndivId = 'teste';
    const response = service.getEasternTeams($);
    expect(response).toHaveLength(0);
  });
  
  it('Western Teams - Success', () => {
    const response = service.getWesternTeams($);
    expect(response).toHaveLength(15);
  
    const [team] = response;
    expect(team).toHaveProperty('code');
    expect(team).toHaveProperty('name');
    expect(team).toHaveProperty('record');
    expect(team.record).toHaveProperty('wins');
    expect(team.record).toHaveProperty('losses');
  });
  
  it('Western Teams - Failure', () => {
    config.conferenceTeams.westernDivId = 'teste';
    const response = service.getWesternTeams($);
    expect(response).toHaveLength(0);
  });
  
  it('Get all conferences - Success', async () => {
    const getParsedHtml = jest
        .spyOn(utilsService, 'getParsedHtml')
        .mockResolvedValueOnce(cheerio.load(mock.teamsDiv));
  
    const getTeamsByConferenceId = jest
        .spyOn(service, 'getTeamsByConferenceId')
        .mockReturnValue(mock.getTeamsByConference);
  
    const response = await service.getConferences();
    expect(getParsedHtml).toHaveBeenCalledWith('https://www.basketball-reference.com/');
    expect(getTeamsByConferenceId).toHaveBeenCalledTimes(2);
    expect(response.conferences).toHaveProperty('eastern');
    expect(response.conferences).toHaveProperty('western');
  
    const { eastern, western } = response.conferences;
    expect(eastern).toHaveLength(15);
    expect(western).toHaveLength(15);
  
    const [eastTeam] = eastern;
    expect(eastTeam).toHaveProperty('code');
    expect(eastTeam).toHaveProperty('name');
    expect(eastTeam).toHaveProperty('record');
    expect(eastTeam.record).toHaveProperty('wins');
    expect(eastTeam.record).toHaveProperty('losses');
  
    const [westTeam] = western;
    expect(westTeam).toHaveProperty('code');
    expect(westTeam).toHaveProperty('name');
    expect(westTeam).toHaveProperty('record');
    expect(westTeam.record).toHaveProperty('wins');
    expect(westTeam.record).toHaveProperty('losses');
  });
  
  it('Get all conferences - Failure', async () => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    const url = 'https://www.basketball-reference.com/';
  
    const getParsedHtml = jest
        .spyOn(utilsService, 'getParsedHtml')
        .mockResolvedValueOnce('')
        .mockResolvedValue(cheerio.load(mock.teamsDiv));
  
    const getTeamsByConferenceId = jest
        .spyOn(service, 'getTeamsByConferenceId')
        .mockReturnValueOnce([])
        .mockReturnValueOnce(mock.getTeamsByConference)
        .mockReturnValueOnce([]);
  
    let response = await service.getConferences();
    expect(getParsedHtml).toHaveBeenCalledWith(url);
    expect(getTeamsByConferenceId).not.toHaveBeenCalled();
    expect(response).toEqual({});
  
    response = await service.getConferences();
    expect(getParsedHtml).toHaveBeenCalledWith(url);
    expect(getTeamsByConferenceId).toHaveBeenCalled();
    expect(response).toEqual({});
  
    response = await service.getConferences();
    expect(getParsedHtml).toHaveBeenCalledWith(url);
    expect(getTeamsByConferenceId).toHaveBeenCalled();
    expect(response).toEqual({});
  });
  
  it('Get Logo Code', () => {
    let response = service.getLogoCode('LAL');
    expect(response).toBe('LAL');
  
    response = service.getLogoCode('PHO');
    expect(response).toBe('PHX');
  
    response = service.getLogoCode('BRK');
    expect(response).toBe('BKN');
  
    response = service.getLogoCode('CHO');
    expect(response).toBe('CHA');
  
    response = service.getLogoCode('LAC');
    expect(response).toBe('LAC');
  });  
});