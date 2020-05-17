const service = require('../../src/service/conference');

describe('[SERVICE] Conferences', () => {
  it('getConferences', () => {
    console.log(service.getConferences());
    expect(true).toBeFalsy();
  });
});
