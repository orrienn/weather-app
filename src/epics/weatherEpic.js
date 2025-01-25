import { ofType } from "redux-observable";
import { switchMap, map, catchError, debounceTime, withLatestFrom } from "rxjs/operators";
import { of, from } from "rxjs";
import { fetchWeather } from "../api/weatherApi";
import { setCities, setWeatherError } from "../store/mapSlice";

export const weatherEpic = (action$, state$) =>
    action$.pipe(
        ofType("map/fetchWeatherData"),
        debounceTime(500),
        withLatestFrom(state$),
        switchMap(([, state]) => {
            const cities = state.map.cities.slice(0, 20);
            return from(fetchWeather(cities)).pipe(
                map((weatherData) => {
                    const updatedCities = state.map.cities.map((city) => ({
                        ...city,
                        weather: weatherData.find((w) => w.id === city.id) || null,
                    }));
                    return setCities(updatedCities);
                }),
                catchError((error) =>
                    of(setWeatherError(error.message))
                )
            );
        })
    );
