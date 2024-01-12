import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../model/model";

const querySnapshot = await getDocs(collection(db, "postos"));

const postosData = [];
querySnapshot.forEach((doc) => {
    const dataFor = doc.data();
    postosData.push({
        id: doc.id,
        nome: dataFor.nome || '',
        endereco: dataFor.endereco || '',
        bandeira: dataFor.bandeira || '',
        precoD: dataFor.preco?.diesel || 0,
        precoE: dataFor.preco?.etanol || 0,
        precoG: dataFor.preco?.gaso || 0,
        lat: dataFor.localizacao?.latitude || 0,
        lon: dataFor.localizacao?.longitude || 0,
        avaliacao: dataFor.avaliacao || 0,
        date: dataFor.date || null,
    });
});

export const getSaveData = async (uidAtual) => {
    try {
        if (typeof uidAtual !== 'string' || uidAtual === '') {
            throw new Error('ID do usuário inválido');
        }

        const userDocRef = doc(db, 'users', uidAtual);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const saveData = {
                postosSalvos: userData.postosSalvos || [],
            };

            return saveData;
        } else {
            console.error('Documento do usuário não encontrado para UID:', uidAtual);
            return null;
        }
    } catch (error) {
        return null;
    }
};

export const firePosto = postosData;