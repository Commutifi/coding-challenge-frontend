/*
 * @Author: Leo
 * @Date: 2022-09-29 16:25:10
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-02 19:21:40
 * @FilePath: \coding-challenge-frontend\src\components\LocationInput\index.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { changeLocation, setIsLocal } from '../../redux/locationSlice';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import useMediaQuery from '@mui/material/useMediaQuery';
import './index.scss';

const libraries = ["places"];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LocationInput = () => {
    const [searchMethod, setSearchMethod] = React.useState('name');
    const [location, setLocation] = React.useState(null);
    const [locationFromName, setLocationFromName] = React.useState(null);
    const [place, setPlace] = React.useState('');
    const [autoComplete, setAutoComplete] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [shake, setShake] = React.useState('');

    const matches = useMediaQuery('(max-width: 900px)');

    const dispatch = useDispatch();

    React.useEffect(() => {
        getLocalWeather();
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
            // if place input is empty, get local weather
            if (!place) {
                getLocalWeather();
            } else {
                dispatch(changeLocation(locationFromName));
                dispatch(setIsLocal({ isLocal: false }));
            }
        } else {
            // if location is empty, get local weather
            if (!location.lon && !location.lat) {
                getLocalWeather();
            } else if (!location.lon || !location.lat) {
                setError(true);
                if (!location.lon) setShake('lon');
                if (!location.lat) setShake('lat');
                setTimeout(() => {setShake('')}, 500);
            } else {
                dispatch(changeLocation(location));
                dispatch(setIsLocal({ isLocal: false }));
            }
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

    const getLocalWeather = () => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            dispatch(changeLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }));
            dispatch(setIsLocal({ isLocal: true }));
        });
    };

    return (
        <Box className='location-input-main animate__animated animate__fadeInDown'>

            <Snackbar
                open={error}
                autoHideDuration={2000}
                onClose={() => setError(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert onClose={() => setError(false)} severity="warning" sx={{ width: '100%' }}>
                    Wrong location coordinates!
                </Alert>
            </Snackbar>

            <Box className='location-input-container'>

                <FormControl sx={{width: matches ? '110px' : '130px'}}>
                    <InputLabel>Search By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchMethod}
                        label="Search By"
                        sx={{mr: 2, fontSize: matches ? '12px' : '16px'}}
                        onChange={handleSearchMethodChange}
                        size={matches ? 'small' : 'medium'}
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
                            googleMapsApiKey='AIzaSyC9q83SHSHKCqEM0Q23IH91DopXxoXsm-I'
                            language='en'
                            libraries={libraries}
                        >
                            <Autocomplete onLoad={handleOnLoad} onPlaceChanged={handlePlaceSelected}>
                                <TextField
                                    label="Input some places"
                                    variant="outlined"
                                    value={place}
                                    inputProps={{
                                        style: {
                                            fontSize: matches ? '12px' : '16px'
                                        }
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: matches ? '12px' : '16px'
                                        }
                                    }}
                                    onChange={(e) => setPlace(e.target.value)}
                                    sx={{width: '100%'}}
                                    size={matches ? 'small' : 'medium'}
                                />
                            </Autocomplete>
                        </LoadScript>
                        <Box className='input-long-lat'>
                            <TextField
                                type="number"
                                label="Longitude"
                                variant="outlined"
                                sx={{width: '50%', mr: 1}}
                                inputProps={{
                                    style: {
                                        fontSize: matches ? '12px' : '16px'
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: matches ? '12px' : '16px'
                                    }
                                }}
                                value={location?.lon || ''}
                                size={matches ? 'small' : 'medium'}
                                className={`animate__animated animate__faster ${shake === 'lon' ? 'animate__headShake' : ''}`}
                                onChange={(e) => handleLocationChange(e, 'lon')}
                            />
                            <TextField
                                type="number"
                                label="Latitude"
                                variant="outlined"
                                sx={{width: '50%', ml: 1}}
                                inputProps={{
                                    style: {
                                        fontSize: matches ? '12px' : '16px'
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: matches ? '12px' : '16px'
                                    }
                                }}
                                value={location?.lat || ''}
                                size={matches ? 'small' : 'medium'}
                                className={`animate__animated animate__faster ${shake === 'lat' ? 'animate__headShake' : ''}`}
                                onChange={(e) => handleLocationChange(e, 'lat')}
                            />
                        </Box>
                    </Box>
                </Box>

                {
                    matches ?
                    <IconButton color="primary" onClick={handleSearch} sx={{ml: 2}}>
                        <SearchIcon />
                    </IconButton> :
                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        sx={{
                            width: '120px',
                            ml: 2,
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                }
            </Box>
        </Box>
    );
};

export default LocationInput;