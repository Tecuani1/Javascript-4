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
    const x = geometry?.x;
    const y = geometry?.y;

    // Añadimos el estado si no está en la lista
    if (state && !states.includes(state)) {
      states.push(state);
    }

    // Añadimos la ubicación de la universidad
    if (university || x !== undefined || y !== undefined) {
      universityLocations.push({
        locationName: university,
        latLng: [x, y],
      });
    }
  });

  return [states, universityLocations];
}

// Verificamos que existan datos antes de ejecutar la transformación
if (data.features.length > 0
) {
  const [states, universityLocations] = locationsTransformer(data.features);

  // Mostramos los resultados en la consola
  console.log("Estados únicos:", states);
  console.log("Ubicaciones de universidades:", universityLocations);
} else {
  console.log("No se encontraron datos en el archivo.");
}
