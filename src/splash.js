import React, { useEffect, useState } from 'react';
import './splash.css';
import logo from './logo.svg';

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
        <div className='linhas1'></div>
        <div className='linhas2'></div>
        <div className='linhas3'></div>
        <div className='linhas4'></div>

        <section className='icon'>
        <lord-icon
            src="https://cdn.lordicon.com/tdtlrbly.json"
            trigger="loop"
            delay="500"
            state="in-jump-dynamic"
            colors="primary:#1f7a8c,secondary:#bfdbf7"
            style={{width:'250px', height:'250px'}}>
          </lord-icon>          <h1 className='titulo'>ecom</h1>
        </section>

      </div>
    );
  }

  return <div className={`splash-screen ${isLoading ? 'show' : 'hide'}`}>

  </div>;
};

export default SplashScreen;
