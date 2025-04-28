import { useState, useEffect } from 'react';
import styles from "./admin.module.css";
import Navbar from '../../components/navbar-admin/NavBar.jsx';
import Sidebar from '../../components/sidebar-admin/Sidebar.jsx';
import Dashboard from '../../components/dashboard-admin/dashboard.jsx';
import Eventos from '../../components/events-admin/EventsAdmin.jsx';
import Usuarios from '../../components/users-admin/UsersAdmin.jsx';
import Configuracoes from '../../components/settings-admin/settings-admin.jsx';

function Admin() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    siteVisits: 0,
    eventStats: { total_events: 0, total_revenue: 0 },
    recentUsers: []
  });

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
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          setError("Token não encontrado");
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Verificar se o token é válido
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
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setError("Erro ao verificar autenticação");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

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

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard dashboardData={dashboardData} />;
      case 'eventos':
        return <Eventos />;
      case 'usuarios':
        return <Usuarios />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return <Dashboard dashboardData={dashboardData} />;
    }
  };

  if (loading) {
    return (
      <div className={styles.accessDeniedContainer}>
        <div className={styles.accessDeniedContent}>
          <h2>Carregando...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.accessDeniedContainer}>
        <div className={styles.accessDeniedContent}>
          <h2>Acesso Negado</h2>
          <p>Você não tem permissão para acessar esta página.</p>
          <button 
            className={styles.redirectButton}
            onClick={() => window.location.href = '#/accounts/login'}
          >
            Voltar para a página de login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? styles.dark : ''}>
      <Sidebar 
        isClosed={isSidebarClosed} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className={`${styles.content} ${isSidebarClosed ? styles.sidebarClosed : ''}`}>
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        {/* Renderiza o componente ativo */}
        {renderActiveSection()}
      </div>
    </div>
  );
}

export default Admin;