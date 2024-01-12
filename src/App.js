import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './splash.js';
import SignUpCadastro from './signUp.js';
import LoginEntra from './login.js';
import { Maps } from './maps/mapa.js';

function App() {
  console.log("Testando essa poha");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginEntra />} />
        <Route element={<LoginEntra />} index />
        <Route element={<LoginEntra />} path="/login" /> {/* Página inicial */}
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/signUp" element={<SignUpCadastro />} />
        <Route path="/login" element={<LoginEntra />} /> {/* Página de login */}
        <Route path="/maps/mapa" element={<Maps />} />
      </Routes>
    </Router>
  );
}


export default App;
