import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import './listarUsuarios.css';
import CadastroUsuario from './cadastroUsuario';
import LoginUsuario from './loginUsuario';
import AlterarUsuario from './alterarUsuario';
import ListarUsuarios from './listarUsuarios';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/loginUsuario"> {/*login para funcionarios */}
        <LoginUsuario />
      </Route>
      <Route path="/cadastrarUsuario"> {/*Cadastro de funcionarios para quem tem acesso admin */}
        <CadastroUsuario />
      </Route>
      <Route path="/alterarUsuario"> {/*Alteração de dados funcionarios para quem tem acesso admin */}
        <AlterarUsuario/>
      </Route>
      <Route path="/listarUsuario"> {/*Listagem de usuarios para quem é admin e para quem não é tambem */}
        <ListarUsuarios/>
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
