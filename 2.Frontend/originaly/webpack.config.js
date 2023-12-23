const webpack = require('webpack');
const path = require('path');

module.exports = {
  // ... outras configurações do webpack ...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/'),
      // Adicione outras variáveis de ambiente conforme necessário
    }),
  ],
};
