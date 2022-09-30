/*
 * @Author: Leo
 * @Date: 2022-09-29 18:19:15
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 18:24:51
 * @FilePath: \coding-challenge-frontend\src\Apis\LocationService.js
 * @Description:
 */
import Axios from 'axios';

export default class LocationService {
    static BASE_URL = 'https://api.opencagedata.com/geocode/v1/json?';
    //q=LAT+LNG&key=YOUR-API-KEY

    static API_KEY = '066c930b1b9f4d9bb89733fb93e9827b';

    static getPlaceByLocation(lat, lon) {
        return Axios.get(`${this.BASE_URL}q=${lat}+${lon}&key=${this.API_KEY}&language=en`);
    }
}