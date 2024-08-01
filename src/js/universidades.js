import { data } from '/src/data/data.js';

// Función unificada para obtener estados únicos y ubicaciones de universidades
function locationsTransformer(features) {
  const states = [];
  const universityLocations = [];

  features.forEach((feature) => {
    const attributes = feature.attributes;
    const geometry = feature.geometry;

    const state = attributes?.State;
    const university = attributes?.University_Chapter;
    const x = geometry?.x;
    const y = geometry?.y;

    // Añadimos el estado si no está en la lista
    if (state && !states.includes(state)) {
      states.push(state);
    }

    if (university && state) {
      universityLocations.push({
        university: university,
        latLng: [x, y],
      });
    } else {
      // Agregar la ubicación con los datos que tengas, sin coordenadas si falta la universidad
      universityLocations.push({
        university: university || 'Unknown university',
        latLng: university ? [x, y] : null, // Asignar coordenadas solo si hay universidad
      });
    }
  });

  return [states, universityLocations];
}

// Función para crear el select de estados
function createStateSelect(states) {
  const stateSelect = document.getElementById('stateSelect');
  states.forEach((state) => {
    const option = document.createElement('option');
    option.value = state;
    option.text = state;
    stateSelect.appendChild(option);
  });
}

// Función para crear la tabla de universidades
function createUniversityTable(universityLocations) {
  const tbody = document.getElementById('UniversityTable');

  // Verificar si el tbody existe
  if (tbody) {
    universityLocations.forEach((location) => {
      const row = document.createElement('tr');
      const universityCell = document.createElement('td');
      universityCell.textContent = location.university;
      const latCell = document.createElement('td');
      latCell.textContent = location.latLng ? location.latLng[0] : 'N/A';
      const lngCell = document.createElement('td');
      lngCell.textContent = location.latLng ? location.latLng[1] : 'N/A';
      row.appendChild(universityCell);
      row.appendChild(latCell);
      row.appendChild(lngCell);
      tbody.appendChild(row);
    });
  } else {
    console.error('No se encontró el tbody en la tabla de universidades.');
  }
}

// Verificamos que existan datos antes de ejecutar la transformación
if (data?.features?.length > 0) {
  const [states, universityLocations] = locationsTransformer(data.features);

  // Mostrar los estados y ubicaciones en la consola
  console.log('States:', states);
  console.log('University Locations:', universityLocations);

  // Crear el select de estados
  createStateSelect(states);

  // Crear la tabla de universidades
  createUniversityTable(universityLocations);
} else {
  console.log('No se encontraron datos en el archivo.');
}
