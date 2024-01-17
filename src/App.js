import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from './splash';
import SignUpCadastro from './signUp';
import LoginEntra from './login.js';
import {Mapa} from './maps/mapa.js';
import Refresh from './refresh.js';

function App() {
  console.log("Tela App");


  return (
    <Router basename="/Ecom-Web">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginEntra />} />
        <Route path="/signUp" element={<SignUpCadastro />} />
        <Route path="/maps/mapa" element={<Mapa />} />
        <Route path="/refresh" element={<Refresh />} />
      </Routes>
    </Router>
  );
}

export default App;


