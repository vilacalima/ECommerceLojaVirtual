import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './listarUsuariosAdmin.css'; 

function ListaUsuariosAdmin() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Procurar Usuário</h2>


      <input
        type="text"
        id="search"
        placeholder="Digite o nome para buscar"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className='adicionar'>
      <Link to="/cadastrarUsuario" className="botao-adicionar"> Adicionar Usuário</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Alterar</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Grupo</th>
            <th>Habilitar</th>
          </tr>
        </thead>

        <tbody id="userTable">
          <tr>
            <td className="text-center">
              <a className='btn btn-info btn-xs' href="#">
                
      <Link to="/alterarUsuario" className="botao-alterar"> Alterar</Link>
              </a>
            </td>
            <td>João</td>
            <td>joao@example.com</td>
            <td>Ativo</td>
            <td>--</td>
            <td><input type="checkbox" checked /></td>
          </tr>
          <tr>
          <td className="text-center">
              <a className='btn btn-info btn-xs' href="#">
                
      <Link to="/alterarUsuario" className="botao-alterar"> Alterar</Link>
              </a>
            </td>
            <td>Maria</td>
            <td>maria@example.com</td>
            <td>Inativo</td>
            <td>--</td>
            <td><input type="checkbox" /></td>
          </tr>
          {/* Mais linhas de usuário podem ser adicionadas aqui */}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuariosAdmin;
