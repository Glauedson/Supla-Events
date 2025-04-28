import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ toggleSidebar, toggleTheme, isDarkMode }) => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  
  const handleSearchClick = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault();
      setShowSearchForm(!showSearchForm);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576) {
        setShowSearchForm(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      
      <a href="#/admin" className={`${styles.notif} ${styles.navLink}`}>
        <FontAwesomeIcon icon={faBell}/>
        <span className={styles.count}>1</span>
      </a>
      
      <a href="#/admin" className={`${styles.profile} ${styles.navLink}`}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR6buDPYi6azSwkl1_TK-gqweX-Pt-Zz6Hyw&s" alt="Profile" className={styles.profileImg} />
      </a>
    </nav>
  );
};

export default Navbar;