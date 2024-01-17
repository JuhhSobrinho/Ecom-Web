import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import { View } from '../view';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
import {doc, deleteDoc } from 'firebase/firestore';

import { db } from '../model/model';
import { Sobre } from './sobre';
import { Contato } from './contato';
import { ToastContainer, toast } from 'react-toastify';

export const sair = async (auth) => {
    signOut(auth)
        .then(() => {
            console.log('Usuário desconectado com sucesso');
        })
        .catch((error) => {
            console.error('Erro ao desconectar o usuário', error);
        });
}

let aux = 0;
export const deleteAtualUser = async (auth, uidUser, email) => {
    const docRefDelet = doc(db, 'users', uidUser);
    const user = auth.currentUser;
    aux += 1;
    try {
        if (aux === 2) {
            await deleteDoc(docRefDelet);
            signOut(auth)
                .then(() => {
                    console.log('Usuário desconectado com sucesso');

                    deleteUser(user)
                        .then(() => {
                            console.log('Usuário excluído com sucesso');
                        })
                        .catch((error) => {
                            console.error('Erro ao excluir o usuário', error);
                        });
                })
                .catch((error) => {
                    console.error('Erro ao desconectar o usuário', error);
                });
        } else {
            toast.info(`\n  ${email} Precione 👇 mais uma vez o botão "DELETAR" para confirmar a exclusão da conta`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 7000,
                closeButton: false,
                tema: "red",
                style: {
                    backgroundColor: '#022b3a',
                    color: 'white',
                },
                progressBarStyle: {
                    backgroundColor: 'green', // Cor da barra de tempo
                },
            });
        }
    } catch (error) {
        console.error('Erro ao excluir usuario:', error);
    }
};





export function UserConfig() {
    const [getEmaSobUse, setEmaSobUse] = useState(0);
    const auth = getAuth();
    let email = <View estado={1} />;

    const emailUser = View({ estado: 1 });
    const uidUser = View({ estado: 2 });
    const handleCallSobre = () => {
        setEmaSobUse(1);
    }

    const handleCallContato = () => {
        setEmaSobUse(2);
    }


    const handleCallSair = () => {
        sair(auth)
    }

    const handleCallDeleteUser = () => {
        deleteAtualUser(auth,uidUser, emailUser)
    }


    let conteudo;
    switch (getEmaSobUse) {
        case 1:
            conteudo = <Sobre />;
            break;
        case 2:
            conteudo = <Contato />;
            break;
        default:
            break;
    }




    return (
        <div className="telaPosto">
            <ToastContainer/>
            <div className='fundo-user'></div>
            {getEmaSobUse ? conteudo :
                <main className='main-userConfig'>
                    <section className='perfil-sair'>
                        <div className='sair'>
                            <button type="button" class="btn-user" onClick={handleCallDeleteUser}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                    trigger="morph"
                                    state="morph-trash-in"
                                    colors="primary:#e83a30,secondary:#1f7a8c"
                                    style={{ width: '30px', height: '30px' }}>
                                </lord-icon>
                                <span className='txt-sair'>Deletar</span>
                            </button>
                            <button type="button" class="btn-user" onClick={handleCallSair}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/gwvmctbb.json"
                                    trigger="hover"
                                    colors="primary:#e83a30,secondary:#1f7a8c"
                                    style={{ width: '30px', height: '30px' }}>
                                </lord-icon>
                                <span className='txt-sair'>Sair</span>
                            </button>
                        </div>
                        <section className='perfil'>
                            <div className='img-user'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/bgebyztw.json"
                                    trigger="loop"
                                    delay="2000"
                                    state="hover-looking-around"
                                    colors="primary:#1f7a8c,secondary:#bfdbf7"
                                    style={{ width: '180px', height: '180px' }}>
                                </lord-icon>
                            </div>
                            <h1 className='email-user'>{email}</h1>
                            <div className='line-user'></div>
                        </section>
                    </section>
                    <section className='sobre-salvos-contato'>
                        <button type="button" className="btn-user" onClick={handleCallSobre}>
                            <lord-icon
                                src="https://cdn.lordicon.com/lenjvibx.json"
                                trigger="hover"
                                state="hover-flutter"
                                colors="primary:#1f7a8c,secondary:#bfdbf7"
                                style={{ width: '50px', height: '50px' }}>
                            </lord-icon>
                            <span className='nomeDoPosto'>Sobre</span>
                            <div className='line-user'></div>
                        </button>
                        <a href="https://juhhsobrinho.github.io/Portfolio/">
                            <button type="button" className="btn-user">
                                <lord-icon
                                    src="https://cdn.lordicon.com/zorvjzqh.json"
                                    trigger="hover"
                                    colors="primary:#1f7a8c,secondary:#bfdbf7"
                                    style={{ width: '50px', height: '50px' }}>
                                </lord-icon>
                                <span className='nomeDoPosto'>Dev</span>
                                <div className='line-user'></div>
                            </button>
                        </a>
                        <button type="button" className="btn-user" onClick={handleCallContato}>
                            <lord-icon
                                src="https://cdn.lordicon.com/ebjjjrhp.json"
                                trigger="hover"
                                colors="primary:#1f7a8c,secondary:#bfdbf7"
                                style={{ width: '50px', height: '50px' }}>
                            </lord-icon>
                            <span className='nomeDoPosto'>Contato</span>
                            <div className='line-user'></div>
                        </button>
                    </section>
                </main>}
        </div>
    );

}
