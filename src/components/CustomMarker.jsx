import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

export const CustomMarker = ({ position, cityName, weather }) => {
    const icon = L.icon({
        iconUrl: weather?.icon || "default-marker.png",
        iconSize: [40, 40],
    });

    return (
        <Marker position={position} icon={icon}>
            <Popup>
                <div>
                    <h3>{cityName}</h3>
                    {weather ? (
                        <div>
                            <p>
                                <strong>Temperature:</strong> {weather.temperature}°C
                            </p>
                            <p>
                                <strong>Condition:</strong> {weather.condition}
                            </p>
                        </div>
                    ) : (
                        <p>Loading weather data...</p>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};
