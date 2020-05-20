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
  },
};
