import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
    pointerEvents: 'none' // Add this - allows clicks to pass through
};

const mapOptions = {
    // Re-enable pointer events for the map itself
    gestureHandling: 'greedy',
    // Optional: disable UI controls if you want
    // disableDefaultUI: true,
};

const center = {
    lat: 0,
    lng: 0
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            },
            (error) => console.log("Error:", error),
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={{ ...containerStyle, pointerEvents: 'auto' }}
                    center={currentPosition}
                    zoom={15}
                    options={mapOptions}
                >
                    <Marker position={currentPosition} />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default LiveTracking