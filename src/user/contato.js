import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';


const mandarEmail = async (nome, email, mensagem) => {

    emailjs.init("NSP0Hhxyw2c7dRuK3");

    const templateParams = {
        to_email: `juliano.sobrinhojunior@gmail.com`,
        subject: nome,
        mensagem: ` ECOM \n \n Nome: ${nome}\nE-mail: ${email}\n \nMensagem:\n ${mensagem}`,
    };

    emailjs.send("service_q34eppz", "template_l8pven8", templateParams)
        .then((response) => {
            toast.info(`${nome} seu email foi enviado com sucesso`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                closeButton: false,
                tema: "red",
                style: {
                    backgroundColor: '#1f7a8c',
                    color: '#BFDBF7',
                },
            });
        })
        .catch((error) => {
            toast.info(`${nome} ocorreeu um erro ao enviar o email`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                closeButton: false,
                tema: "red",
                style: {
                    backgroundColor: '#780000',
                    color: '#BFDBF7',
                },
            });
        });
}



export function Contato() {
    const [getNome, setNome] = useState('');
    const [getEmail, setEMail] = useState('');
    const [getMensagem, setMensage] = useState('');


    const handleCallEmail = () => {
        mandarEmail(getNome, getEmail, getMensagem);
    }

    return (
        <div className="telaPosto">
            <ToastContainer />
            <div className='fundo-user'></div>
            <main className='main-userConfig' id='main-contao'>
                <section className='perfil-sair'>
                    <section className='perfil'>
                        <lord-icon
                            src="https://cdn.lordicon.com/aycieyht.json"
                            trigger="hover"
                            colors="primary:#1f7a8c,secondary:#bfdbf7"
                            style={{ width: '150px', height: '150px' }}>
                        </lord-icon>
                        <h1 className='email-user'>Contato</h1>
                        <div className='line-user'></div>
                    </section>
                </section>
                <section className='contato-form'>
                    <div className='TextInput'>
                        <input type="text" name="Seu Nome" id="NomePosto" className="TextDados" onChange={(event) => setNome(event.target.value)} placeholder='Seu Nome' />
                    </div>
                    <div className='TextInput'>
                        <input type="text" name="Seu Email" id="NomePosto" className="TextDados" onChange={(event) => setEMail(event.target.value)} placeholder='Seu Email' />
                    </div>
                    <div className='TextInput'>
                        <textarea name="Seu Nome" id="mensagem-contato" className="TextDados" onChange={(event) => setMensage(event.target.value)} placeholder='Sua Mensagem' />
                    </div>
                </section>
                <button type="submit" id='btnAdd' className="btnAdd" onClick={handleCallEmail}>Enviar Email</button>
            </main>
        </div>
    );
}
