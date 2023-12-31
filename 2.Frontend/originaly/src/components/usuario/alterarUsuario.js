import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import UsuarioService from '../../service/usuarioService';
import './alterarUsuario.css';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import PadraoHeader from '../header/padraoHeader';
import BoxResponse from '../util/boxResponse';

function AlterarUsuario() {
  const { userId } = useParams();
   
  const [newNome, setNome] = useState('');
  const [newSenha, setSenha] = useState('');
  const [newCpf, setCpf] = useState('');
  const history = useHistory();
  
  const [mensagem, setMensagem] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState({
    id: null,
    nome: '',
    email: '',
    cpf: '',
    grupo: 'cliente',
    senha: '',
  });

  useEffect(() => {
    const userToken = localStorage.getItem('usuario');

    if (userToken == null) {
      history.push(`/login`);
    } else{
      axios.get(`http://localhost:8080/api/getUsuarioById/${userId}`)
      
      .then(response => {
        const user = response.data;
        setUserData({
          ...userData,
          id: user.id,
          email: user.email,
          grupo: user.grupo
        });

        setNome(user.nome);
        setSenha(user.senha);
        setCpf(user.cpf)

        const userWithHiddenPassword = { ...user, senha: '********' };

        console.log(userWithHiddenPassword);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do usuário:', error);
      });
    }
    
    
  }, [, userId]);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };
  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };
  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const sendUserData = async (userData) => {    
    try {
      const response = await axios.put("http://localhost:8080/api/atualizarUsuario", userData);
      setMensagem(response.data.message.toString());
      setShowModal(true);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const fecharModal = () => {
    setShowModal(false);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("A confirmação de senha não corresponde à senha digitada.");
      return;
    }

    const userData = {
      id: userId,
      nome: event.target.nome.value,
      cpf: event.target.cpf.value,
      senha: event.target.password.value,
    };
  
    // Chame a função para enviar os dados para o backend
    sendUserData(userData);
  };

  return (
    <div className="listar-usuario-container">
      <PadraoHeader pedidos={false}/>

      <main className="app-main">
        <div className="alterar-usuario-form-container">
          <h2>Alterar usuário</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-column">
                <label htmlFor="name">Nome:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="nome" 
                  value={newNome}
                  onChange={handleNomeChange}
                  />
              </div>

              <div className="form-column">
                <label htmlFor="email">Email:</label>
                <InputMask
                  type="email"
                  id="email"
                  name="email"
                  disabled={true} ///AQUI O CAMPO ESTA DESABILITADO, PARA QUE NAO POSSA ALTERAR NADA 
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  value={userData.email}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="cpf">CPF:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="cpf" 
                  value={newCpf}
                  onChange={handleCpfChange}
                  />
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label>Tipo de Usuário:</label>
                  {/* <div>
                    <input 
                      type="radio" 
                      id="tipoCliente" 
                      name="tipoUsuario" 
                      value="cliente" 
                      disabled={true}
                      checked={userData.grupo === 'cliente'} />
                    <label htmlFor="tipoCliente">Cliente</label>
                  </div> */}
                  <div>
                    <input 
                      type="radio" 
                      id="tipoFuncionario" 
                      name="tipoUsuario" 
                      value="funcionario" 
                      disabled={true} 
                      checked={userData.grupo === 'estoquista'} />
                    <label htmlFor="tipoFuncionario">Estoquista</label>
                  </div>
                  <div>
                    <input 
                      type="radio" 
                      id="tipoAdmin" 
                      name="tipoUsuario" 
                      value="admin" 
                      disabled={true} 
                      checked={userData.grupo === 'administrador'} />
                    <label htmlFor="tipoAdmin">Administrador</label>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="password">Senha:</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    value={newSenha}
                    onChange={handleSenhaChange}
                    />
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="confirmPassword">Confirmar Senha:</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className='botao-confirmar'>Confirmar</button>
            </div>
          </form>
        </div>
      </main>

      {showModal && (
        <div className="meus-pedidos-modal">
          <div className="meus-pedidos-modal-content">
            <span className="meus-pedidos-close" onClick={fecharModal}>
              &times;
            </span>
            <BoxResponse itens={mensagem} />
          </div>
        </div>
      )}
    </div>
  );
} export default AlterarUsuario;