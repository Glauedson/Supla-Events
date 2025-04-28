import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = ({ isClosed, activeSection, setActiveSection }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '#/login';
  }

  const handleNavClick = (section) => {
    setActiveSection(section);
  }

  return (
    <div className={`${styles.sidebar} ${isClosed ? styles.close : ''}`}>
      <a href="#/admin" className={styles.logo}>
        <img
          src="https://raw.githubusercontent.com/Glauedson/Supla-Events/refs/heads/main/FrontEnd/assets/Logo%20Supla.png"
          alt="Logo"
          className={styles.logoName} />
      </a>
      <ul className={styles.sideMenu}>
        <li className={`${styles.sideMenuItem} ${activeSection === 'dashboard' ? styles.active : ''}`}>
          <a onClick={() => handleNavClick('dashboard')} className={styles.sideMenuLink}>
            <i className={`bx bxs-dashboard ${styles.linkIcon}`}></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className={`${styles.sideMenuItem} ${activeSection === 'eventos' ? styles.active : ''}`}>
          <a onClick={() => handleNavClick('eventos')} className={styles.sideMenuLink}>
            <i className={`bx bx-message-square-dots ${styles.linkIcon}`}></i>
            <span>Eventos</span>
          </a>
        </li>
        <li className={`${styles.sideMenuItem} ${activeSection === 'usuarios' ? styles.active : ''}`}>
          <a onClick={() => handleNavClick('usuarios')} className={styles.sideMenuLink}>
            <i className={`bx bx-group ${styles.linkIcon}`}></i>
            <span>Usuários</span>
          </a>
        </li>
        <li className={`${styles.sideMenuItem} ${activeSection === 'configuracoes' ? styles.active : ''}`}>
          <a onClick={() => handleNavClick('configuracoes')} className={styles.sideMenuLink}>
            <i className={`bx bx-cog ${styles.linkIcon}`}></i>
            <span>Configurações</span>
          </a>
        </li>
      </ul>
      <ul className={styles.sideMenu}>
        <li className={styles.sideMenuItem}>
          <a href="" onClick={handleLogout} className={`${styles.sideMenuLink} ${styles.logoutLink}`}>
            <i className={`bx bx-log-out-circle ${styles.linkIcon}`}></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;