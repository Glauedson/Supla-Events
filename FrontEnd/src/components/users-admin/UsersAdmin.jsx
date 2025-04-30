import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import styles from './UsersAdmin.module.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const filtered = usuarios.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const sortedUsers = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredUsuarios(sortedUsers);
  }, [searchTerm, usuarios, sortConfig]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/all');
      const data = await response.json();
      setUsuarios(data.users);
      setFilteredUsuarios(data.users);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Usuários</h1>
      </div>

      <div className={styles.sortControls}>
        <button 
          className={styles.sortButton} 
          onClick={() => handleSort('name')}
        >
          Nome <FontAwesomeIcon icon={faSort} />
        </button>
        <button 
          className={styles.sortButton} 
          onClick={() => handleSort('role')}
        >
          Função <FontAwesomeIcon icon={faSort} />
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Carregando usuários...</div>
      ) : (
        <div className={styles.userCardsContainer}>
          {filteredUsuarios.map(user => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userAvatarContainer}>
                <div className={styles.userAvatar}>
                  <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                </div>
              </div>
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>{user.name}</h3>
                <p className={styles.userEmail}>{user.email}</p>
                <div className={styles.userDetails}>
                  <div className={styles.userDetail}>
                    <span className={styles.userDetailLabel}>Data de Nascimento:</span>
                    <span className={styles.userDetailValue}>{formatDate(user.birth)}</span>
                  </div>
                  <div className={styles.userDetail}>
                    <span className={styles.userDetailLabel}>Função:</span>
                    <span className={`${styles.userDetailValue} ${styles.userRole} ${user.role === 'admin' ? styles.adminRole : styles.userRoleTag}`}>
                      {user.role}
                    </span>
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

export default Usuarios;