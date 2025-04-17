import React, { useEffect, useState, useRef } from 'react';
import { firePosto, getSaveData } from '../controller/controller';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from "../model/model";
import { View } from '../view';
import "../style/global.css";



import Shell from '../img/shell.png';
import SeteEstrelas from '../img/seteEstrelas.png';
const Petrobras = '/Petrobras.png';
const Ipiranga = '/Ipiranga.png';
const SemBandeira = '/Sem Bandeira.png';
const copyFt = '/copy.svg';

const addSalvoBd = async (dados, uidAtual) => {
    const minhaColecao = doc(db, 'users', uidAtual);
    await setDoc(minhaColecao, dados);
};

export function PostosCards() {
  const viewResult = View({ estado: 2 });
  const uidAtual = viewResult;
  const [postos, setPostos] = useState([]);
  const [statusCopiadoVisible, setStatusCopiadoVisible] = useState(false);
  const [statusSave, setStatusSave] = useState(false);

  const statusSaveRef = useRef(statusSave);

  
  function getIconUrlByBandeira(bandeira) {
    switch (bandeira) {
        case 'Shell':
            return Shell;
        case 'SeteEstrelas':
            return SeteEstrelas;
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
    try {
      await navigator.clipboard.writeText(postId);
    } catch (err) {
      console.error("Erro ao copiar texto: ", err);
    }

    setStatusCopiadoVisible((prevStatus) => ({
      ...prevStatus,
      [postId]: true,
    }));

    setTimeout(() => {
      setStatusCopiadoVisible((prevStatus) => ({
        ...prevStatus,
        [postId]: false,
      }));
    }, 3000);
  };

  const saveNoSave = async (postId) => {
    setTimeout(() => {
      setStatusSave((prevStatus) => ({
        ...prevStatus,
        [postId]: !prevStatus[postId],
      }));
    }, 1000);
  };

  const postosData = firePosto;

  useEffect(() => {
    const fetchPostos = async () => {
      setPostos(postosData);
    };

    fetchPostos();
  }, [postosData]);

  useEffect(() => {
    const camposTrue = Object.entries(statusSave)
      .filter(([chave, valor]) => valor === true)
      .map(([chave]) => chave);


    if (JSON.stringify(statusSaveRef.current) !== JSON.stringify(statusSave)) {
      const dados = {
        postosSalvos: arrayUnion(...camposTrue),
      };
      addSalvoBd(dados, uidAtual);
    }

    statusSaveRef.current = statusSave;
  }, [statusSave, uidAtual]);

  useEffect(() => {
    const fetchPostos = async () => {
      // Carregar postos do Firebase
      setPostos(firePosto);

      // Carregar dados salvos do usuário
      const savedData = await getSaveData(uidAtual);

      // Inicializar o estado statusSave com os postos salvos
      if (savedData && savedData.postosSalvos) {
        const savedStatus = {};
        savedData.postosSalvos.forEach(postoId => {
          savedStatus[postoId] = true;
        });
        setStatusSave(savedStatus);
        statusSaveRef.current = savedStatus;
      }
    };

    fetchPostos();
  }, [uidAtual]);

  return (
    <div className="telaPosto">


      {postos.map((posto) => (
        <div className='posto-main' key={`salvo+${posto.id}`}>
          <div className="postos" onClick={() => copiaCola(posto.id)}>
            <div className="iconPosto">
              <div className='copy'>
                <img src={copyFt} onClick={() => copiaCola(posto.id)} alt="Id-copiar" className='iconCopy' />
                <p className='diasAtras' id='statusCopiado' style={{ display: statusCopiadoVisible[posto.id] ? 'flex' : 'none' }} >ID copied!</p>
              </div>
              <img src={getIconUrlByBandeira(posto.bandeira[0])} alt="iconDoPosto" className='iconBand' />
              <div className='backPorcento'>
                <div className='star' style={{ width: `${100 - (((posto.avaliacao) * 2) * 10)}%` }}>

                </div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>
                <div className='Porcento'></div>


              </div>

            </div>
            <div className="descricaoPosto">
              <span className="nomeDoPosto">{posto.nome}</span>
              <p className="descricaoText">{posto.endereco}</p>
            </div>
            <div className="precoPosto">
              <span className="precos"></span>
              <div className='preco-salvo'>
                <section className='precos'>
                  <p className="precos">{posto.precoD} D</p>
                  <p className="precos">{posto.precoE} E</p>
                  <p className="precos">{posto.precoG} G</p>
                </section>
                <button className='btn-save' onClick={() => saveNoSave(posto.id)}>
                  {statusSave[posto.id]
                    ? (<lord-icon
                      src="https://cdn.lordicon.com/oiiqgosg.json"
                      trigger="click"
                      state="morph-unmarked-bookmark"
                      colors="primary:#1f7a8c"
                      style={{ width: '15px', height: '15px' }}>
                    </lord-icon>)
                    : (<lord-icon
                      src="https://cdn.lordicon.com/oiiqgosg.json"
                      trigger="click"
                      state="morph-marked-bookmark"
                      colors="primary:#1f7a8c"
                      style={{ width: '15px', height: '15px' }}>
                    </lord-icon>)}
                </button>
              </div>
              <p className="diasAtras">{posto.date.toDate().toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <div className='linha'></div>
        </div>
      ))}
    </div>
  );
}
