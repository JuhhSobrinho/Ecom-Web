import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "./mapa.css"
import L from 'leaflet';
import { MenuGuias } from "../menu/menu";
import { MapsCards } from "../controller/controller.js";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export function Maps(lat, log) {
    const [cordenadas, setCordenadas] = useState([-22.9236, -45.4598]); // Inicialize as coordenadas corretamente
    const position = cordenadas;
    const iconUrl = '../../img/shell.png';


    console.log(lat, log);

    // Configurações do ícone personalizado
    const customIcon = L.icon({
      iconUrl,
      iconSize: [25, 25], // Tamanho da imagem do ícone em pixels
      iconAnchor: [0, 6], // Ponto de ancoragem do ícone (onde ele se conecta ao marcador)
      popupAnchor: [0, 0], // Ponto de ancoragem do popup (onde ele se conecta ao marcador)
    });
    

    return (
        <div className='mapa'>
            <MapContainer center={cordenadas} zoom={14} className='MapaConteiner'>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        Um marcador personalizado com um ícone.
                    </Popup>
                </Marker>
            </MapContainer>

            {MapsCards}
            

            {MenuGuias(setCordenadas)}




        </div>
    );
}
