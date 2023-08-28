import React from 'react';
import './loginUsuario.css';

function LoginUsuario() {
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Aqui você pode adicionar a lógica de autenticação
      // Verificar o usuário, senha, etc.
    };
  
    return (
      <div className="container">
      <div className="login-section">
        <h2>Entrar</h2>
        <p>Por favor, entre na sua conta.</p>
        <form onSubmit={handleSubmit}></form>
        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Seu email" required />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Sua senha" required />
          <button type="submit" className='login'>Entrar</button>
        </form>
        <a href="#" className="forgot-password">Esqueceu sua senha? <span className="icon">➜</span></a>
      </div>

      <div className="divider"></div>


Master
      </div>
      
    </div>
  );
}
  
  export default LoginUsuario;