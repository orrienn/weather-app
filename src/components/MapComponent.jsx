import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation, setCities, fetchWeatherData } from '../store/mapSlice';
import { fetchCities } from '../api/overpassApi';
import { CustomMarker } from './CustomMarker';
import { BASE_ZOOM } from '../config';
import "leaflet/dist/leaflet.css";


const MapCenterer = ({ userLocation }) => {
    const map = useMap();
    const [hasCentered, setHasCentered] = useState(false);

    useEffect(() => {
        if (userLocation && !hasCentered) {
            map.setView(userLocation, BASE_ZOOM);
            setHasCentered(true);
        }
    }, [userLocation, map, hasCentered]);

    return null;
};

const MapEventHandler = () => {
    const dispatch = useDispatch();
    const cachedCities = useSelector((state) => state.map.cities);

    const map = useMapEvents({
        moveend: async () => {
            const bounds = map.getBounds();
            if (!bounds) return;

            const bbox = {
                south: bounds.getSouth(),
                west: bounds.getWest(),
                north: bounds.getNorth(),
                east: bounds.getEast(),
            };

            const now = Date.now();
            const oneHour = 60 * 60 * 1000;

            dispatch({ type: "map/fetchCitiesRequest", payload: { bbox } });

            if (cachedCities.length > 0) {
                dispatch(fetchWeatherData());
            }

            // try {
            //     const fetchedCities = await fetchCities(bbox);

            //     const newCities = fetchedCities.filter(
            //         (city) => !cachedCities.some((cachedCity) => cachedCity.id === city.id)
            //     );

            //     if (newCities.length > 0) {
            //         dispatch(setCities(newCities));
            //     }
            // } catch (error) {
            //     console.error("Failed to fetch cities:", error);
            // }
        },
    });

    return null;
};


export const MapComponent = () => {
    const dispatch = useDispatch();
    const userLocation = useSelector((state) => state.map.userLocation);
    const cities = useSelector((state) => state.map.cities);
    // const weatherData = useSelector((state) => state.map.weatherData);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                dispatch(setUserLocation([latitude, longitude]));
            },
            (error) => {
                console.error("Geolocation error:", error);
                dispatch(setUserLocation([51.505, -0.09]));
            }
        );
    }, [dispatch]);

    useEffect(() => {
        if (userLocation) {
            const fetchInitialCities = async () => {
                const bounds = {
                    south: userLocation[0] - 1,
                    west: userLocation[1] - 1,
                    north: userLocation[0] + 1,
                    east: userLocation[1] + 1,
                };

                dispatch({ type: "map/fetchCitiesRequest", payload: { bbox: bounds } });

                // try {
                //     const fetchedCities = await fetchCities(bounds);
                //     dispatch(setCities(fetchedCities));
                // } catch (error) {
                //     console.error("Failed to fetch initial cities:", error);
                // }
            };

            fetchInitialCities();
        }
    }, [userLocation, dispatch]);

    useEffect(() => {
        if (cities.length > 0) {
            dispatch(fetchWeatherData());
        }
    }, [cities, dispatch]);

    return (
        <MapContainer 
            center={userLocation || [51.505, -0.09]} 
            zoom={BASE_ZOOM} 
            style={{ height: "100vh" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {cities.map((city, index) => (
                <CustomMarker 
                    key={index} 
                    position={[city.lat, city.lon]} 
                    cityName={city.name}
                    weather={city.weather}
                />
            ))}
            {/* {weatherData.map((data) => (
                <CustomMarker key={data.id} position={[data.lat, data.lon]} weather={data} />
            ))} */}
            <MapCenterer userLocation={userLocation} />
            <MapEventHandler />
        </MapContainer>
    );
};
