import React from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import { View } from '../view';
import { getAuth, signOut, deleteUser } from 'firebase/auth';
import { MenuGuias } from '../menu/menu';


export const sair = async (estadoS, auth) => {
    if (estadoS) {
        signOut(auth)
            .then(() => {
                console.log('Usuário desconectado com sucesso');
            })
            .catch((error) => {
                console.error('Erro ao desconectar o usuário', error);
            });
    }
}

export const deleteAtualUser = async (estadoD, auth) => {
    const user = auth.currentUser;

    if (estadoD) {
        if (user) {
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
            console.log('Nenhum usuário autenticado');
        }
    }
};


export function UserConfig() {
    const auth = getAuth();
    const handleCallSobre = () => {
        MenuGuias({ status: true });
    }

    const handleCallSair = () => {
        sair(true, auth)
    }

    const handleCallDeleteUser = () => {
        deleteAtualUser(true, auth)
    }


    let email = <View estado={false} />;
    return (
        <div className="telaPosto">
            <div className='fundo-user'></div>
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
                    <a href="https://www.exemplo.com">
                        <button type="button" className="btn-user" href="https://www.exemplo.com">
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
                    <button type="button" className="btn-user">
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
            </main>
        </div>
    );

}
