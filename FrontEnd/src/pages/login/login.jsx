import { useState } from 'react'
import styles from './login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      })

      if (reply.status !== 200) {
        alert(`Algo errado não está certo: ${reply.status}`);
        return
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
  }

  return (
    <>
    <main className={styles.main_container}>
      <form className={styles.form_container}>
        <div className={styles.logo_container}></div>
        <div className={styles.title_container}>
          <p className={styles.title}>Login</p>
          <span className={styles.subtitle}>
            hey <strong>papito</strong>, vamos logar na sua conta?
          </span>
        </div>
        <br />
        <div className={styles.input_container}>
          <label className={styles.input_label} htmlFor="email_field">Email</label>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input
            placeholder="nome@mail.com"
            title="Coloque seu email"
            name="input-name"
            type="text"
            className={styles.input_field}
            id="email_field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.input_label} htmlFor="password_field">Senha</label>
          <FontAwesomeIcon icon={faUnlock} className={styles.icon} />
          <input
            placeholder="*********"
            title="Coloque sua senha"
            name="input-name"
            type="password"
            className={styles.input_field}
            id="password_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className={styles.sign_in_button} onClick={handleLogin} type="button">
          <span>Entrar</span>
        </button>

        <div className={styles.separator}>
          <hr className={styles.line} />
          <span>é novo por aqui papito?</span>
          <hr className={styles.line} />
        </div>
  
        <button title="Se cadastrar" type="submit" className={styles.sign_up_button}>
          <Link to="/accounts/register">Cadastre-se</Link>
        </button>

        <div className={styles.terms}> <Link to="/accounts/terms">termos de uso e condição</Link></div>

      </form>

      </main>
    </>
  );
}

export default Login