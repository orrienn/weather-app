import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../store/mapSlice';
import "leaflet/dist/leaflet.css";


const CenterMapOnUser = ({ userPosition }) => {
    const map = useMap();

    useEffect(() => {
        if(userPosition)
        {
            map.setView(userPosition, map.getZoom());
        }
    }, [userPosition, map]);

    return null;
}

export const MapComponent = () => {
    const dispatch = useDispatch(); 
    const userLocation = useSelector((state) => state.map.userLocation);
    // const [userPosition, setUserPosition] = useState(null);

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

    const MapCenterer = () => {
        const map = useMap();
    
        useEffect(() => {
          if (userLocation) {
            map.setView(userLocation, 13);
          }
        }, [userLocation, map]);
    
        return null;
    };

    return (
        <MapContainer 
            center={userLocation || [51.505, -0.09]} 
            zoom={13} 
            style={{ height: "100vh" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapCenterer />
        </MapContainer>
    );
};