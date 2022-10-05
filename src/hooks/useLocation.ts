import { LocationType } from "../context/LocationContext";
import useFetch from "./useFetch";

const API_KEY = "066c930b1b9f4d9bb89733fb93e9827b";

const useLocation = (coordinates: LocationType | null | undefined) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${coordinates?.lat}+${coordinates?.lon}&key=${API_KEY}&language=en`;

  return useFetch(url);
};

export default useLocation;
