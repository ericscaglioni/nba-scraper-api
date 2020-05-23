const utils = require('../../server/utils/utils');

describe('Utils', () => {
  it('Is object empty - Success', () => {
    let obj = undefined;
    let response = utils.isEmptyObject(obj);
    expect(response).toBeTruthy();

    obj = null;
    response = utils.isEmptyObject(obj);
    expect(response).toBeTruthy();

    obj = {};
    response = utils.isEmptyObject(obj);
    expect(response).toBeTruthy();
  });

  it('Is object empty - Failure', () => {
    const obj = { id: 1 };
    const response = utils.isEmptyObject(obj);
    expect(response).toBeFalsy();
  });
});
