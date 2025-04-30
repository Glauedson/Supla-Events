import React, { useState, useEffect, useRef } from 'react'
import style from './navBar.module.css'
import logo from '../../../assets/Logo Supla.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  const [userName, setUserName] = useState('Usuário');
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '#/accounts/login';
  };

  return (
    <main className={style.mainNavBar}>
      <img src={logo} alt="Logo" className={style.logo}/>
      <div className={style.infoUser}>
        <p className={style.myTicket}>
          <FontAwesomeIcon icon={faTicket}/>
          Meus ingressos
        </p>
        <div className={style.userProfile} onClick={toggleModal}>
          <p>{userName}</p> 
          <img 
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="User"
            className={style.userIcon}
          />
          
          {/* Modal de Logout */}
          {showModal && (
            <div className={style.logoutModal} ref={modalRef}>
              <div className={style.modalOption} onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default NavBar