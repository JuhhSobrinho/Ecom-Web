import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from './splash';
import SignUpCadastro from './signUp';
import LoginEntra from './login.js';
import { Maps } from './maps/mapa.js';

function App() {
  console.log("Tela App");
  
  // Adicionando o redirecionamento para a tela de login
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginEntra />} />
        <Route path="/signUp" element={<SignUpCadastro />} />
        <Route path="/maps/mapa" element={<Maps />} />
      </Routes>
    </Router>
  );
}

export default App;
