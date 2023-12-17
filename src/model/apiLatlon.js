export async function getLatLngFromAddress(address) {
    const apiKey = 'AsijwrZ5bwVA7oP1Gg0i61_46A6-y_fwb3SfMbcgBqUQLuX8Bz7SX4Y-tlxipxff';
    const response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();

    // Verifica se há resultados
    if (data.resourceSets.length > 0 && data.resourceSets[0].resources.length > 0) {
        const location = data.resourceSets[0].resources[0].point.coordinates;
        const latitude = location[0];
        const longitude = location[1];

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        return { latitude, longitude };
    } else {
        console.error('Falha ao obter a latitude e a longitude do endereço.');
        return null;
    }
}

// Exemplo de uso

