import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../model/model';
import { } from "../maps/mapa.css";
import { botaoCordenada } from "../maps/mapa.js";

export function PostosCards() {
  const [postos, setPostos] = useState([]);

  useEffect(() => {
    const fetchPostos = async () => {
      const querySnapshot = await getDocs(collection(db, 'postos'));
      const postosData = [];

      querySnapshot.forEach((doc) => {
        const dataFor = doc.data();
        postosData.push({
          id: doc.id,
          nome: dataFor.nome,
          endereco: dataFor.endereco,
          bandeira: dataFor.bandeira,
          precoD: dataFor.preco.diesel,
          precoE: dataFor.preco.etanol,
          precoG: dataFor.preco.gaso,
          date: dataFor.date.toDate(),
          localLa: dataFor.localizacao.latitude,
          localLo: dataFor.localizacao.longitude,
          avaliacao: dataFor.avaliacao,
        });
      });

      setPostos(postosData);
    };

    fetchPostos();
  }, []);


  return (
    <div id="telaPosto">
      {postos.map((posto) => (
        <div className='posto-main'>
          <div key={posto.id} className="postos" onClick={() => botaoCordenada(posto.localLa, posto.localLo)}>
            <div className="iconPosto">
              <img src={`../../img/${posto.bandeira}.png`} alt="iconDoPosto" className='iconBand' />
              <div className='backPorcento'>
                <div className='star' style={{ width: `${100 - (((posto.avaliacao) * 2) * 10)}%` }}>

                </div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>


              </div>

            </div>
            <div className="descricaoPosto">
              <span className="nomeDoPosto">{posto.nome}</span>
              <p className="descricaoText">{posto.endereco}</p>
            </div>
            <div className="precoPosto">
              <span className="precos"></span>
              <p className="precos">{posto.precoD} Disel</p>
              <p className="precos">{posto.precoE} Etana</p>
              <p className="precos">{posto.precoG} Gasol</p>
              <p className="diasAtras">{posto.date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <div className='linha'></div>
        </div>
      ))}
    </div>
  );
}
