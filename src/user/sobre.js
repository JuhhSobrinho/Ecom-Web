import React from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import logo from '../logo.svg';

export function Sobre() {
    return (
        <div className="telaPosto">
            <div className='fundo-user'></div>
            <main className='main-userConfig'>
                <section className='perfil-sair'>
                    <section className='perfil'>
                        <img src={logo} alt="empresa-logo" className="img-responsive" style={{ width: '120px', height: '120px' }} />
                        <h1 className='email-user'>ECOM</h1>
                        <div className='line-user'></div>
                    </section>
                </section>
                <section className='sobre-descricao'>
                    <apan className='nomeDoPosto'>Projeto feito unicamente de uma pessoa, com fins de estudo e
                        aprendizado. EFP - Estudo Focado em Projetos</apan>
                    <p className='tabela-dados-posto'>
                        Progrmador e designer: Juliano.
                    </p>
                    <p className='tabela-dados-posto'>
                    <br></br>
                        insperado em um TCC, "ECOM", da ETEC João Gomes de araujo. Cujo tambem tive envolvimento.<br></br>
                        O TCC ECOM APP consistia na mesma ideia de informar o preço e local dos postos, mas usando um desing diferente e sendo feito em react native.
                    </p>
                    <p className='tabela-dados-posto'>
                    <br></br>
                        fontes dos icons: <br></br>
                        <a href="https://lordicon.com/">Icons by Lordicon.com</a><br></br>
                        <a href="https://www.flaticon.com/br/icones-gratis/informacao" title="informação ícones">Informação ícones criados por Freepik - Flaticon</a>
                    </p>
                </section>
            </main>
        </div>
    );
}
