import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import { PostosCards } from "../postos/postos";
import { AddPosto } from "../add/add";
import { SalvosPostos } from "../salvos/salvos";
import { UserConfig } from "../user/user";
import { MediaPreco } from "../media/media";
import { Sobre } from '../user/sobre';

import mediaFt from '../img/media.svg';
import postoFt from '../img/posto.svg';
import addFt from '../img/add.svg';
import salvoFt from '../img/salvo.svg';
import configFt from '../img/config.svg';






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
        <div id="tipoDeTelas" style={{ width: estado ? ' 375px'  : "0px"}}>

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