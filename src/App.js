import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './splash';
import SignUpCadastro from './signUp';
import LoginEntra from './login';
import {Maps} from './maps/mapa.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LoginEntra />} index />
        <Route element={<LoginEntra />} path="/login"/>
        <Route path="/splash" element={<SplashScreen />} /> {/* Use a propriedade 'index' aqui */}
        <Route path="/signUp" element={<SignUpCadastro />} />
        <Route path="/maps/mapa" element={<Maps />} />

      </Routes>
    </Router>
  );
}

export default App;
