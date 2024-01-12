import React, { useEffect, useState, useRef } from 'react';
import { firePosto, getSaveData } from '../controller/controller';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from "../model/model";
import { View } from '../view';
import "../style/global.css";


const addSalvoBd = async (dados, uidAtual) => {
  const minhaColecao = doc(db, 'users', uidAtual);
  await setDoc(minhaColecao, dados);
};

export function SalvosPostos() {
  const viewResult = View({ estado: 2 });
  const uidAtual = viewResult;
  const [postos, setPostos] = useState([]);
  const [statusCopiadoVisible, setStatusCopiadoVisible] = useState(false);
  const [statusSave, setStatusSave] = useState(false);

  const statusSaveRef = useRef(statusSave);

  const postosData = firePosto;
  // Restante do código...

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





  useEffect(() => {
    const fetchPostos = async () => {
      const camposTrue = Object.entries(statusSave)
        .filter(([chave, valor]) => valor === true)
        .map(([chave]) => chave);

      const postosFiltrados = postosData.filter(posto => camposTrue.includes(posto.id));
      setPostos(postosFiltrados);
    };

    fetchPostos();
  }, [postosData, statusSave]);






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
  }, [statusSave, uidAtual, postos]);





  useEffect(() => {
    const fetchPostos = async () => {
      setPostos(firePosto);

      const savedData = await getSaveData(uidAtual);

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
                <img src={'../../img/copy.svg'} onClick={() => copiaCola(posto.id)} alt="Id-copiar" className='iconCopy' />
                <p className='diasAtras' id='statusCopiado' style={{ display: statusCopiadoVisible[posto.id] ? 'flex' : 'none' }} >ID copied!</p>
              </div>
              <img src={`../../img/${posto.bandeira}.png`} alt="iconDoPosto" className='iconBand' />
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
