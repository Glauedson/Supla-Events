import { useState, useEffect } from 'react';
import styles from "./admin.module.css";
import Navbar from '../../components/navbar-admin/NavBar.jsx';
import Sidebar from '../../components/sidebar-admin/Sidebar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses, faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';

function Admin() {
  const [message, setMessage] = useState("");
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    siteVisits: 0,
    eventStats: { total_events: 0, total_revenue: 0 },
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Token não encontrado");
          setLoading(false);
          return;
        }
        
        const response = await fetch("http://localhost:8080/dashboard/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDashboardData({
          userCount: data.userCount.total_users,
          eventStats: data.eventStats,
          recentUsers: data.recentUsers
        });
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        setError("Erro ao carregar dados do dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

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

  // Função para formatar data de nascimento
  const formatBirthDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) return <div>Carregando dados do dashboard...</div>;
  if (error) return <div>Erro: {error}</div>;

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
                <h3>{dashboardData.userCount}</h3>
                <p>Usuários</p>
              </span>
            </li>
            
            <li className={styles.insightItem}>
              <FontAwesomeIcon icon={faChampagneGlasses} className={`${styles.insightIcon} ${styles.insightSuccess}`} />
              <span className={styles.insightInfo}>
                <h3>{dashboardData.eventStats.total_events}</h3>
                <p>Eventos</p>
              </span>
            </li>

            <li className={styles.insightItem}>
              <FontAwesomeIcon icon={faDollarSign} className={`${styles.insightIcon} ${styles.insightDanger}`} />
              <span className={styles.insightInfo}>
                <h3>{formatCurrency(dashboardData.eventStats.total_revenue)}</h3>
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
                  {dashboardData.recentUsers.map(user => (
                    <tr key={user.id} className={styles.tableRow}>
                      <td className={styles.tableUser}>
                        <FontAwesomeIcon icon={faUser} className={styles.tableIcon} />
                        <p>{user.name}</p>
                      </td>
                      <td>{formatBirthDate(user.birth)}</td>
                    </tr>
                  ))}
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