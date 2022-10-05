import React, { createContext, useState } from "react";

const defaultState = { lon: -123.10071939, lat: -49.226465 };

export type LocationType = {
  lon: number;
  lat: number;
};

type LocationContextType = {
  location: LocationType | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationType | null>>;
};

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationType | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationContext;
