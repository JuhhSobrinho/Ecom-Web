import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SplashScreen from './splash';
import Maps from './maps/mapa';
import {View} from './view';

function App() {

  const handleClick = () => {
    View();
  };

  return (
    <div className="App">
      <SplashScreen />
      <div className='main'>
        <header className="App-header">

          <section className='header'>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className='titulo'>ecom</h1>
          </section>


        </header>


        <section className='app-login'>

          <section className='login'>
            <div className='login-sing-up'>
              <input className='entrada-login' type='submit' value='Login'></input>
              <input className='entrada-sing-up' type='submit' value='Sing Up'></input>
            </div>
            <section className='formulario'>
              <div className='dados'>
                <span className='topico'>Seu apelido: </span>
                <input className='descricao' type='text' placeholder='ex: loki filho de odin'></input>
              </div>
              <div className='dados'>
                <span className='topico'>Senha: </span>
                <input className='descricao' type='password' placeholder='ex: ******************'></input>
              </div>
              <div className='dados'>
                <span className='topico'>Email: </span>
                <input className='descricao' type='email' placeholder='ex: deusdamentira@gmail.com'></input>
              </div>
            </section>
            <div className='dados-botao'>
              <input className='botao-sing-up' type='submit' value='Sing Up' onClick={handleClick}></input>
            </div>
          </section>


        </section>

      </div>
    </div>
  );
}

export default App;
