import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import './listarUsuariosAdmin.css'; 
import './home';
import Home from './home';
import CadastroUsuario from './cadastroUsuario';
import LoginUsuario from './loginUsuario';
import AlterarUsuario from './alterarUsuario';
import ListarUsuariosAdmin from './listarUsuariosAdmin'; 
import ListarProdutosEstoquista from './listarProdutosEstoquista'; 
import reportWebVitals from './reportWebVitals';
import ListarProdutos from './listarProdutos';

ReactDOM.render(
  <Router>
    <Switch>
    <Route path="/home" exact>
          <Home />
        </Route>
      <Route path="/login">
        <LoginUsuario />
      </Route>
      <Route path="/listarProdutos">
        <ListarProdutos />
      </Route>
      <Route path="/listarProdutosEstoquista">
        <ListarProdutosEstoquista />
      </Route>
      <Route path="/cadastrarUsuario">
        <CadastroUsuario />
      </Route>
      <Route path="/alterarUsuario/:userId" component={AlterarUsuario} />

      <Route path="/listarUsuariosAdmin">
        <ListarUsuariosAdmin />
      </Route>
      <Route path="/alterarUsuarios">
        <AlterarUsuario />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
