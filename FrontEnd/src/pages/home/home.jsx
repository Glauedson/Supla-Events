import React, { useState, useEffect } from 'react'
import style from './home.module.css'
import NavBar from '../../components/navbar-user/navBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip, faMusic, faPerson, faSmile, faCalendarAlt, faMapMarkerAlt, faTag } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/event/all');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar eventos');
        }
        
        const data = await response.json();
        setEvents(data.events);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, events.length]);

  return (
    <>
      <NavBar />

      {/* carrosel de eventos */}

      <div className={style.homeContainer}>
        <p className={style.pageTitle}>Eventos em Destaque</p>
        
        {loading && <div className={style.loading}>Carregando eventos...</div>}
        
        {error && <div className={style.error}>Erro: {error}</div>}
        
        {!loading && !error && events.length > 0 && (
          <div className={style.carouselContainer}>
            <button className={`${style.carouselButton} ${style.prevButton}`} onClick={prevSlide}>
              &lt;
            </button>
            
            <div className={style.carousel}>
              <div className={style.slide}>
                <div className={style.eventCard}>
                  <div className={style.eventImageContainer}>
                    <img 
                      src={events[currentSlide].image_url} 
                      alt={events[currentSlide].title} 
                      className={style.eventImage}
                    />
                  </div>  
                </div>
              </div>
            </div>
            
            <button className={`${style.carouselButton} ${style.nextButton}`} onClick={nextSlide}>
              &gt;
            </button>
          </div>
        )}
        
        {!loading && !error && events.length > 0 && (
          <div className={style.indicators}>
            {events.map((_, index) => (
              <button
                key={index}
                className={`${style.indicator} ${currentSlide === index ? style.activeIndicator : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      <main className={style.mainHome}>

      {/* categorias de eventos */}

      <div className={style.categoriesContainer}>
        <p className={style.pageTitle}>Categorias de Eventos</p>
        <div className={style.categories}>
          <div className={style.categoryCard}>
            <FontAwesomeIcon icon={faMicrochip} className={style.categoryIcon}/>
            Tecnologia
          </div>
          <div className={style.categoryCard}>
            <FontAwesomeIcon icon={faPerson} className={style.categoryIcon}/>
            Palestra
          </div>
          <div className={style.categoryCard}>
            <FontAwesomeIcon icon={faSmile} className={style.categoryIcon}/>
            Stant-up
          </div>
          <div className={style.categoryCard}>
            <FontAwesomeIcon icon={faMusic} className={style.categoryIcon}/>
            Show
          </div>
        </div>
      </div>

      {/* todos os eventos */}
      
      <p className={style.pageTitle}>Todos os Eventos</p>

      {loading && <div className={style.loading}>Carregando eventos...</div>}
        
      {error && <div className={style.error}>Erro: {error}</div>}
      
      {!loading && !error && (
        <div className={style.hudEvents}>
          {events.map((event) => (
            <div key={event.id} className={style.cardEventData}>
              <img src={event.image_url} alt={event.title} className={style.coverEvent}/>
              <h1 className={style.eventTitle}>{event.title}</h1>
              <p className={style.description}>{event.description}</p>
              
              <div className={style.eventDetails}>
                <p className={style.dateEvent}>
                  <FontAwesomeIcon icon={faCalendarAlt} className={style.eventIcon} />
                  {formatDate(event.date_start)} - {formatDate(event.date_end)}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      )}

      </main>
    </>
  )
}

export default Home