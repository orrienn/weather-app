import { WEATHER_API_URL } from "../const.js";
import { WEATHER_API_KEY } from "../key.js";

export const fetchWeather = async (cities) => {
    const weatherPromises = cities.map(async (city) => {
        const url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city.lat},${city.lon}`;
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
            isNice: isWeatherNice(current),
        };
    });

    return Promise.all(weatherPromises);
};

const isWeatherNice = (current) => {
    const temp = current.temp_c;
    const hasNoRain = !current.condition.text.toLowerCase().includes("rain");
    return {
        isNice: temp >= 18 && temp <= 25 && hasNoRain,
        isPassable: temp >= 18 && temp <= 25 || hasNoRain,
        isBad: temp < 18 || temp > 25 || !hasNoRain,
    };
};
