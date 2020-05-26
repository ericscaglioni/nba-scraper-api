const app = require('./config/express');
const config = require('./config/config');

app.listen(config.portApi, () => {
  console.log(`API running on port ${config.portApi} (${config.env})`);
});

module.exports = app;
