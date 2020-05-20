const messages = {
  1: 'Ocorreu um problema no servidor. Tente novamente mais tarde.',
};

const message = (code) => messages[code] || messages[1];

module.exports = message;
