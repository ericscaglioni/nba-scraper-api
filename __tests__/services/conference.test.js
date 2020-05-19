/**
 * @jest-environment node
 */
const service = require('../../server/service/conference');
const mock = require('./mock');
const cheerio = require('cheerio');
const config = require('../../server/config/config');
const utilsService = require('../../server/service/utils');

describe('Conferences', () => {
  describe('Eastern Teams', () => {
    it('Success', () => {
      const $ = cheerio.load(mock.teamsDiv);
      const response = service.getEasternTeams($);
      expect(response).toHaveLength(15);

      const [team] = response;
      expect(team).toHaveProperty('code');
      expect(team).toHaveProperty('name');
      expect(team).toHaveProperty('record');
      expect(team.record).toHaveProperty('wins');
      expect(team.record).toHaveProperty('losses');
    });

    it('Failure', () => {
      const $ = cheerio.load(mock.teamsDiv);
      config.conferenceTeams.easterndivId = 'teste';
      const response = service.getEasternTeams($);
      expect(response).toHaveLength(0);
    });
  });

  describe('Western Teams', () => {
    it('Success', () => {
      const $ = cheerio.load(mock.teamsDiv);
      const response = service.getWesternTeams($);
      expect(response).toHaveLength(15);

      const [team] = response;
      expect(team).toHaveProperty('code');
      expect(team).toHaveProperty('name');
      expect(team).toHaveProperty('record');
      expect(team.record).toHaveProperty('wins');
      expect(team.record).toHaveProperty('losses');
    });

    it('Failure', () => {
      const $ = cheerio.load(mock.teamsDiv);
      config.conferenceTeams.westernDivId = 'teste';
      const response = service.getWesternTeams($);
      expect(response).toHaveLength(0);
    });
  });

  describe('Get all conferences', () => {
    it('Success', async () => {
      const getParsedHtml = jest
          .spyOn(utilsService, 'getParsedHtml')
          .mockResolvedValueOnce(cheerio.load(mock.teamsDiv));

      const getTeamsByConferenceId = jest
          .spyOn(utilsService, 'getTeamsByConferenceId')
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

    it('Failure', async () => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
      const url = 'https://www.basketball-reference.com/';

      const getParsedHtml = jest
          .spyOn(utilsService, 'getParsedHtml')
          .mockResolvedValueOnce('')
          .mockResolvedValue(cheerio.load(mock.teamsDiv));

      const getTeamsByConferenceId = jest
          .spyOn(utilsService, 'getTeamsByConferenceId')
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
  });
});
