import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      alert('Preencha os campos');
      return;
    }

    const dataLogin = {
      email,
      password,
    };

    try {
      const reply = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataLogin),
      });

      if (reply.status !== 200) {
        alert(`Algo errado não está certo: ${reply.status}`);
        return;
      }

      const data = await reply.json();
      console.log(data);

      // Salvar o token
      localStorage.setItem('token', data.token);

      // Redirecionar para a página profile ou admin
      window.location.href = data.redirect;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <img className="mb-5" src="../imgs/logo.png" alt="Logo" />

      <form>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login