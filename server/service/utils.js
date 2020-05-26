const axios = require('axios');
const cheerio = require('cheerio');
const constants = require('../utils/constants');
const utilsService = require('./utils');
const moment = require('moment');

exports.getParsedHtml = async (url) => {
  try {
    const { data } = await axios(url);
    return cheerio.load(data);
  } catch (error) {
    return '';
  }
};

exports.convertFeetInchesToMeters = (feet, inches) =>
  (utilsService.convertFeetInchesToCm(feet, inches) / 100).toFixed(2);

exports.convertFeetInchesToCm = (feet, inches) =>
  feet * constants.feetMultiplier + inches * constants.inchesMultiplier;

exports.getTagTextByTagName = ($, tagName) =>
  $.find(`[data-stat=${tagName}]`).text();

exports.formatDate = (date) => {
  if (!date || !(date instanceof Date)) return '';
  return moment(date).format('DD/MM/YYYY');
};
