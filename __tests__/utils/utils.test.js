const utils = require('../../server/utils/utils');

describe('Utils', () => {
  describe('Is object empty', () => {
    it('Success', () => {
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

    it('Failure', () => {
      const obj = { id: 1 };
      const response = utils.isEmptyObject(obj);
      expect(response).toBeFalsy();
    });
  });
});
