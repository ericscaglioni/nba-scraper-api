const stringToReplace = '#CODE#';

const logoCodes = {
  PHO: 'PHX',
  BRK: 'BKN',
  CHO: 'CHA',
};

const positions = {
  PG: 'Armador',
  SG: 'Ala armador',
  SF: 'Ala',
  PF: 'Ala pivô',
  C: 'Pivô',
};

const poundsToKgDivisor = 2.2046;

const feetMultiplier = 30.48;

const inchesMultiplier = 2.54;

module.exports = {
  stringToReplace,
  logoCodes,
  positions,
  poundsToKgDivisor,
  feetMultiplier,
  inchesMultiplier,
};
