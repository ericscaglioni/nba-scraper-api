const message = require('../../server/utils/userMessage');

describe('User Message', () => {
  it('Message', () => {
    const expectedResponse =
      'Ocorreu um problema no servidor. Tente novamente mais tarde.';

    let userMessage = message(1);
    expect(userMessage).toBe(expectedResponse);

    userMessage = message(99);
    expect(userMessage).toBe(expectedResponse);
  });
});
