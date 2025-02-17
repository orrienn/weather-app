import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

export const CustomMarker = ({ position, cityName, weather, weatherScore }) => {
    const emojiMap = {
        2: "✅",
        1: "☑️",
        0: "❌",
    };

    const desc_map = {
        2: "Nice",
        1: "Passable",
        0: "Bad",
    };

    const weatherEmoji = emojiMap[weatherScore] || "❓";
    const desc = desc_map[weatherScore] || "unknown";

    const iconHtml = `
        <div style="position: relative; text-align: center;">
            <img src="${weather?.icon || "default-marker.png"}" style="width: 40px; height: 40px;" />
            <div style="
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 20px;
            ">${weatherEmoji}</div>
        </div>
    `;

    const icon = L.divIcon({
        html: iconHtml,
        className: "custom-marker",
        iconSize: [40, 40],
    });

    return (
        <Marker position={position} icon={icon}>
            <Popup>
                <div style={{ textAlign: "center" }}>
                    <h3>{cityName}</h3>
                    {weather ? (
                        <div>
                            <p>
                                <strong>{desc} {weatherEmoji}</strong>
                            </p>
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
