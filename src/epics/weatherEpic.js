import { ofType } from "redux-observable";
import { switchMap, map, catchError, debounceTime, withLatestFrom, tap } from "rxjs/operators";
import { of, from } from "rxjs";
import { fetchWeather } from "../api/weatherApi";
import { fetchWeatherSuccess, fetchWeatherFailed } from "../store/weatherSlice";

export const weatherEpic = (action$, state$) =>
    action$.pipe(
        ofType("map/setCities"),
        debounceTime(500),
        withLatestFrom(state$),
        switchMap(([, state]) => {
            console.log("Weather epic triggered");
            const cities = state.map.cities.slice(0, 20);
            return from(fetchWeather(cities)).pipe(
                map((weatherData) => {
                    return fetchWeatherSuccess(weatherData);
                }),
                catchError((error) => of(fetchWeatherFailed(error.message)))
            );
        })
    );
