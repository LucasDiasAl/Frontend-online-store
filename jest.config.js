module.exports = {
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.jsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
// jsdom no enviroment para evitar problema do document estar undefined, porem como contra partida
// eu acho que o jsdom deixa o fetch como undefined
// transform do babel-jest para evitar erro de importarcao fora de modulo, complemento da config do babelrc
// tranform jest-transform-stub(lib) complemento para o erro do babel tentando fazer o parse em arquivos CSS
