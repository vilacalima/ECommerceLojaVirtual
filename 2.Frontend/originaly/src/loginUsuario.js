function LoginUsuario() {
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Aqui você pode adicionar a lógica de autenticação
      // Verificar o usuário, senha, etc.
    };
  
    return (

      <div className="app">

        <main className="app-main">
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="username">Usuário:</label>
                  <input type="text" id="username" name="username" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" id="password" name="password" required />
                </div>
              </div>
              <button type="submit">Entrar</button>
            </form>
          </div>
        </main>
        <footer className="app-footer">
          <p>fazer </p>
        </footer>

      </div>
    );
  }
  
  export default LoginUsuario;