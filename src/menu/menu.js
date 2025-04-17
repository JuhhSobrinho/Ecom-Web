import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import { PostosCards } from "../postos/postos";
import { AddPosto } from "../add/add";
import { SalvosPostos } from "../salvos/salvos";
import { UserConfig } from "../user/user";
import { MediaPreco } from "../media/media";
import { Sobre } from '../user/sobre';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faCog, faPlus, faBookmark, faChartBar } from '@fortawesome/free-solid-svg-icons';

const postoFt = <FontAwesomeIcon icon={faGasPump} style={{ color: "#90d9e7" }} />;
const addFt = <FontAwesomeIcon icon={faPlus} style={{ color: "#90d9e7" }} />;
const salvoFt = <FontAwesomeIcon icon={faBookmark} style={{ color: "#90d9e7" }} />;
const configFt = <FontAwesomeIcon icon={faCog} style={{ color: "#90d9e7" }} />;
const mediaFt = <FontAwesomeIcon icon={faChartBar} style={{ color: "#90d9e7" }} />;





export function MenuGuias({ estado = true }) {

    const [getGuias, setGuias] = useState('PostosCards');

    const botaoGuias = (guiaId) => {
        setGuias(guiaId);
    }


    const guiasComponents = {
        'Media': <MediaPreco />,
        'PostosCards': <PostosCards />,
        'AddPosto': <AddPosto />,
        'SalvosPostos': <SalvosPostos />,
        'UserConfig': <UserConfig />,
        'Sobre': <Sobre />,
    };


    return (
        <div id="tipoDeTelas" style={{ width: estado ? ' 375px'  : "0px", ...(window.innerWidth <= 750 && (estado ? { width: '100%'} : { width: '0px'})) }}>

            {guiasComponents[getGuias]}

            <div id="menu" style={{ display: estado ? ' flex' : "none"}}>
                <div onClick={() => botaoGuias('Media')}>
                    <img src={mediaFt} alt="menuMapa" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('PostosCards')}>
                    <img src={postoFt} alt="menuPosto" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('AddPosto')}>
                    <img src={addFt} alt="menuAdicionarSugerirPosto" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('SalvosPostos')}>
                    <img src={salvoFt} alt="menuPostosSalvos" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('UserConfig')}>
                    <img src={configFt} alt="menuConfiguração" className="imgs" />
                </div>
            </div>
        </div>
    );
}