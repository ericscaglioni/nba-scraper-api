const supertest = require('supertest');
const app = require('../../server/config/express');

describe('Conferences', () => {
  describe('GET /conferences', () => {
    it('Success', async (done) => {
      const response =
                await supertest(app).get('/api/conferences');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ sucesso: true });
      done();
    });
  });
});
