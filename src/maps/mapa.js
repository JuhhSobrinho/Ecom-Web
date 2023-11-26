// Maps.jsx

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "./mapa.css";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MenuGuias } from "../menu/menu";
import { querySnapshot } from "../controller/controller";


export const botaoCordenada = (lat, long) => {
    console.log("depois", lat, long);
};

export function Maps() {
    const [array, setArray] = useState([-22.9236, -45.4598]);
    const [postos, setPostos] = useState([]);

    useEffect(() => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const positions = [data.localizacao.latitude, data.localizacao.longitude];

            const iconUrl = `../../img/${data.bandeira}.png`;

            const customIcon = L.icon({
                iconUrl,
                iconSize: [35, 35],
                iconAnchor: [0, 6],
                popupAnchor: [0, 0],
            });

            var idKey = "BandPosto" + data.id;

            setPostos((prevPostos) => [...prevPostos, { id: idKey, positions, icon: customIcon, data }]);
        });
    }, []);

    return (
        <div className='mapa'>
            <MapContainer center={array} zoom={14} className='MapaConteiner'>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <div id="bands">
                    {postos.map(({ id, positions, icon, data }) => (
                        <Marker key={id} position={positions} icon={icon}>
                            <Popup className='popupMarker'>
                                <div key={id} className="postos">
                                    <div className="iconPosto">
                                        <img src={`../../img/${data.bandeira}.png`} alt="iconDoPosto" className='iconBand' />
                                        <div className='backPorcento'>
                                            <div className='star' style={{ width: `${100 - (((data.avaliacao) * 2) * 10)}%` }}>

                                            </div>
                                            <div className='Porcento'></div>
                                            <div className='Porcento'></div>
                                            <div className='Porcento'></div>
                                            <div className='Porcento'></div>
                                            <div className='Porcento'></div>


                                        </div>

                                    </div>
                                    <div className="descricaoPosto">
                                        <span className="nomeDoPosto">{data.nome}</span>
                                        <p className="descricaoText">{data.endereco}</p>
                                    </div>
                                    <div className="precoPosto">
                                        <span className="precos"></span>
                                        <p className="precos">{data.preco.diesel} Disel</p>
                                        <p className="precos">{data.preco.etanol} Etana</p>
                                        <p className="precos">{data.preco.gaso} Gasol</p>
                                        <p className="diasAtras">{data.date.toDate().toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</p>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </div>
            </MapContainer>

            {MenuGuias(setArray)}
        </div>
    );
    
}
