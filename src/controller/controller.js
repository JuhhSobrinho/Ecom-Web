import { collection, getDocs } from "firebase/firestore";
import { db } from "../model/model";

const auxPostoId = [];

export const querySnapshot = await getDocs(collection(db, "postos"));
querySnapshot.forEach((doc) => {
});