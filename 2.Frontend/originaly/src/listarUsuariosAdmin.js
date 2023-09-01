import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importe o Axios
import './listarUsuariosAdmin.css'; 


function ListaUsuariosAdmin() {
  const [searchTerm, setSearchTerm] = useState('');

  const [users, setUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    // Substitua 'URL_DO_BACKEND' pela URL real do seu endpoint GET no backend
    axios.get('http://localhost:8080/api/getUsuario')
      .then(response => {
        setUsers(response.data); // Atualize o estado com os dados recebidos do backend
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="text-center">
                <Link to="/alterarUsuario" className="botao-alterar"> Alterar</Link>
              </td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.ativo}</td>
              <td>{user.grupo}</td>
              <td><input type="checkbox" checked={user.habilitado} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuariosAdmin;
