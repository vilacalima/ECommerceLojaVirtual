import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './listarUsuariosAdmin.css';

function ListaUsuariosAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/getUsuario')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    loadUsers();

    const refreshInterval = 15000;
    const intervalId = setInterval(loadUsers, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const loadUsers = () => {
    axios.get('http://localhost:8080/api/getUsuario')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCheckboxChange = async (userId, isChecked) => {
    try {
      const url = `http://localhost:8080/api/usuarioAtivo/${userId}/${isChecked}`;

      const response = await fetch(url, {
        method: 'PUT',
      });

      if (response.ok) {
        console.log('Atualização bem-sucedida');
        
        const updatedUsers = users.map(user => {
          if (user.id === userId) {
            return { ...user, habilitado: isChecked };
          }
          return user;
        });
        setUsers(updatedUsers);
      } else {
        console.error('Falha na atualização');
      }
    } catch (error) {
      console.error('Erro ao atualizar no banco de dados:', error);
    }
  };

  // Aplicar filtro de busca
  const filteredUsers = users.filter(user => user.nome.toLowerCase().includes(searchTerm));

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
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="text-center">
                <Link to={`/alterarUsuario/${user.id}`} className="botao-alterar"> Alterar</Link>
              </td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.ativo ? 'Ativo' : 'Inativo'}</td>
              <td>{user.grupo}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.ativo}
                  onChange={(e) => handleCheckboxChange(user.id, e.target.checked)}
                /> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuariosAdmin;
