import { configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import mapReducer from "./mapSlice";
import { cityEpic } from "../epics/cityEpic";

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(cityEpic);

const store = configureStore({
    reducer: {
        map: mapReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;