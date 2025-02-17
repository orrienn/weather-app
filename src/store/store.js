import { configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import mapReducer from "./mapSlice";
import themeReducer from './themeSlice';
import weatherReducer from './weatherSlice';
import filterReducer from './filterSlice';
import { cityEpic } from "../epics/cityEpic";
import { weatherEpic } from "../epics/weatherEpic";

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(cityEpic, weatherEpic);

const store = configureStore({
    reducer: {
        map: mapReducer,
        theme: themeReducer,
        weather: weatherReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;