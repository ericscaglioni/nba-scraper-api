const teamsResponse = [
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } },
  { code: '', name: '', record: { wins: 0, losses: 0 } }
];

const getConferencesServiceResponse = {
  conferences: {
    eastern: [...teamsResponse],
    western: [...teamsResponse]
  }
};

const getConferencesSuccessResponse = {
  userMessage: '',
  data: { ...getConferencesServiceResponse }
};

const getConferencesErrorResponse = {
  userMessage: 'Ocorreu um problema no servidor. Tente novamente mais tarde.',
  data: {}
};

const playerResponse = {
  number: '',
  name: '',
  position: '',
  bio: {
    height: '',
    weight: '',
    birthday: '',
    age: 0
  }
};

const rosterResponse = [
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse },
  { ...playerResponse }
];

const teamServiceResponse = {
  name: '',
  roster: [...rosterResponse]
};

const getTeamSuccessResponse = {
  userMessage: '',
  data: {
    name: '',
    roster: [
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse },
      { ...playerResponse }
    ]
  }
};

const getTeamErrorResponse = {
  userMessage: 'Ocorreu um problema no servidor. Tente novamente mais tarde.',
  data: {}
};

module.exports = {
  getConferencesSuccessResponse,
  getConferencesErrorResponse,
  getConferencesServiceResponse,
  teamServiceResponse,
  getTeamErrorResponse,
  getTeamSuccessResponse
};
