import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../model/model';
import {  } from "../maps/mapa.css";
import { botaoCordenada } from "../maps/mapa.js";

export function AddPosto(setCordenadas) {

    return (
    <div id="telaPosto">
        <h1>Tela AddPosto</h1>
    </div>
    );

}
