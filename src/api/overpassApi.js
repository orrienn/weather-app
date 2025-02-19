import { OVERPASS_URL } from "../const"; 

export const fetchCities = async (bbox) => {
    const query = `
    [out:json];
    node
        ["place"="city"]
        (${bbox.south},${bbox.west},${bbox.north},${bbox.east});
    out;`;

    const url = `${OVERPASS_URL}?data=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if(!response.ok)
    {
        throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }

    const data = await response.json();

    const sortedCities = data.elements
        .map((element) => ({
            id: element.id,
            name: element.tags.name,
            population: element.tags.population ? parseInt(element.tags.population, 10) : 0,
            lat: element.lat,
            lon: element.lon,
        }))
        .sort((a, b) => b.population - a.population)
        .slice(0, 20);

    return sortedCities;
};