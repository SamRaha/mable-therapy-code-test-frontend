import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LocationListenerProps {
    onLocationChange: () => void;
}

const LocationListener: React.FC<LocationListenerProps> = ({ onLocationChange }) => {
    const location = useLocation();

    useEffect(() => {
        onLocationChange();
    }, [location, onLocationChange]);

    return null;
};

export default LocationListener;
