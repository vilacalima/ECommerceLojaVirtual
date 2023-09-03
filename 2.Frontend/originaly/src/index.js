import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import './listarUsuarios.css';
import './listarUsuariosAdmin.css'; 
import './home';
import Home from './home';
import CadastroUsuario from './cadastroUsuario';
import LoginUsuario from './loginUsuario';
import AlterarUsuario from './alterarUsuario';
import ListarUsuarios from './listarUsuarios';
import ListarUsuariosAdmin from './listarUsuariosAdmin'; 
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
    <Route path="/" exact>
          <Home />
        </Route>
      <Route path="/LoginUsuario">
        <LoginUsuario />
      </Route>
      <Route path="/cadastrarUsuario">
        <CadastroUsuario />
      </Route>
      <Route path="/alterarUsuario/:userId" component={AlterarUsuario} />
      <Route path="/listarUsuarios">
        <ListarUsuarios />
      </Route>
      <Route path="/listarUsuariosAdmin">
        <ListarUsuariosAdmin />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
