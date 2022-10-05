import React, { createContext, useState, useContext } from "react";

const defaultState = { location: [40.7648, -73.9808] };

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

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context)
    throw new Error("useLocation must be used inside LocationProvider");

  return context;
}

export default LocationContext;
