import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useMap } from 'react-leaflet';

export const MapCenterer = forwardRef(({ userLocation }, ref) => {
    const map = useMap();
    const [hasCentered, setHasCentered] = useState(false);

    const centerMap = () => {
        if (userLocation) {
            map.setView(userLocation, map.getZoom());
        }
    };

    useImperativeHandle(ref, () => ({
        centerMap,
    }));

    useEffect(() => {
        if (userLocation && !hasCentered) {
            centerMap();
            setHasCentered(true);
        }
    }, [userLocation, map, hasCentered]);

    return null;
});