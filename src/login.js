import React from 'react';
import logo from './logo.svg';
import './App.css';
import SplashScreen from './splash';
import { View } from './view';
import { Link } from 'react-router-dom';  ///npm install react-router-dom


function LoginEntra() {

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
                <Link to="/login">
                  <input className='entrada-login' type='submit' value='Login' id="loginBotaoColor"></input>
                </Link>
                <Link to="/signUp">
                  <input className='entrada-sing-up' type='submit' value='Sing Up'  id="singUpBotaoColor"></input>
                </Link>
              </div>
              <section className='formulario'>
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
                <Link to="/maps/mapa">
                  <input className='botao-sing-up' type='submit' value='Sing Up' onClick={handleClick}></input>
                </Link>
              </div>
            </section>


          </section>

        </div>
      </div>
  );

}
export default LoginEntra;
