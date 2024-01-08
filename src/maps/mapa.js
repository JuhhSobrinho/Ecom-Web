// Maps.jsx

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import { View } from '../view';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MenuGuias } from "../menu/menu";
import { querySnapshot } from "../controller/controller";

export function Maps() {
    const array = [-22.9236, -45.4598];
    const [postos, setPostos] = useState([]);
    const [statusCopiadoVisible, setStatusCopiadoVisible] = useState(false);

    const copiaCola = async (postId) => {
        // Lógica para copiar o texto...
        try {
          // Usa a API Clipboard para copiar o texto para a área de transferência
          await navigator.clipboard.writeText(postId);
          MenuGuias({ status: true });
      } catch (err) {
          console.error("Erro ao copiar texto: ", err);
      }
    
        // Atualiza o estado apenas para o card clicado
        setStatusCopiadoVisible((prevStatus) => ({
          ...prevStatus,
          [postId]: true,
        }));
    
        // Esconde o status após algum tempo (por exemplo, 3 segundos)
        setTimeout(() => {
          setStatusCopiadoVisible((prevStatus) => ({
            ...prevStatus,
            [postId]: false,
          }));
        }, 3000);
      };
    
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

            const idKey = doc.id;
            setPostos((prevPostos) => [...prevPostos, { idKey, positions, icon: customIcon, data }]);
        });
    }, []);

    return (
        <div className='mapa'>
                <View />
            <MapContainer center={array} zoom={14} className='MapaConteiner'>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <div id="bands">
                    {postos.map(({ idKey, positions, icon, data }) => (
                        <Marker key={idKey} position={positions} icon={icon}>
                            <Popup className='popupMarker'>
                                <div className="postos" onClick={() => copiaCola(idKey)}>
                                    <div className="iconPosto">
                                        <div className='copy'>
                                            <img src={'../../img/copy.svg'} onClick={() => copiaCola(idKey)} alt="Id-copiar" className='iconCopy' />
                                            <p className='diasAtras' style={{ display: statusCopiadoVisible[idKey] ? 'flex' : 'none' }} id='statusCopiado'>ID copied!</p>
                                        </div>
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


            <MenuGuias/>
        </div>
    );

}
