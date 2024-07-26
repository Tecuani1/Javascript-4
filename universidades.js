const locationsTransformer = (data) => {
  const states = new Set();
  const locations = [];

  data.features.forEach(
    ({ attributes: { State, University_Chapter }, geometry: { x, y } }) => {
      states.add(State);
      locations.push({ locationName: University_Chapter, latLng: [x, y] });
    }
  );

  return [Array.from(states), locations];
};

console.log(locationsTransformer(data));
