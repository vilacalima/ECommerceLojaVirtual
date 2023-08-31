import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ListaUsuarios() {
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


      <table>
        <thead>
          <tr>

            <th>Nome</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Grupo</th>

          </tr>
        </thead>

        <tbody id="userTable">
          <tr>

            <td>João</td>
            <td>joao@example.com</td>
            <td>Ativo</td>
            <td>--</td>

          </tr>
          <tr>

            <td>Maria</td>
            <td>maria@example.com</td>
            <td>Inativo</td>
            <td>--</td>

          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuarios;
