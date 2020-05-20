const axios = require('axios');
const cheerio = require('cheerio');
const utilsService = require('../../server/service/utils');
const mock = require('./mock');
const config = require('../../server/config/config');

describe('Utils', () => {
  describe('Get Parsed HTML', () => {
    it('Success', async () => {
      const axiosResponse = {
        status: 200,
        data: `<!DOCTYPE html><html><h1>Sucesso</h1></html>`,
      };
      const load = jest
          .spyOn(cheerio, 'load')
          .mockReturnValueOnce('sucesso');

      axios.mockResolvedValueOnce(axiosResponse);
      await expect(utilsService.getParsedHtml('')).resolves.toEqual('sucesso');
      expect(axios).toHaveBeenCalledWith('');
      expect(load).toHaveBeenCalledWith(axiosResponse.data);
    });

    it('Failure', async () => {
      const errorMessage = 'Network Error';
      axios.mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(utilsService.getParsedHtml('')).resolves.toEqual('');
      expect(axios).toHaveBeenCalledWith('');
    });
  });

  describe('Get Teams', () => {
    describe('By Conference Id', () => {
      it('Success', () => {
        const $ = cheerio.load(mock.teamsDiv);
        const response = utilsService
            .getTeamsByConferenceId($, config.conferenceTeams.easterndivId);

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
        const response = utilsService
            .getTeamsByConferenceId($, 'teste');

        expect(response).toHaveLength(0);
      });
    });

    describe('Get Team', () => {
      it('Success', () => {
        const $ = cheerio.load(mock.teamsDiv);
        const teamsRows = $(`#${config.conferenceTeams.easterndivId} tbody tr`);
        let counter = 0;
        let response = undefined;
        teamsRows.each(function() {
          if (counter === 1) return;
          response = utilsService.getTeam($, this);
          counter++;
        });
        expect(response).not.toBeUndefined();
        expect(response).toHaveProperty('code');
        expect(response).toHaveProperty('name');
        expect(response).toHaveProperty('record');
        expect(response.record).toHaveProperty('wins');
        expect(response.record).toHaveProperty('losses');
      });
    });
  });

  it('Get Logo Code', () => {
    let response = utilsService.getLogoCode('LAL');
    expect(response).toBe('LAL');

    response = utilsService.getLogoCode('PHO');
    expect(response).toBe('PHX');

    response = utilsService.getLogoCode('BRK');
    expect(response).toBe('BKN');

    response = utilsService.getLogoCode('CHO');
    expect(response).toBe('CHA');

    response = utilsService.getLogoCode('LAC');
    expect(response).toBe('LAC');
  });
});
