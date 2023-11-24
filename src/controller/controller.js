import { collection, getDocs } from "firebase/firestore";
import { db } from "../model/model";

const auxPostoId = [];

export const querySnapshot = await getDocs(collection(db, "postos"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);

    auxPostoId.unshift(doc.id);



  for (let index = 0; index < auxPostoId.length; index++) {
    const element = auxPostoId[index];



    if (doc.id === element) {
      const data = doc.data();

      console.log("dataaa",data);

     

  }
}});