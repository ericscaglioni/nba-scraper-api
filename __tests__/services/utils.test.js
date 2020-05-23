const axios = require('axios');
const cheerio = require('cheerio');
const utilsService = require('../../server/service/utils');
const mock = require('./mock');
const config = require('../../server/config/config');

describe('Utils Service', () => {
  it('Get Parsed HTML - Success', async () => {
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
  
  it('Get Parsed HTML - Failure', async () => {
    const errorMessage = 'Network Error';
    axios.mockImplementation(() => Promise.reject(new Error(errorMessage)));
  
    await expect(utilsService.getParsedHtml('')).resolves.toEqual('');
    expect(axios).toHaveBeenCalledWith('');
  });
  
  it('Convert Feet and Inches to Centimeter', () => {
    const height = '5-11';
    let [ feet, inches ] = height.split('-');
  
    let response =
      utilsService.convertFeetInchesToCm(Number(feet), Number(inches));
    expect(response).toBe(180.34);
  
    feet = 6;
    response =
      utilsService.convertFeetInchesToCm(feet, Number(inches));
    expect(response).toBe(210.82);
  });
  
  it('Convert Centimeter to Meters', () => {
    const height = '5-11';
    let [ feet, inches ] = height.split('-');
  
    let response =
      utilsService.convertFeetInchesToMeters(Number(feet), Number(inches));
    expect(response).toBe('1.80');
  
    feet = 6;
    response =
      utilsService.convertFeetInchesToMeters(feet, Number(inches));
    expect(response).toBe('2.11');
  });
  
  it('Get Tag By Name - Success', () => {
    const $ = cheerio.load(mock.teamsDiv);
    const teamsRows = $(
      `#${config.conferenceTeams.westernDivId} tbody tr`
    );
  
    let i = 0;
    let response = '';
    teamsRows.each(function () {
      if (i === 1) return;
      response =
        utilsService.getTagTextByTagName(
          $(this),
          config.conferenceTeams.winsTag
        );
      i++;
    });
  
    expect(response).toBe('49');
  });
  
  it('Get Tag By Name - Failure', () => {
    const $ = cheerio.load(mock.teamsDiv);
    const teamsRows = $(
      `#${config.conferenceTeams.westernDivId} tbody tr teste`
    );
  
    let i = 0;
    let response = '';
    teamsRows.each(function () {
      if (i === 1) return;
      response =
        utilsService.getTagTextByTagName(
          $(this),
          config.conferenceTeams.winsTag
        );
      i++;
    });
  
    expect(response).toBe('');
  });
});