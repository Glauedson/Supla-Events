import { useState, useEffect } from 'react';

function Admin() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const reply = await fetch("http://localhost:8080/auth/admin", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await reply.json();
        console.log(data);

        if (reply.status !== 200) {
          setMessage("Access Denied!");
        } else {
          setMessage(data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do admin:', error);
        setMessage("Erro ao carregar dados");
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>{message}</h1>
    </div>
  );
}

export default Admin;