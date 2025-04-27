import { useState, useEffect, useRef } from 'react';
import styles from './verificationCode.module.css';

function VerificationCode({ userData }) {
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(null), 
    useRef(null), 
    useRef(null), 
    useRef(null), 
    useRef(null), 
    useRef(null)
  ];
  const emailSentRef = useRef(false);
  
  // Enviar código de verificação quando o componente carregar, mas apenas uma vez
  useEffect(() => {
    if (!emailSentRef.current) {
      emailSentRef.current = true;
      sendVerificationCode();
    }
  }, []);
  
  // Enviar código de verificação para o email
  const sendVerificationCode = async () => {
    if (verificationStatus === 'sending') return;
    
    setVerificationStatus('sending');
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/user/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          type: 'register'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar código de verificação');
      }
      
      setVerificationStatus('sent');
    } catch (err) {
      setError(err.message || 'Erro ao enviar código de verificação');
      setVerificationStatus('error');
    } finally {
      setLoading(false);
    }
  };
  
  // Verificar o código inserido pelo usuário
  const verifyCode = async () => {
    setLoading(true);
    setError('');
    
    const code = otpValues.join('');
    
    if (code.length !== 6) {
      setError('Por favor, preencha todos os campos do código');
      setLoading(false);
      return;
    }
    
    try {
      const verifyResponse = await fetch('http://localhost:8080/user/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          code,
          type: 'register'
        }),
      });
      
      const verifyData = await verifyResponse.json();
      
      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Código inválido');
      }
      
      const registerResponse = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.user,
          email: userData.email,
          password: userData.password,
          birth: userData.birth
        }),
      });
      
      const registerData = await registerResponse.json();
      
      if (!registerResponse.ok) {
        throw new Error(registerData.error || 'Erro ao registrar usuário');
      }
      
      // Registro concluído com sucesso
      localStorage.removeItem('dataUser');
      window.location.href = '#/accounts/login';
      
    } catch (err) {
      setError(err.message || 'Erro ao verificar código');
    } finally {
      setLoading(false);
    }
  };
  
  // Manipula a mudança de foco entre inputs do codigo
  const handleOtpChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  // teclas especiais como backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  // Reenviar código
  const handleResendCode = (e) => {
    e.preventDefault();
    sendVerificationCode();
  };
  
  // Sair da página de verificação
  const handleExit = () => {
    localStorage.removeItem('dataUser');
    window.location.href = '#/accounts/register';
  };

  return (
    <main className={styles.main_container}>
    <form className={styles['otp-Form']}>
      <span className={styles.mainHeading}>Entre com o código</span>
      <p className={styles.otpSubheading}>
        Enviamos um código de verificação para o seu email {userData.email}
      </p>
      
      {error && <p className={styles.errorMessage}>{error}</p>}
      
      <div className={styles.inputContainer}>
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            required
            maxLength="1"
            type="text"
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={styles['otp-input']}
            id={`otp-input${index + 1}`}
            disabled={loading}
          />
        ))}
      </div>
      
      <button 
        className={styles.verifyButton} 
        type="button" 
        onClick={verifyCode}
        disabled={loading || otpValues.join('').length !== 6}
      >
        {loading ? 'Verificando...' : 'Verificar'}
      </button>
      
      <button 
        className={styles.exitBtn} 
        type="button"
        onClick={handleExit}
      >
        ×
      </button>
      
      <p className={styles.resendNote}>
        Não recebeu o código? 
        <button
          className={styles.resendBtn}
          onClick={handleResendCode}
          disabled={loading || verificationStatus === 'sending'}
          type="button"
        >
          {verificationStatus === 'sending' ? 'Enviando...' : 'Reenviar Código'}
        </button>
      </p>
    </form>
    </main>
  );
}

export default VerificationCode;