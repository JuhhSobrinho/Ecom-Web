import React from 'react';
import 'leaflet/dist/leaflet.css';
import "../maps/mapa.css";

export function SalvosPostos(setCordenadas) {

    const botaoCordenada = () => {
        setCordenadas([-22.92321544853484, -45.458332700618065]); // Atualize as coordenadas corretamente
      }
    

    return (
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
    );

}
