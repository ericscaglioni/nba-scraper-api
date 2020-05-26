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

module.exports = {
  getConferencesSuccessResponse,
  getConferencesErrorResponse,
  getConferencesServiceResponse
};
