import React, { useEffect, useState } from 'react';
import { firePosto } from '../controller/controller';
import "../style/global.css";

export function PostosCards() {
  const [postos, setPostos] = useState([]);
  const [statusCopiadoVisible, setStatusCopiadoVisible] = useState(false);


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

  const postosData = firePosto;

  useEffect(() => {
    const fetchPostos = async () => {

      setPostos(postosData);
    };

    fetchPostos();
  }, [postosData]);


  return (
    <div className="telaPosto">
      {postos.map((posto) => (
        <div className='posto-main'  key={`salvo+${posto.id}`}>
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
              <p className="precos">{posto.precoD} Disel</p>
              <p className="precos">{posto.precoE} Etana</p>
              <p className="precos">{posto.precoG} Gasol</p>
              <p className="diasAtras">{posto.date.toDate().toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <div className='linha'></div>
        </div>
      ))}
    </div>
  );
}
