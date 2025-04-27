import { useEffect, useState } from 'react';
import VerificationCode from '../../components/verification-code/verificationCode';

function Verifications() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Recupera os dados do usuário do localStorage
    try {
      const storedData = localStorage.getItem('dataUser');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } else {
        setError('Dados de usuário não encontrados');
      }
    } catch (error) {
      console.error('Erro ao parsear dados do usuário:', error);
      setError('Erro ao carregar dados do usuário');
    }
  }, []);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Erro</h2>
        <p>{error}</p>
        <p>
          <a href="#/accounts/register">Voltar para o cadastro</a>
        </p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  // Mostra o componente de verificação de código se o tipo for "register"
  if (userData.type === 'register') {
    return <VerificationCode userData={userData} />;
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Tipo de verificação não suportado</h2>
      <p>
        <a href="#/accounts/register">Voltar para o cadastro</a>
      </p>
    </div>
  );
}

export default Verifications;