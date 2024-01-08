import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import "../style/global.css";
import { PostosCards } from "../postos/postos";
import { AddPosto } from "../add/add";
import { SalvosPostos } from "../salvos/salvos";
import { UserConfig } from "../user/user";
import { MediaPreco } from "../media/media";
import { Sobre } from '../user/sobre';


export function MenuGuias({ guiaSobre = false }) {

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

    if (guiaSobre) {
        botaoGuias('Sobre');
    }

    return (
        <div id="tipoDeTelas">



            {guiasComponents[getGuias]}



            <div id="menu">
                <div onClick={() => botaoGuias('Media')}>
                    <img src="../../img/media.svg" alt="menuMapa" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('PostosCards')}>
                    <img src="../../img/posto.svg" alt="menuPosto" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('AddPosto')}>
                    <img src="../../img/add.svg" alt="menuAdicionarSugerirPosto" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('SalvosPostos')}>
                    <img src="../../img/salvo.svg" alt="menuPostosSalvos" className="imgs" />
                </div>
                <div onClick={() => botaoGuias('UserConfig')}>
                    <img src="../../img/config.svg" alt="menuConfiguração" className="imgs" />
                </div>
            </div>
        </div>
    );
}