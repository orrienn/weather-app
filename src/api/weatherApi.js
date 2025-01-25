import { WEATHER_API_URL } from "../config";
import { WEATHER_API_KEY } from "../key.js";

export const fetchWeather = async (cities) => {
    const weatherPromises = cities.map(async (city) => {
        const url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city.lat},${city.lon}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather for city ${city.name}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(JSON.stringify(data , null, 2));
        console.log(isWeatherNice(data));
        return {
            id: city.id,
            weather: data.current.condition.text,
            temperature: data.current.temp_c,
            isNice: isWeatherNice(data),
        };
    });

    return Promise.all(weatherPromises);
};


// fix this ig
const isWeatherNice = (data) => {
    const { current } = data;
    const temp = current.temp_c;
    const hasNoRain = !current.some((w) => current.condition.text.toLowerCase().includes("rain"));
    return {
        isNice: temp >= 18 && temp <= 25 && hasNoRain,
        isPassable: temp >= 18 && temp <= 25 || hasNoRain,
    };
};
