import React, { useState, useContext } from "react";
import LocationContext from "../context/LocationContext";

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import "./search.scss";

const Search = ({
  setIsLocal,
}: {
  setIsLocal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [address, setAddress] = useState("");
  const locationContext = useContext(LocationContext);

  const handleSelect = async (val: any) => {
    const results = await geocodeByAddress(val);
    const ll = await getLatLng(results[0]);
    console.log(ll);
    setIsLocal(false);
    locationContext?.setLocation({
      lon: ll.lng,
      lat: ll.lat,
    });
  };

  return (
    <>
      {/* <div>
        <span>{address}</span>
        <span>{coordinates.lat}</span>
        <span>{coordinates.lng}</span>
      </div> */}
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="searchWrapper">
            <input
              {...getInputProps({
                placeholder: "Search a new location",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, indx) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={indx}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default Search;
