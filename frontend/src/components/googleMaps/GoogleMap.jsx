import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import { useCallback } from "react";

export default function GoogleMaps() {
    const mapRef = useRef();
    const center = { lat: 30.612526422257883, lng: -96.34069805422996 };
    const options = { mapId: process.env.REACT_APP_MAP_ID, disableDefaultUI: true };

    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    return isLoaded ? (
        <div className="map">
            <GoogleMap
                zoom={20}
                center={center}
                mapContainerClassName="map__container"
                options={options}>
                onLoad={onLoad}
                <Marker position={center} />
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
}
