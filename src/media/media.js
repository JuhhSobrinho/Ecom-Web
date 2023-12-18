import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../model/model';
import "../maps/mapa.css";

export function MediaPreco() {
    const [postos, setPostos] = useState([]);
    const [media, setMedia] = useState(0);

    const [maiorPreco, setMaiorPreco] = useState(0);
    const [menorPreco, setMenorPreco] = useState(0);

    const [typePreco, setTypePreco] = useState('precoG');
    useEffect(() => {
        const fetchPostos = async () => {
            const querySnapshot = await getDocs(collection(db, 'postos'));
            const postosData = [];

            querySnapshot.forEach((doc) => {
                const dataFor = doc.data();
                postosData.push({
                    id: doc.id,
                    nome: dataFor.nome,
                    bandeira: dataFor.bandeira,
                    precoD: dataFor.preco.diesel,
                    precoE: dataFor.preco.etanol,
                    precoG: dataFor.preco.gaso,
                });
            });

            setPostos(postosData);
            postos.sort((a, b) => a[typePreco] - b[typePreco]);
            

        };

        fetchPostos();
    }, [postos, typePreco]);




    useEffect(() => {
        // Verifica se o array postos foi carregado
        if (postos.length > 0) {
            let aux = 0;
            for (let i = 0; i < postos.length; i++) {
                const element = postos[i][typePreco];
                aux += element;
            }
    
            let result = postos.length;
            setMaiorPreco(postos[result - 1][typePreco]);
            setMenorPreco(postos[0][typePreco]);
    
            result = aux / result;
    
            setMedia(result);
        }
    }, [postos, typePreco]);



    return (
        <div id="telaPosto">
            <main className='main-tela-media'>
            <div className='tipo-combustivel'>
                    <button type="submit" className="btn-typw-combustivel" onClick={() => setTypePreco('precoG')}>Gasolina</button>
                    <button type="submit" className="btn-typw-combustivel" onClick={() => setTypePreco('precoD')}>Disel</button>
                    <button type="submit" className="btn-typw-combustivel" onClick={() => setTypePreco('precoE')}>Etanol</button>
                </div>
                <div className='elips-maior-media'>
                    <div className='elips-media-media'>
                        <div className='elips-menor-media'>
                            <h1 className='text-media'>{media.toFixed(2)}</h1>
                            <p className='precos'>media</p>
                        </div>
                    </div>
                </div>
                <div className='menor-maior'>
                    <h1 className='text-media' id='text-maior'>{maiorPreco}</h1>
                    <div className="linha" id='line-media'></div>
                    <h1 className='text-media' id='text-menor'>{menorPreco}</h1>
                </div>
                <section className='tabela-precos'>
                    <div className='titulo-tabela'>
                        <span className='text-titulo-tabela'>Bandeira</span>
                        <span className='text-titulo-tabela'>Posto</span>
                        <span className='text-titulo-tabela'>R$</span>
                    </div>
                    <section className='dados-precos-postos'>
                        {postos.map((postos) => (
                            <div key={`media+${postos.id}`} className='card-dados'>
                                <div className='card-preco'>
                                    <img src={`../../img/${postos.bandeira}.png`} alt="iconDoPosto" className='icon-band-media' />
                                    <span className='tabela-dados-posto' id='tabela-nome-posto'>{postos.nome}</span>
                                    <span className='tabela-dados-posto' id='tabela-preco-posto' style={{ color: postos[typePreco] >= media ? '#EB6C6C' : '#8BFFAC' }}>{postos[typePreco]}</span>
                                </div>
                                <div className="linha" id='tabela-line-media'></div>
                            </div>
                        ))}
                    </section>
                </section>

            </main>
        </div>
    );

}
