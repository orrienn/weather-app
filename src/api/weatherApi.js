import { WEATHER_API_URL } from "../const.js";

export const fetchWeather = async (cities) => {
    const weatherPromises = cities.map(async (city) => {
        const url = `${WEATHER_API_URL}?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city.lat},${city.lon}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather for city ${city.name}: ${response.statusText}`);
        }

        const data = await response.json();
        const { current } = data;
        return {
            id: city.id,
            name: city.name,
            condition: current.condition.text,
            temperature: current.temp_c,
            icon: current.condition.icon,
            isNice: getWeatherScore(current),
        };
    });

    return Promise.all(weatherPromises);
};

const getWeatherScore = (current) => {
    const temp = current.temp_c;
    const hasRain = current.condition.text.toLowerCase().includes("rain");

    if (temp >= 18 && temp <= 25 && !hasRain) {
        return 2;
    } else if (temp >= 18 && temp <= 25 || !hasRain) {
        return 1;
    } else {
        return 0;
    }
};
