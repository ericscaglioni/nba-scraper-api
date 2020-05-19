const supertest = require('supertest');
const app = require('../../server/config/express');
const mock = require('./mock');
const service = require('../../server/service/conference');

describe('GET', () => {
  const conferencesRoute = '/api/conferences';

  describe('/conferences', () => {
    it('Success', async (done) => {
      const getConferences = jest
          .spyOn(service, 'getConferences')
          .mockResolvedValueOnce(mock.getConferencesServiceResponse);

      const response = await supertest(app).get(conferencesRoute);
      expect(getConferences).toHaveBeenCalledWith();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mock.getConferencesSuccessResponse);
      done();
    });

    it('Failure', async (done) => {
      const getConferences = jest
          .spyOn(service, 'getConferences')
          .mockResolvedValueOnce({});

      const response = await supertest(app).get(conferencesRoute);
      expect(getConferences).toHaveBeenCalledWith();
      expect(response.status).toBe(500);
      expect(response.body).toEqual(mock.getConferencesErrorResponse);
      done();
    });
  });
});
