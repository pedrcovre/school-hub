import React from 'react';


const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#white',
    padding: '0 20px',
    height: '60px',
    color: 'black',
  },
  navbarLeft: {
    flexShrink: 0,
  },
  navbarLogo: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navbarMenu: {
    display: 'flex',
    gap: '20px',
    marginLeft: '40px',
    flexGrow: 1,
  },
  navbarItem: {
    color: 'black',
    opacity: '60%',
    textDecoration: 'none',
    fontWeight: 500,
  },
  navbarSearch: {
    display: 'flex',
  },
  searchInput: {
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    color: 'black',
    borderRadius: '10px',
    backgroundColor: '#ebeff3',
  },
  navbarIcons: {
    display: 'flex',
    gap: '15px',
    marginLeft: '20px',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
  }
};

const Nav = () => {
  return (
    <header style={styles.navbar}>
      <div style={styles.navbarLeft} class="flex flex-row items-center space-x-2">
        <img src="../../public/logo.svg" alt="s" class="w-8 "/>
        <h1 style={styles.navbarLogo}>School-hub</h1>
      </div>

      <nav style={styles.navbarMenu}>
        <a href="#option1" style={styles.navbarItem}>Requisições</a>
        <a href="#option2" style={styles.navbarItem}>Recursos</a>
      </nav>

      <div style={styles.navbarSearch}>
        <input type="text" placeholder="Buscar" style={styles.searchInput} />
      </div>

      <div style={styles.navbarIcons}>
        <button style={styles.iconBtn} aria-label="Notificações">🔔</button>
        <button style={styles.iconBtn} aria-label="Perfil">👤</button>
      </div>
    </header>
  );
};

export default Nav;
