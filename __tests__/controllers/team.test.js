const supertest = require('supertest');
const app = require('../../server/config/express');
const teamService = require('../../server/service/team');
const mock = require('./mock');

const teamRoute = '/api/team/LAL';

describe('Team Controller', () => {
  it('GET /team/teamCode - Success', async (done) => {
    const getTeam = jest
      .spyOn(teamService, 'getTeam')
      .mockResolvedValueOnce(mock.teamServiceResponse);

    const response = await supertest(app).get(teamRoute);
    expect(getTeam).toHaveBeenCalledWith('LAL');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mock.getTeamSuccessResponse);
    done();
  });

  it('GET /team/teamCode - Failure', async (done) => {
    const getTeam = jest.spyOn(teamService, 'getTeam').mockResolvedValueOnce({});

    const response = await supertest(app).get(teamRoute);
    expect(getTeam).toHaveBeenCalledWith('LAL');
    expect(response.status).toBe(500);
    expect(response.body).toEqual(mock.getTeamErrorResponse);
    done();
  });
});
