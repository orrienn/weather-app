import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
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
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserPosition([latitude, longitude]);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setUserPosition([51.505, -0.09]);
                }
            );
        }
        else
        {
            console.error("Geolocation is not supported by this browser.");
            setUserPosition([51.505, -0.09]);
        }
    }, []);

    return (
        <MapContainer 
            center={userPosition || [51.505, -0.09]} 
            zoom={13} 
            style={{ height: "100vh" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userPosition && <CenterMapOnUser userPosition={userPosition} />}
        </MapContainer>
    );
};