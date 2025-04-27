import React from 'react';
import styles from '../pages/admin/admin.module.css';

const Sidebar = ({ isClosed }) => {
  return (
    <div className={`${styles.sidebar} ${isClosed ? styles.close : ''}`}>
      <a href="/" className={styles.logo}>
        <i className='bx bx-code-alt'></i>
        <div className={styles.logoName}><span>Asmr</span>Prog</div>
      </a>
      
      <ul className={styles.sideMenu}>
        <li className={styles.sideMenuItem}>
          <a href="/" className={styles.sideMenuLink}>
            <i className={`bx bxs-dashboard ${styles.linkIcon}`}></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className={styles.sideMenuItem}>
          <a href="/shop" className={styles.sideMenuLink}>
            <i className={`bx bx-store-alt ${styles.linkIcon}`}></i>
            <span>Shop</span>
          </a>
        </li>
        <li className={`${styles.sideMenuItem} ${styles.active}`}>
          <a href="/analytics" className={styles.sideMenuLink}>
            <i className={`bx bx-analyse ${styles.linkIcon}`}></i>
            <span>Analytics</span>
          </a>
        </li>
        <li className={styles.sideMenuItem}>
          <a href="/tickets" className={styles.sideMenuLink}>
            <i className={`bx bx-message-square-dots ${styles.linkIcon}`}></i>
            <span>Tickets</span>
          </a>
        </li>
        <li className={styles.sideMenuItem}>
          <a href="/users" className={styles.sideMenuLink}>
            <i className={`bx bx-group ${styles.linkIcon}`}></i>
            <span>Users</span>
          </a>
        </li>
        <li className={styles.sideMenuItem}>
          <a href="/settings" className={styles.sideMenuLink}>
            <i className={`bx bx-cog ${styles.linkIcon}`}></i>
            <span>Settings</span>
          </a>
        </li>
      </ul>
      
      <ul className={styles.sideMenu}>
        <li className={styles.sideMenuItem}>
          <a href="/logout" className={`${styles.sideMenuLink} ${styles.logoutLink}`}>
            <i className={`bx bx-log-out-circle ${styles.linkIcon}`}></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;