import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import CadastroUsuario from './cadastroUsuario';
import LoginUsuario from './loginUsuario';
import AlterarUsuario from './alterarUsuario';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login">
        <LoginUsuario />
      </Route>
      <Route path="/cadastro">
        <CadastroUsuario />
      </Route>
      <Route path="/alterar">
        <AlterarUsuario/>
        
        {/* A página inicial aqui (por exemplo, informações sobre o aplicativo) */}
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
