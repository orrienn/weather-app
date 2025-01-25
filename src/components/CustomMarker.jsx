import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Stwórz niestandardową ikonę
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1116/1116453.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -20],
});

export const CustomMarker = ({ position, cityName }) => {
    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                <strong>{cityName}</strong>
            </Popup>
        </Marker>
    );
};
