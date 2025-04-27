import { useState, useEffect } from 'react';
import styles from "./admin.module.css";
import Navbar from '../../components/NavBar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses, faDollarSign, faEye, faUser } from '@fortawesome/free-solid-svg-icons';


function Admin() {
  const [message, setMessage] = useState(""); 

  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

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

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarClosed(true);
      } else {
        setIsSidebarClosed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial load

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={isDarkMode ? styles.dark : ''}>
      <Sidebar isClosed={isSidebarClosed} />
      <div className={`${styles.content} ${isSidebarClosed ? styles.sidebarClosed : ''}`}>
        <Navbar 
          toggleSidebar={toggleSidebar} 
          toggleTheme={toggleTheme} 
          isDarkMode={isDarkMode}
        />
        
        {/* Main Dashboard Content */}
        <main className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h1>Dashboard</h1>
            </div>
            <a href="#" className={styles.report}>
              <i className='bx bx-cloud-download'></i>
              <span>Download CSV</span>
            </a>
          </div>

          {/* Insights */}
          <ul className={styles.insights}>
            <li className={styles.insightItem}>
              <FontAwesomeIcon icon={faUser} className={`${styles.insightIcon} ${styles.insightPrimary}`} />
              <span className={styles.insightInfo}>
                <h3>1,074</h3>
                <p>Usuários</p>
              </span>
            </li>
            <li className={styles.insightItem}>
              <FontAwesomeIcon icon={faEye} className={`${styles.insightIcon} ${styles.insightWarning}`} />
              <span className={styles.insightInfo}>
                <h3>3,944</h3>
                <p>Visitas ao Site</p>
              </span>
            </li>
            <li className={styles.insightItem}>
              <FontAwesomeIcon icon={faChampagneGlasses} className={`${styles.insightIcon} ${styles.insightSuccess}`} />
              <span className={styles.insightInfo}>
                <h3>14,721</h3>
                <p>Eventos</p>
              </span>
            </li>
            <li className={styles.insightItem}>
              <FontAwesomeIcon icon={faDollarSign} className={`${styles.insightIcon} ${styles.insightDanger}`} />
              <span className={styles.insightInfo}>
                <h3>R$6,742</h3>
                <p>Ganhos Totais</p>
              </span>
            </li>
          </ul>

          <div className={styles.bottomData}>
            {/* Orders Section */}
            <div className={`${styles.orders} ${styles.dataCard}`}>
              <div className={`${styles.dataHeader} ${styles.header}`}>
                <i className='bx bx-receipt'></i>
                <h3>Usuários Novos</h3>
                <i className='bx bx-filter'></i>
                <i className='bx bx-search'></i>
              </div>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Data de Nascimento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableUser}>
                      <FontAwesomeIcon icon={faUser} className={styles.tableIcon} />
                      <p>John Doe</p>
                    </td>
                    <td>14-08-2023</td>
                    
                  </tr>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableUser}>
                      <FontAwesomeIcon icon={faUser} className={styles.tableIcon} />
                      <p>John Doe</p>
                    </td>
                    <td>14-08-2023</td>
                    
                  </tr>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableUser}>
                      <FontAwesomeIcon icon={faUser} className={styles.tableIcon} />
                      <p>John Doe</p>
                    </td>
                    <td>14-08-2023</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Reminders Section */}
            <div className={`${styles.reminders} ${styles.dataCard}`}>
              <div className={`${styles.dataHeader} ${styles.header}`}>
                <i className='bx bx-note'></i>
                <h3>Atualizações</h3>
                <i className='bx bx-filter'></i>
                <i className='bx bx-plus'></i>
              </div>
              <ul className={styles.taskList}>
                <li className={`${styles.taskItem} ${styles.completed}`}>
                  <div className={styles.taskTitle}>
                    <i className='bx bx-check-circle'></i>
                    <p>Novas Rotas de User</p>
                  </div>
                  <i className={`bx bx-dots-vertical-rounded ${styles.taskIcon}`}></i>
                </li>
                <li className={`${styles.taskItem} ${styles.completed}`}>
                  <div className={styles.taskTitle}>
                    <i className='bx bx-check-circle'></i>
                    <p>Analises mais precisas</p>
                  </div>
                  <i className={`bx bx-dots-vertical-rounded ${styles.taskIcon}`}></i>
                </li>
                <li className={`${styles.taskItem} ${styles.notCompleted}`}>
                  <div className={styles.taskTitle}>
                    <i className='bx bx-x-circle'></i>
                    <p>Pagina Admin</p>
                  </div>
                  <i className={`bx bx-dots-vertical-rounded ${styles.taskIcon}`}></i>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;