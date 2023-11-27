import React, { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../model/model';
import { } from "../maps/mapa.css";
import { } from "../maps/mapa.js";
import { logDOM } from '@testing-library/react';

const timestamp = serverTimestamp();


const addPostos = async () => {
    try {
        const docRef = await addDoc(collection(db, "postos"), {
            id: "4",
            nome: "Posto Lorinho",
            endereco: "São Benedito, Pindamonhangaba - SP",
            bandeira: "Sem Bandeira",
            date: timestamp,
            avaliacao: 4.6,
            preco: {
                diesel: 2,
                gaso: 3.3,
                etanol: 2.2,
            },
            localizacao: {
                latitude: -22.929056143453526,
                longitude: -45.459355874909384,
            },

        });
        console.log("Document written with ID: ", docRef.id);
        window.location.reload();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export function AddPosto(setCordenadas) {
    const [bandeirasSelecionadas, setBandeirasSelecionadas] = useState(['Sem Bandeira']);

    const [avaliacao, setAvaliacao] = useState(5);

    const [nomePosto, setNomePosto] = useState("Nome Do Posto");
    const [enderecoPosto, setEnderecoPosto] = useState("Endereço Do Posto");

    const [precoDieselPosto, setprecoDieselPosto] = useState(2.2);
    const [precoEtanolPosto, setprecoEtanolPosto] = useState(2.3);
    const [precoGasoPosto, setprecoGasoPosto] = useState(2.4);

    const styleCard = (topPx) => {
        const cards = document.getElementsByClassName('VisuAddPosto');

        // Certifique-se de que há pelo menos um elemento com a classe 'VisuAddPosto'
        if (cards.length > 0) {
            const card = cards[0];
            card.style.top = `${topPx}px`;
        }
    };
    function callAdd() {
        styleCard('350');
        addPostos();
    }
    const handleAvaliacaoChange = (event) => {
        styleCard('160')
        setAvaliacao(parseInt((event.target.value), 10));
    };
    const handleNomePosto = (event) => {
        styleCard('90')
        setNomePosto(event.target.value);
        console.log(nomePosto);
    };
    const handleNomeEndereco = (event) => {
        styleCard('90')
        setEnderecoPosto(event.target.value);
        console.log(enderecoPosto);
    };


    const handleprecoDieselPosto = (event) => {
        styleCard('250')
        setprecoDieselPosto(event.target.value);
        console.log(precoDieselPosto);
    };
    const handleprecoEtanolPosto = (event) => {
        styleCard('250')
        setprecoEtanolPosto(event.target.value);
        console.log(precoEtanolPosto);
    };
    const handleprecoGasoPosto = (event) => {
        styleCard('250')
        setprecoGasoPosto(event.target.value);
        console.log(precoGasoPosto);
    };


    const handleCheckboxChange = (event) => {

        styleCard('10')
        const value = event.target.value;

        // Verifica se a bandeira já está selecionada
        if (bandeirasSelecionadas.includes(value)) {
            console.log(bandeirasSelecionadas);
            // Se estiver, remove a bandeira do estado
            setBandeirasSelecionadas(bandeirasSelecionadas.filter(bandeira => bandeira !== value));
        } else {
            // Se não estiver, adiciona a bandeira ao estado
            setBandeirasSelecionadas([...bandeirasSelecionadas, value]);
        }
    };



    return (
        <div id="telaPosto">
            <div className='VisuAddPosto'>
                <div className='posto-main'>
                    <div className="postos">
                        <div className="iconPosto">
                            <img src={`../../img/${bandeirasSelecionadas}.png`} alt="iconDoPosto" className='iconBand' />
                            <div className='backPorcento'>
                                <div className='star' style={{ width: `${100 - ((avaliacao) * 10)}%` }}>

                                </div>
                                <div className='Porcento'></div>
                                <div className='Porcento'></div>
                                <div className='Porcento'></div>
                                <div className='Porcento'></div>
                                <div className='Porcento'></div>


                            </div>

                        </div>
                        <div className="descricaoPosto">
                            <span className="nomeDoPosto">{nomePosto}</span>
                            <p className="descricaoText">{enderecoPosto}</p>
                        </div>
                        <div className="precoPosto">
                            <span className="precos"></span>
                            <p className="precos">{precoDieselPosto} Disel</p>
                            <p className="precos">{precoEtanolPosto} Etana</p>
                            <p className="precos">{precoGasoPosto} Gasol</p>
                            <p className="diasAtras">Data Atual</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="telaAdd">
                <div className='tipoBandeira'>
                    <div className='checkBand'>
                        <input
                            className='checkBoxStyle'
                            type="checkbox"
                            value="Shell"
                            checked={bandeirasSelecionadas.includes('Shell')}
                            onChange={handleCheckboxChange}
                        />                        <img src="../../img/shell.png" className="iconDoPostoCheck" alt="ImageShell"></img>
                    </div>
                    <div className='checkBand'>
                        <input
                            className='checkBoxStyle'
                            type="checkbox"
                            value="Petrobras"
                            checked={bandeirasSelecionadas.includes('Petrobras')}
                            onChange={handleCheckboxChange}
                        />                        <img src="../../img/Petrobras.png" className="iconDoPostoCheck" alt="ImagePetrobras"></img>
                    </div>                    <div className='checkBand'>
                        <input
                            className='checkBoxStyle'
                            type="checkbox"
                            value="SeteEstrelas"
                            checked={bandeirasSelecionadas.includes('SeteEstrelas')}
                            onChange={handleCheckboxChange}
                        />                        <img src="../../img/seteEstrelas.png" className="iconDoPostoCheck" alt="Image7estrelas"></img>
                    </div>                    <div className='checkBand'>
                        <input
                            className='checkBoxStyle'
                            type="checkbox"
                            value="Ipiranga"
                            checked={bandeirasSelecionadas.includes('Ipiranga')}
                            onChange={handleCheckboxChange}
                        />                        <img src="../../img/Ipiranga.png" className="iconDoPostoCheck" alt="ImageIpiranga"></img>
                    </div>                    <div className='checkBand'>
                        <input
                            className='checkBoxStyle'
                            type="checkbox"
                            value="Sem Bandeira"
                            checked={bandeirasSelecionadas.includes('Sem Bandeira')}
                            onChange={handleCheckboxChange}
                        />                        <img src="../../img/Sem bandeira.png" className="iconDoPostoCheck" alt="ImageSemBandeira"></img>
                    </div>
                </div>
                <div className='linha'></div>
                <div className='TextInput'>
                    <input type="text" name="NomeDoPosto" id="NomePosto" className="TextDados" value={nomePosto} placeholder='Nome Do Posto' onChange={handleNomePosto} onClick={() => setNomePosto("")} />
                </div>
                <div className='linha'></div>
                <div className='TextInput'>
                    <input type="text" name="EnderecoDoPosto" id="EnderecoPosto" className="TextDados" value={enderecoPosto} placeholder='Endereço Do Posto' onChange={handleNomeEndereco} onClick={() => setEnderecoPosto("")} />
                </div>
                <div className='avaliacaoRange'>
                    <span className="nomeDoPosto">Avaliação</span>

                    <input
                        type="range"
                        name="Stars"
                        id="inputStars"
                        className="range-ava"
                        value={avaliacao}
                        min="0"
                        max="10"
                        step="1"
                        onChange={handleAvaliacaoChange}
                    />
                    <p>{(avaliacao) / 2}</p>
                </div>
                <div className='precosAdd'>
                    <div className='precosDados'>
                        <span className="nomeDoPosto">Preço</span>
                        <input type="number" name="" id="input" className="inputPrecosAdd no-spinners" value={precoDieselPosto} onChange={handleprecoDieselPosto} placeholder='3.6' min="0.0" max="10" step="1" onClick={() => setprecoDieselPosto('')} />
                        <p className="descricaoText">Diesel</p>
                    </div>
                    <div className='precosDados'>
                        <span className="nomeDoPosto">Preço</span>
                        <input type="number" name="" id="input" className="inputPrecosAdd no-spinners" value={precoEtanolPosto} onChange={handleprecoEtanolPosto} placeholder='3.6' min="0.0" max="10" step="1" onClick={() => setprecoEtanolPosto('')} />
                        <p className="descricaoText">Etanol</p>
                    </div>
                    <div className='precosDados'>
                        <span className="nomeDoPosto">Preço</span>
                        <input type="number" name="" id="input" className="inputPrecosAdd no-spinners" value={precoGasoPosto} onChange={handleprecoGasoPosto} placeholder='3.6' min="0.0" max="10" step="1" onClick={() => setprecoGasoPosto('')} />
                        <p className="descricaoText">Gasolina</p>
                    </div>

                </div>
                <div className='linha'></div>


                <button type="submit" class="btnAdd" onClick={callAdd}>Adicionar Posto</button>


            </div>


        </div>
    );

}
