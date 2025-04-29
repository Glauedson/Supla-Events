import React, { useState, useEffect } from 'react';
import style from './EventsAdmin.module.css';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:8080/event/all');
        if (!response.ok) {
          throw new Error('Falha ao carregar os eventos');
        }
        const data = await response.json();
        setEventos(data.events);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  // Função para formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Função para formatar preço
  const formatPrice = (price, isPaid) => {
    if (!isPaid) return 'Gratuito';
    return `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
  };

  if (loading) return <div className={style.loading}>Carregando eventos...</div>;
  if (error) return <div className={style.error}>Erro: {error}</div>;

  return (
    <div className={style.container}>
      <h1 className={style.title}>Eventos</h1>
      
      {eventos.length === 0 ? (
        <p>Nenhum evento encontrado.</p>
      ) : (
        <div className={style.eventList}>
          {eventos.map(evento => (
            <div key={evento.id} className={style.card}>
              <img 
                src={evento.image_url} 
                alt={`Capa do Evento: ${evento.title}`} 
                className={style.image} 
              />
              <div className={style.info}>
                <div className={style.eventTitle}>
                  <p className={style.type}>nome:</p>
                  <h2 className={style.eventTitle}>{evento.title}</h2>
                </div>
                <div className={style.eventDescription}>
                  <p className={style.type}>descrição:</p>
                  <p className={style.eventDescription}>{evento.description}</p>
                </div>

                <div className={style.eventDateCategory}>
                  <div className={style.eventDate}>
                    <p className={style.type}>início:</p>
                    <p className={style.eventCategory}>{formatDate(evento.date_start)}</p>
                  </div>

                  <div className={style.eventDate}>
                    <p className={style.type}>encerramento:</p>
                    <p className={style.eventCategory}>{formatDate(evento.date_end)}</p>
                  </div>

                  <div className={style.category}>
                    <p className={style.type}>categoria:</p>
                    <p className={style.eventCategory}>{evento.category}</p>
                  </div>
                  
                  <div className={style.price}>
                    <p className={style.type}>preço:</p>
                    <p className={style.eventCategory}>{formatPrice(evento.price, evento.is_paid)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Eventos;