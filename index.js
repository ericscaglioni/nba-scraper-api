const app = require('./src/config/express');
const config = require('./src/config/env');

app.listen(config.portApi, () => {
  console.log(
      `API running on port ${config.portApi} (${config.env})`,
  );
});

module.exports = app;
