import Profile from '../components/profile.component'
//import '../app.css'
import HeaderComponent from '../components/header.component';
import MainComponent from '../components/main.component';
import React from 'react';
import { Link } from 'react-router-dom';
import './home.page.css';

const HomePage = () => {
  return (
    <div className="App">
         <main>
        <HeaderComponent />
        

          <div className="button-group">
            <Link to="/books/create" className="button-link">Pesquisar Artistas</Link>
            <Link to="/books/list" className="button-link">Lista de artistas salvos</Link>
            <Link to="/login" className="button-link">Login</Link>
          </div>
        </main>
    </div>
  );
}

export default HomePage;