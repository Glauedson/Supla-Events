import React from 'react';
import styles from "../../pages/admin/admin.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses, faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';

function Dashboard({ dashboardData }) {
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

  return (
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
  );
}

export default Dashboard;