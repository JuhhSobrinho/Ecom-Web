import React, { useEffect, useState } from 'react';
import './splash.css';
const logo = '/logo.svg';

const SplashScreen = () => {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Tempo em milissegundos para exibir a tela de splash

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="splash-screen">
  <div className="linhas1 fade-line line1"></div>
  <div className="linhas2 fade-line line2"></div>
  <div className="linhas3 fade-line line3"></div>
  <div className="linhas4 fade-line line4"></div>

        <section className='icon'>
        <img src={logo} className="logo-drop" style={{width:'240px', height:'240px'}} alt="logoSite"/>
          <h1 className='titulo'>ecom</h1>
        </section>
        
      </div>
    );
  }

  return <div className={`splash-screen ${isLoading ? 'show' : 'hide'}`}>

  </div>;
};

export default SplashScreen;
