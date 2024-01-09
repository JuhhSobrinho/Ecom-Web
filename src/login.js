import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SplashScreen from './splash';
import { Link, useNavigate } from 'react-router-dom';  ///npm install react-router-dom
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

const login = async (email, password, navigate) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {

      navigate('/maps/mapa');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;

      toast.info(errorCode, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 7000,
        closeButton: false,
        tema: "blue",
        style: {
          backgroundColor: '#780000',
          color: 'white',
        },
      });
    });

}


function LoginEntra() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    login(email, senha, navigate);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSenha = (event) => {
    setSenha(event.target.value);
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
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
          <ToastContainer/>
          <section className='login'>
            <div className='login-sing-up'>
              <Link to="/login">
                <input className='entrada-login' type='submit' value='Login' id="status-ativado"></input>
              </Link>
              <Link to="/signUp">
                <input className='entrada-sing-up' type='submit' value='Sing Up' id="status-desativado"></input>
              </Link>
            </div>
            <section className='formulario'>
              <div className='dados'>
                <span className='topico'>Email: </span>
                <input className='descricao' type='email' placeholder='ex: deusdamentira@gmail.com' onChange={handleEmail}></input>
              </div>
              <div className='dados'>
                <span className='topico'>Senha: </span>
                <input className='descricao' type={mostrarSenha ? 'text' : 'password'} placeholder='ex: ******************' onChange={handleSenha}></input>
              </div>
              <button type="button" className='button-olhos' onClick={toggleMostrarSenha}>
                {mostrarSenha ? (
                  <lord-icon
                    src="https://cdn.lordicon.com/vfczflna.json"
                    trigger="loop"
                    delay="2000"
                    state="hover-look-around"
                    colors="primary:#1f7a8c,secondary:#bfdbf7"
                    style={{ width: '50px', height: '50px',cursor: 'pointer' }}
                  />
                ) : (
                  <lord-icon
                    src="https://cdn.lordicon.com/vfczflna.json"
                    trigger="loop"
                    delay="2000"
                    state="hover-lashes"
                    colors="primary:#1f7a8c,secondary:#bfdbf7"
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  />
                )}
              </button>
            </section>
            <div className='dados-botao'>
                <input className='botao-sing-up' type='submit' value='Login' onClick={handleClick}></input>
            </div>
          </section>


        </section>

      </div>
    </div>
  );

}
export default LoginEntra;
