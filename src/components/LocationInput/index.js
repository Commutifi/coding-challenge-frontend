/*
 * @Author: Leo
 * @Date: 2022-09-29 16:25:10
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 17:25:10
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
import './index.scss';

const LocationInput = () => {
    const [searchMethod, setSearchMethod] = React.useState('name');

    const handleSearchMethodChange = (e) => {
        setSearchMethod(e.target.value);
    }

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
                            transform: searchMethod === 'name' ? 'translateY(0)' : 'translateY(calc(-50% - 16px))'
                        }}
                    >
                        <TextField
                            label="Input some places"
                            variant="outlined"
                            sx={{width: '100%'}}
                        />
                        <Box className='input-long-lat'>
                            <TextField
                                label="Longitude"
                                variant="outlined"
                                sx={{width: '50%', mr: 1}}
                            />
                            <TextField
                                label="Latitude"
                                variant="outlined"
                                sx={{width: '50%', ml: 1}}
                            />
                        </Box>
                    </Box>
                </Box>

                <Button variant="contained" startIcon={<SearchIcon />} sx={{width: '200px', ml: 2}}>
                    Search
                </Button>
            </Box>
        </Box>
    );
};

export default LocationInput;