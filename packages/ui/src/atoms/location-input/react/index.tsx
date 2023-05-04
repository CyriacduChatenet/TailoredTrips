import { Dispatch, FC, SetStateAction, useState } from "react";
import mapboxgl from "mapbox-gl";
import { CreateActivityDetailDTO, CreateTravelDTO, UpdateTravelDTO } from "@travel-tailor/types";

import Geocoder from "../../geocoder/react";

interface IProps {
    mapboxAccessToken: string
    setStateCredentials: Dispatch<SetStateAction<any>>
    stateCredentials: CreateActivityDetailDTO | CreateTravelDTO | UpdateTravelDTO,
    objectKey: string
    error: string
    value?: string | number
    className?: string
};

export const WebLocationInput:FC<IProps> = ({ mapboxAccessToken, setStateCredentials, stateCredentials, objectKey, error, value, className }) => {
    const [results, setResults] = useState<mapboxgl.MapboxGeoJSONFeature[]>([]);
    const [hideAutocomplete, setHideAutocomplete] = useState(true);
    const [geocoderQuery, setGeocoderQuery] = useState('');

    const handleCredentials = (value: string) => {
        setStateCredentials({ ...stateCredentials, [objectKey]: value })
        setGeocoderQuery(value);
    };

    return (
        <div onMouseEnter={() => setHideAutocomplete(!hideAutocomplete)} onMouseLeave={() => setHideAutocomplete(!hideAutocomplete)}>
        <Geocoder setResults={setResults} accessToken={mapboxAccessToken} geocoderQuery={geocoderQuery} setGeocoderQuery={setGeocoderQuery} placeholder={objectKey}value={value} className={className} />
        <ul>
          {!hideAutocomplete ? results.map((result: any) => (
            <li key={result.id} className="location-input" onClick={() => handleCredentials(result.place_name)}>{result.place_name}</li>
          )) : null}
        </ul>
        <br />
        {error && <p>{error}</p>}
      </div>
    );
}