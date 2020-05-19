module.exports = {
  verbose: true,
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'server/controller/**',
    'server/service/**',
  ],
  testRegex: '\\.test\\.js$',
};
