import { OVERPASS_URL } from "../config"; 

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
    console.log(JSON.stringify(data , null, 2));
    return data.elements.map((element) => ({
        id: element.id, 
        name: element.tags.name,
        population: element.tags.population ? parseInt(element.tags.population, 10) : null,
        lat: element.lat,
        lon: element.lon
    }));
};