import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getLatLngFromAddress = async (address, posto) => {
    const apiKey = 'AsijwrZ5bwVA7oP1Gg0i61_46A6-y_fwb3SfMbcgBqUQLuX8Bz7SX4Y-tlxipxff';
    const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();

    // Verifica se há resultados
    if (data.resourceSets.length > 0 && data.resourceSets[0].resources.length > 0) {
        const location = data.resourceSets[0].resources[0].point.coordinates;
        const latitude = location[0];
        const longitude = location[1];
        return { latitude, longitude };
    } else {
        toast.info(`\n ERRO ao obter o endereço do ${posto}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000,
            closeButton: false,
            tema: "luz",
            style: {
                backgroundColor: '#022b3a',
                color: 'white',
              },
              progressBarStyle: {
                backgroundColor: 'green', // Cor da barra de tempo
              },
          });
        return null;
    }
}

