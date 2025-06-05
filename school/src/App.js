import logo from './img/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <div className="navbar-left">
          <img src={logo} className="navbar-logo" alt="logo" />
        </div>
        <nav className="navbar-menu">
          <a href="#option1" className="navbar-item">Requisições</a>
          <a href="#option2" className="navbar-item">Recursos</a>
        </nav>
        <div className="navbar-search">
          <input type="text" placeholder="Pesquisar" />
        </div>
        <div className="navbar-icons">
          <button className="icon-btn" aria-label="Notificações">🔔</button>
          <button className="icon-btn" aria-label="Perfil">👤</button>
        </div>
      </header>
    </div>
  );
}

export default App;
