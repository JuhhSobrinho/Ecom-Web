import React, { useEffect, useState } from 'react';
import { firePosto } from '../controller/controller';
import "../style/global.css";

export function SalvosPostos() {
  const [postos, setPostos] = useState([]);
  const [statusCopiadoVisible, setStatusCopiadoVisible] = useState(false);

  const copiaCola = async (postId) => {
    // Lógica para copiar o texto...
    try {
      // Usa a API Clipboard para copiar o texto para a área de transferência
      await navigator.clipboard.writeText(postId);

      console.log("Texto copiado: ", postId);
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
        <div key={posto.id} className="postos" onClick={() => copiaCola(posto.id)}>
          <div className="iconPosto">
            <img src={`../../img/${posto.bandeira}.png`} alt="iconDoPosto" className='iconBand' />
            <p className='diasAtras' style={{ display: statusCopiadoVisible[posto.id] ? 'flex' : 'none' }} id='statusCopiado'>copied!</p>
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
      ))}
    </div>
  );
}