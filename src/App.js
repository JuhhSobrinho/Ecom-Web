import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './splash.js';
import SignUpCadastro from './signUp.js';
import LoginEntra from './login.js';
import { Maps } from './maps/mapa.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginEntra />} /> {/* Página inicial */}
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/signUp" element={<SignUpCadastro />} />
        <Route path="/login" element={<LoginEntra />} /> {/* Página de login */}
        <Route path="/maps/mapa" element={<Maps />} />
      </Routes>
    </Router>
  );
}

export default App;
