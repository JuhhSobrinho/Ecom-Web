import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../model/model';
import {  } from "../maps/mapa.css";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export function MapsCards() {
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


          // Adicione outros campos conforme necessário
        });
        console.log("aqui",doc.data());

      });

      setPostos(postosData);
    };

    fetchPostos();
  }, []); // Execute apenas uma vez ao montar o componente


 return (
    <div id="telaPosto">
      {postos.map((posto) => (
            <MapContainer center={(posto.localLa, posto.localLo)} zoom={14} className='MapaConteiner'>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={posto.localLa} icon={`../../img/${posto.bandeira}.png`}>
                    <Popup>
                        Um marcador personalizado com um ícone.
                    </Popup>
                </Marker>
            </MapContainer>
      ))}
    </div>
  );
}
