import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home'; // Componente para la página de inicio
import EngineerPage from './components/EngineerPage';
import DigitalAnimatorPage from './components/DigitalAnimatorPage';
import GamerPage from './components/GamerPage';
import WriterReaderPage from './components/WriterReaderPage';
import TravelPage from './components/TravelPage';
import Dashboard from './components/Dashboard'; // Componente para el dashboard
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="app-container">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <Header />

      <section className="app-sidebar">
        <Sidebar />
      </section>
      <Router>


        <Routes>
          { /*<Route path="/" exact component={Home} /> */}
          <Route path='/' element={<Home />} />
          <Route path="/engineer" element={<EngineerPage />} />
          <Route path="/digital-animator" element={<DigitalAnimatorPage />} />
          <Route path="/gamer" element={<GamerPage />} />
          <Route path="/writer-reader" element={<WriterReaderPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </Router>

      <footer className='home-footer'>
      <p>All rights reserved © DARC {new Date().getFullYear()}  </p>
      </footer>
    </div>
  );
}

export default App;
