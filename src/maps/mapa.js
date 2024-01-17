// Maps.jsx

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import SplashScreen from '../splash';
import { View } from '../view';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MenuGuias } from "../menu/menu";
import { firePosto } from "../controller/controller";
import { ToastContainer, toast } from 'react-toastify';

import copyFt from '../img/copy.svg';
import Shell from '../img/shell.png';
import SeteStrelas from '../img/seteEstrelas.png';
import Petrobras from '../img/Petrobras.png';
import Ipiranga from "../img/Ipiranga.png";
import SemBandeira from '../img/Sem Bandeira.png';




export function Mapa() {
    const array = [-22.9236, -45.4598];
    const [postos, setPostos] = useState([]);
    const [statusCopiadoVisible, setStatusCopiadoVisible] = useState(false);
    const [setaGuia, setSetaGuia] = useState(true);

    const viewResult = View({ estado: 1 });

    function getIconUrlByBandeira(bandeira) {
        switch (bandeira) {
            case 'Shell':
                return Shell;
            case 'SeteEstrelas':
                return SeteStrelas;
            case 'Petrobras':
                return Petrobras;
            case 'Ipiranga':
                return Ipiranga;
            case 'Sem Bandeira':
                return SemBandeira;
            default:
                return SemBandeira; // Ou outro ícone padrão para bandeiras desconhecidas
        }
    }

    const copiaCola = async (postId) => {
        // Lógica para copiar o texto...
        try {
            // Usa a API Clipboard para copiar o texto para a área de transferência
            await navigator.clipboard.writeText(postId);
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
        firePosto.forEach((data) => {
            const positions = [data.lat, data.lon];
            const iconUrl = `${getIconUrlByBandeira(data.bandeira[0])}`;
            const customIcon = L.icon({
                iconUrl,
                iconSize: [35, 35],
                iconAnchor: [0, 6],
                popupAnchor: [0, 0],
            });

            const idKey = data.id;  // Se preferir usar o id do objeto
            setPostos((prevPostos) => [...prevPostos, { idKey, positions, icon: customIcon, data }]);
        });
    }, []);

    useEffect(() => {
        if (viewResult !== '') {
            setTimeout(() => {
                toast.info(`Bem Vindo: ${viewResult}`, {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 2000,
                    closeButton: false,
                    tema: "red",
                    style: {
                        backgroundColor: '#1f7a8c',
                        color: '#BFDBF7',
                    },
                });
            }, 1500);
        }
    }, [viewResult])


    const handleSetaGuia = () => {
        setSetaGuia(!setaGuia);
    }
    console.log(setaGuia);


    return (
        <div className='mapa'>
            <SplashScreen />
            <View />
            <ToastContainer />
            <div className='main-mapa' style={{ width: setaGuia ? '100%' : '100%', transition: '0.5s', ...(window.innerWidth <= 750 && { width: setaGuia ? '0%' : '100%' }) }}>
                <MapContainer center={array} zoom={14} className='MapaConteiner'>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <div id="bands">
                        {postos.map(({ idKey, positions, icon, data }) => (
                            <Marker key={"maps" + idKey} position={positions} icon={icon}>
                                <Popup className='popupMarker'>
                                    <div className="postos" onClick={() => copiaCola(idKey)}>
                                        <div className="iconPosto">
                                            <div className='copy'>
                                                <img src={copyFt} onClick={() => copiaCola(idKey)} alt="Id-copiar" className='iconCopy' />
                                                <p className='diasAtras' style={{ display: statusCopiadoVisible[idKey] ? 'flex' : 'none' }} id='statusCopiado'>ID copied!</p>
                                            </div>
                                            <img src={getIconUrlByBandeira(data.bandeira[0])} alt="iconDoPosto" className='iconBand' />
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
                                            <p className="precos">{data.precoD} Disel</p>
                                            <p className="precos">{data.precoE} Etana</p>
                                            <p className="precos">{data.precoG} Gasol</p>
                                            <p className="diasAtras">{data.date.toDate().toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </div>
                </MapContainer>
            </div>

            <button className='btn-seta-guia' onClick={handleSetaGuia} style={{ right: setaGuia ? ' 340px' : "18px", transition: '0.5s', zIndex: '1', ...(window.innerWidth <= 750 && { right: setaGuia ? '310px' : '18px' }) }}>
                {setaGuia
                    ? (
                        <lord-icon
                            src="https://cdn.lordicon.com/ternnbni.json"
                            trigger="hover"
                            colors="primary:#1f7a8c"
                            style={{ width: '30px', height: '30px', transform: 'rotate(90deg)' }}
                        >
                        </lord-icon>
                    )
                    : (
                        <lord-icon
                            src="https://cdn.lordicon.com/ternnbni.json"
                            trigger="hover"
                            colors="primary:#1f7a8c"
                            style={{ width: '30px', height: '30px', transform: 'rotate(-90deg)' }}
                        >
                        </lord-icon>
                    )
                }
            </button>


            <MenuGuias estado={setaGuia} />
        </div>
    );

}