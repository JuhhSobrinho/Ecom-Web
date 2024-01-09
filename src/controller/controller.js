import { collection, getDocs } from "firebase/firestore";
import { db } from "../model/model";


export const querySnapshot = await getDocs(collection(db, "postos"));

const postosData = [];
querySnapshot.forEach((doc) => {
    const dataFor = doc.data();
    postosData.push({
        id: doc.id,
        nome: dataFor.nome,
        endereco: dataFor.endereco,
        bandeira: dataFor.bandeira,
        precoD: dataFor.preco.diesel,
        precoE: dataFor.preco.etanol,
        precoG: dataFor.preco.gaso,
        lat: dataFor.localizacao.latitude,
        lon: dataFor.localizacao.longitude,
        avaliacao: dataFor.avaliacao,
        date: dataFor.date,

    });
});

export const firePosto = postosData; 

