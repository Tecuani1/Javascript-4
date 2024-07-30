import { data } from "./data.js";

// Función unificada para obtener estados únicos y ubicaciones de universidades
function locationsTransformer(features) {
  const states = [];
  const universityLocations = [];

  features.forEach((feature) => {
    const attributes = feature.attributes;
    const geometry = feature.geometry;

    const state = attributes?.State;
    const university = attributes?.University_Chapter;
    const city = attributes?.City;
    const x = geometry?.x;
    const y = geometry?.y;

    // Añadimos el estado si no está en la lista
    if (state && !states.includes(state)) {
      states.push(state);
    }

    // Añadimos la ubicación de la universidad
    if (university || x !== null || y !== null) {
      universityLocations.push({
        university: university,
        state: state,
        latLng: [x, y],
      });
    }
  });

  return [states, universityLocations];
}

// Verificamos que existan datos antes de ejecutar la transformación
if (data?.features?.length > 0) {
  const [states, universityLocations] = locationsTransformer(data.features);


  // Crear el select de estados
  const stateSelect = document.getElementById('stateSelect');
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.text = state;
    stateSelect.appendChild(option);
  });


// Crear la tabla de universidades
const universityTable = document.getElementById('universityTable').getElementsByTagName('tbody')[0];
universityLocations.forEach(location => {
    const row = document.createElement('tr');
    const universityCell = document.createElement('td');
    universityCell.textContent = location.university;
    const latCell = document.createElement('td');
    latCell.textContent = location.latLng[0];
    const lngCell = document.createElement('td');
    lngCell.textContent = location.latLng[1];
    row.appendChild(universityCell);
    row.appendChild(latCell);
    row.appendChild(lngCell);
    universityTable.appendChild(row);
});
} else {
  console.log("No se encontraron datos en el archivo.");
}
