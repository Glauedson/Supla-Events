import { useState } from 'react'
import styles from './register.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faEnvelope, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [birth, setBirth] = useState('')

  const handleRegister = async () => {
    if (email === '' || password === '') {
      alert('Preencha os campos');
      return;
    }
    
    const dataRegister = {
      user,
      birth,
      email,
      password,
      type: 'register',
    };
    
    // Armazenando como string JSON
    localStorage.setItem('dataUser', JSON.stringify(dataRegister));
    window.location.href = '#/accounts/verification';
  }

  return (
    <>
      <main className={styles.main_container}>
        <form className={styles.form_container}>
          <div className={styles.logo_container}></div>
          <div className={styles.title_container}>
            <p className={styles.title}>Cadastrar</p>
            <span className={styles.subtitle}>
              hey <strong>papito</strong>, vamos criar sua conta?
            </span>
          </div>
          <br />
          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="name_field">Nome</label>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <input
              placeholder="seu nome"
              title="Coloque seu nome"
              name="input-name"
              type="text"
              className={styles.input_field}
              id="name_field"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="birth_field">Data de Nascimento</label>
            <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
            <input
              title="sua data de nascimento"
              name="input-name"
              type="date"
              className={styles.input_field}
              id="birth_field"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>
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
          <button className={styles.sign_in_button} onClick={handleRegister} type="button">
            <span>Cadastre-se</span>
          </button>
          <div className={styles.separator}>
            <hr className={styles.line} />
            <span>já tem uma conta papito?</span>
            <hr className={styles.line} />
          </div>
          <button title="Se conectar" type="submit" className={styles.sign_up_button}>
            <Link to="/accounts/login">Conecte-se</Link>
          </button>
          <div className={styles.terms}>
            <Link to="/accounts/terms">termos de uso e condição</Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Register