const dotEnv = require('dotenv');
const path = require('path');
const addEnv = require('./env.checker.util');

const NODE_ENV = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, `../../env/.env-${NODE_ENV}`);

dotEnv.config({ path: envPath });

module.exports = {
  env: addEnv('NODE_ENV'),
  urlApi: addEnv('API_URL', 'http://localhost'),
  portApi: addEnv('PORT', 3303),
  conferenceTeams: {
    url: addEnv('SCRAPER_BASE_URL', 'https://www.basketball-reference.com/'),
    easterndivId: addEnv('EASTERN_DIV_ID', 'confs_standings_E'),
    westernDivId: addEnv('WESTERN_DIV_ID', 'confs_standings_W'),
    nameTag: addEnv('TEAM_NAME_TAG', 'team_name'),
    winsTag: addEnv('TEAM_WINS_TAG', 'wins'),
    lossesTag: addEnv('TEAM_LOSSES_TAG', 'losses'),
  },
  team: {
    logoUrl: addEnv('TEAM_LOGO_URL', 'https://www.nba.com/assets/logos/teams/primary/web/#CODE#.svg'),
    url: addEnv('SCRAPER_TEAM_URL', 'https://www.basketball-reference.com/teams/#CODE#/2020.html'),
    rosterDivId: addEnv('ROSTER_DIV_ID', 'roster'),
    playerTags: {
      position: addEnv('PLAYER_POSITION_TAG', 'pos'),
      player: addEnv('PLAYER_TAG', 'player'),
      number: addEnv('PLAYER_NUMBER_TAG', 'number'),
      weight: addEnv('PLAYER_WEIGHT_TAG', 'weight'),
      height: addEnv('PLAYER_HEIGHT_TAG', 'height'),
      birthday: addEnv('PLAYER_BIRTHDAY_TAG', 'birth_date'),
    },
  },
};
