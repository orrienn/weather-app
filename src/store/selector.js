export const selectFilteredCities = (state) => {
    const { cities } = state.map;
    const { nameFilter, populationRange } = state.filter;

    const filteredCities = cities
        .filter((city) => {
            const matchesName = city.name.toLowerCase().includes(nameFilter.toLowerCase());
            const matchesPopulation =
                city.population >= populationRange[0] && city.population <= populationRange[1];
            return matchesName && matchesPopulation;
        })
        .sort((a, b) => b.population - a.population);

    return filteredCities.slice(0, 20);
};