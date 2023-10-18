import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "./mapa.css"
import { Link } from 'react-router-dom';
import L from 'leaflet';


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

    const botaoCordenada = () => {
        setCordenadas([-22.92321544853484, -45.458332700618065]); // Atualize as coordenadas corretamente
      }
    

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





            <div id="tipoDeTelas">




                <div id="telaPosto">
                    <div className="postos" onClick={botaoCordenada}>
                        <div className="iconPosto">
                            <img src="../../img/shell.png" alt="iconDoPostoShell" />
                        </div>
                        <div className="descricaoPosto">
                            <span className="nomeDoPosto">POSTO GUERREIRO</span>
                            <p className="descricaoText">R. Prudente de Moraes, 425 - Centro, Pindamonhangaba - SP, 12400-230</p>
                        </div>
                        <div className="precoPosto">
                            <span className="precos">R$ 3,80</span>
                            <p className="diasAtras">20 dias atrás</p>
                        </div>

                    </div>
                </div>



                <div id="menu">
                    <Link to="/">
                        <img src="../../img/map.png" alt="menuMapa" className="imgs" />
                    </Link>
                    <Link to="/">
                        <img src="../../img/posto.png" alt="menuPosto" className="imgs" />
                    </Link>
                    <Link to="/">
                        <img src="../../img/add.png" alt="menuAdicionarSugerirPosto" className="imgs" />
                    </Link>
                    <Link to="/">
                        <img src="../../img/salvo.png" alt="menuPostosSalvos" className="imgs" />
                    </Link>
                    <Link to="/">
                        <img src="../../img/config.png" alt="menuConfiguração" className="imgs" />
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Maps;