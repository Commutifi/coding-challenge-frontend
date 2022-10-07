import { LocationType } from "../context/LocationContext";
import useFetch from "./useFetch";

const API_KEY = "a5f62cc8168d4917bed9890208f4e30f";

const useLocation = (coordinates: LocationType | null) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${coordinates?.lat}+${coordinates?.lon}&key=${API_KEY}&language=en`;

  return useFetch(coordinates ? url : "");
};

export default useLocation;
