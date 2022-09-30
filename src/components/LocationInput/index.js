/*
 * @Author: Leo
 * @Date: 2022-09-29 16:25:10
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 21:59:54
 * @FilePath: \coding-challenge-frontend\src\components\LocationInput\index.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';
import { changeLocation } from '../../redux/locationSlice';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import './index.scss';

const libraries = ["places"];

const LocationInput = () => {
    const [searchMethod, setSearchMethod] = React.useState('name');
    const [location, setLocation] = React.useState(null);
    const [locationFromName, setLocationFromName] = React.useState(null);
    const [place, setPlace] = React.useState('');
    const [autoComplete, setAutoComplete] = React.useState(null);

    const dispatch = useDispatch();

    React.useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            dispatch(changeLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLocationChange = (e, valName) => {
        setLocation((prev) => {
            const temp = {
                ...prev
            };
            temp[valName] = Number(e.target.value);
            return temp;
        });
    };

    const handleSearchMethodChange = (e) => {
        setSearchMethod(e.target.value);
    };

    const handleSearch = () => {
        if (searchMethod === 'name') {
            dispatch(changeLocation(locationFromName));
        } else {
            dispatch(changeLocation(location));
        }
    };

    const handleOnLoad = (autocomplete) => {
        setAutoComplete(autocomplete);
    }

    const handlePlaceSelected = () => {
        const place = autoComplete.getPlace();
        setPlace(place.formatted_address);
        setLocationFromName({
            lat: place.geometry.location.lat(),
            lon: place.geometry.location.lng()
        });
    };

    return (
        <Box className='location-input-main'>
            <Box className='location-input-container'>

                <FormControl sx={{width: '200px'}}>
                    <InputLabel>Search By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchMethod}
                        label="Search By"
                        sx={{mr: 2}}
                        onChange={handleSearchMethodChange}
                    >
                        <MenuItem value={'name'}>Name</MenuItem>
                        <MenuItem value={'location'}>Location</MenuItem>
                    </Select>
                </FormControl>

                <Box className='inputs-transform-container'>
                    <Box
                        className='inputs-transform-absolute'
                        sx={{
                            transform: searchMethod === 'name' ? 'translateY(0)' : 'translateY(calc(-50% - 32px))'
                        }}
                    >
                        <LoadScript
                            googleMapsApiKey="AIzaSyCKR_7S6WE5ETziYlastsHnmKuvELeFTW4"
                            libraries={libraries}
                        >
                            <Autocomplete onLoad={handleOnLoad} onPlaceChanged={handlePlaceSelected}>
                                <TextField
                                    label="Input some places"
                                    variant="outlined"
                                    value={place}
                                    onChange={(e) => setPlace(e.target.value)}
                                    sx={{width: '100%'}}
                                />
                            </Autocomplete>
                        </LoadScript>
                        <Box className='input-long-lat'>
                            <TextField
                                type="number"
                                label="Longitude"
                                variant="outlined"
                                sx={{width: '50%', mr: 1}}
                                value={location?.lon || ''}
                                onChange={(e) => handleLocationChange(e, 'lon')}
                            />
                            <TextField
                                type="number"
                                label="Latitude"
                                variant="outlined"
                                sx={{width: '50%', ml: 1}}
                                value={location?.lat || ''}
                                onChange={(e) => handleLocationChange(e, 'lat')}
                            />
                        </Box>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{width: '200px', ml: 2}}
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};

export default LocationInput;