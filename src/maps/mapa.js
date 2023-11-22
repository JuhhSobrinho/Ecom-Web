import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "./mapa.css"
import L from 'leaflet';
import { MenuGuias } from "../menu/menu";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Maps() {
    const [getCordenadas, setCordenadas] = useState([-22.9236, -45.4598]); // Inicialize as coordenadas corretamente
    const position = [-22.92321544853484, -45.458332700618065];
    const iconUrl = '../../img/shell.png';

    // Configurações do ícone personalizado
    const customIcon = L.icon({
      iconUrl,
      iconSize: [25, 25], // Tamanho da imagem do ícone em pixels
      iconAnchor: [0, 6], // Ponto de ancoragem do ícone (onde ele se conecta ao marcador)
      popupAnchor: [0, 0], // Ponto de ancoragem do popup (onde ele se conecta ao marcador)
    });
    

    return (
        <div className='mapa'>
            <MapContainer center={getCordenadas} zoom={14} className='MapaConteiner'>
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


            {MenuGuias(setCordenadas)}




        </div>
    );
}

export default Maps;