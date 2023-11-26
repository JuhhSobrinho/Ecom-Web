import React, { useEffect, useState } from 'react';
import { collection, addDoc , serverTimestamp } from 'firebase/firestore';
import { db } from '../model/model';
import { } from "../maps/mapa.css";
import { } from "../maps/mapa.js";

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
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


function callAdd() {
    addPostos();
}

export function AddPosto(setCordenadas) {

    return (
        <div id="telaPosto">
            <h1>Tela AddPosto</h1>
            {callAdd()}
        </div>
    );

}
