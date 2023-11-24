import React, { useEffect } from 'react';
import "./mapa.css"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MenuGuias } from "../menu/menu";
import { querySnapshot } from "../controller/controller";


let array = [-22.9236, -45.4598];
console.log("antes",array);
export const botaoCordenada = (lat, long) => {
    array = [lat, long];
    console.log("depois",array);
};

export function Maps() {
    const markers = [];
    console.log("depoisdepois",array);

    useEffect(() => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            const data = doc.data();
            const positions = [data.localizacao.latitude, data.localizacao.longitude];

            const iconUrl = `../../img/${data.bandeira}.png`;  // Caminho da imagem dinâmico

            const customIcon = L.icon({
                iconUrl,
                iconSize: [35, 35],
                iconAnchor: [0, 6],
                popupAnchor: [0, 0],
            });

            var idKey = "BandPosto" + data.id;

            markers.push(
                <Marker key={idKey} position={positions} icon={customIcon}>
                    <Popup className='popupMarker'>
                        <div key={doc.id} className="postos">
                            <div className="iconPosto">
                                <img src={`../../img/${data.bandeira}.png`} alt="iconDoPosto" className='iconBand' />
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
            );
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
                    {markers}
                </div>
            </MapContainer>

            {MenuGuias()}
        </div>
    );
}