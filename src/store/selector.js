export const selectFilteredCities = (state) => {
    const { cities } = state.map;
    const { nameFilter, populationRange } = state.filter;

    return cities.filter((city) => {
        const matchesName = city.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesPopulation =
            city.population >= populationRange[0] && city.population <= populationRange[1];
        return matchesName && matchesPopulation;
    });
};