import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { fetchCities } from "../api/overpassApi";
import { setCities } from "../store/mapSlice";

export const cityEpic = (action$, state$) =>
  action$.pipe(
    ofType("map/fetchCitiesRequest"),
    mergeMap((action) => {
        const { bbox } = action.payload;

        return from (fetchCities(bbox)).pipe(
            map((cities) => setCities(cities)),
            catchError((error) => {
                console.error("Failed to fetch cities:", error);
                return of();
            })
        );
    })
  );