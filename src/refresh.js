import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from './splash';
import SignUpCadastro from './signUp';
import LoginEntra from './login.js';
import {Mapa} from './maps/mapa.js';

function Refresh() {
  console.log("Tela App");


  return (
    <Router basename="/Ecom-Web">
      <Routes>
        <Route path="/" element={<Navigate to="/maps/mapa" />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginEntra />} />
        <Route path="/signUp" element={<SignUpCadastro />} />
        <Route path="/maps/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  );
}

export default Refresh;


