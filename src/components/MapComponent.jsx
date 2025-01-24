import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation, setCities } from '../store/mapSlice';
import { fetchCities } from '../api/overpassApi';
import { BASE_ZOOM } from '../config';
import "leaflet/dist/leaflet.css";

export const MapComponent = () => {
    const dispatch = useDispatch(); 
    const userLocation = useSelector((state) => state.map.userLocation);

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

    const MapEventHandler = () => {
        const map = useMapEvents({
            moveend: async () => {
                const bounds = map.getBounds();

                if (!bounds) {
                    console.error('Bounds are undefined');
                    return;
                }

                const bbox = {
                    south: bounds.getSouth(),
                    west: bounds.getWest(),
                    north: bounds.getNorth(),
                    east: bounds.getEast(),
                };

                try {
                    const cities = await fetchCities(bbox);
                    dispatch(setCities(cities));
                } catch (error) {
                    console.error("Failed to fetch cities:", error);
                }
            },
        });

        useEffect(() => {
            const bounds = map.getBounds();
            if (bounds) {
                const bbox = {
                    south: bounds.getSouth(),
                    west: bounds.getWest(),
                    north: bounds.getNorth(),
                    east: bounds.getEast(),
                };
        
                fetchCities(bbox)
                    .then((cities) => dispatch(setCities(cities)))
                    .catch((error) => console.error("Failed to fetch cities:", error));
            }
        }, [map, dispatch]);

        return null;
    };

    const MapCenterer = () => {
        const map = useMap();
    
        useEffect(() => {
          if (userLocation) {
            map.setView(userLocation, BASE_ZOOM);
          }
        }, [userLocation, map]);
    
        return null;
    };

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
            <MapCenterer />
            <MapEventHandler />
        </MapContainer>
    );
};