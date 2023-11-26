import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../model/model';
import {  } from "../maps/mapa.css";
import { botaoCordenada } from "../maps/mapa.js";

export function SalvosPostos() {
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
        });
      });

      setPostos(postosData);
    };

    fetchPostos();
  }, []);


  return (
    <div id="telaPosto">
      {postos.map((posto) => (
        <div key={posto.id} className="postos" onClick={() => botaoCordenada(posto.localLa, posto.localLo)}>
          <div className="iconPosto">
          <img src={`../../img/${posto.bandeira}.png`} alt="iconDoPosto" className='iconBand' />
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
      ))}
    </div>
  );
}