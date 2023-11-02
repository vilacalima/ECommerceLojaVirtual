// App.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './components/backoffice/home';
import Home from './components/backoffice/home';
import CadastroUsuario from './components/usuario/cadastroUsuario';
import LoginUsuario from './components/login/loginUsuario';
import AlterarUsuario from './components/usuario/alterarUsuario';
import ListarUsuarios from './components/usuario/listarUsuarios'; 
import ListarProdutosEstoquista from './components/produto/listarProdutosEstoquista'; 
import reportWebVitals from './reportWebVitals';
import ListarProdutos from './components/produto/listarProdutos';
import ProdutoForm from './components/produto/produtoForm';
import EditarProduto from './components/produto/editarProduto';
import Compra from './components/compra/compra';
import PaginaInicial from './components/paginaInicial/paginaInicial';
import CadastroCliente from './components/cliente/cadastrarCliente';
import Perfil from './components/cliente/perfil';
import App from './app';
import MeusPedidos from './components/cliente/meusPedidos';
import Cart from './components/cliente/carrinho';
import PaginaDeCompra from './components/cliente/paginaDeCompra';
import Pagamento from './components/compra/pagamento';
import Pedido from './components/compra/pedido';



ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/compra/:productId" component={Compra} />
      <Route path="/home/:ativo" component={Home} />
      <Route path="/login">
        <LoginUsuario />
      </Route>
      <Route path="/app">
        <App />
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

      <Route path="/carrinho">
        <Cart />
      </Route>

      <Route path="/checarProduto">
        <PaginaDeCompra/>
      </Route>
      
      <Route path="/cadastrarCliente">
        <CadastroCliente />
      </Route>
      <Route path="/perfil/:email" component={Perfil} />
      <Route path="/alterarUsuario/:userId" component={AlterarUsuario} />
      <Route path="/listarUsuarios">
        <ListarUsuarios />
      </Route>
      <Route path="/MeusPedidos" component={MeusPedidos} /> {/* Corrigida a rota para MeusPedidos */}
      <Route path="/alterarUsuarios">
        <AlterarUsuario />
      </Route>
      <Route path="/cadastrarProduto">
        <ProdutoForm />
      </Route>
      <Route path="/alterarProduto/:productId" component={EditarProduto}>
      </Route>
      <Route path="/pagamento">
        <Pagamento />
      </Route>
      <Route path="/pedido">
        <Pedido />
      </Route>
      <Route path="/">
        <PaginaInicial />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
