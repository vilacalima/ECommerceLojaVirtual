import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import CadastroUsuario from './cadastroUsuario';
import LoginUsuario from './loginUsuario';
import AlterarUsuario from './alterarUsuario';
// import AlterarUsuario from './listarUsuario';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/loginUsuarios"> {/*login para funcionarios */}
        <LoginUsuario />
      </Route>
      <Route path="/cadastrarUsuarios"> {/*Cadastro de funcionarios para quem tem acesso admin */}
        <CadastroUsuario />
      </Route>
      <Route path="/alterarUsuarios"> {/*Alteração de dados funcionarios para quem tem acesso admin */}
        <AlterarUsuario/>
      </Route>
      {/* <Route path="/listarUsuarios"> Listagem de usuarios para quem é admin e para quem não é tambem */}
        {/* <ListarUsuario/>
      </Route> */}
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
