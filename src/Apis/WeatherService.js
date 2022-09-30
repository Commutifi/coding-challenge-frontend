/*
 * @Author: Leo
 * @Date: 2022-09-29 18:02:03
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 19:09:51
 * @FilePath: \coding-challenge-frontend\src\Apis\WeatherService.js
 * @Description:
 */
import Axios from 'axios';

export default class WeatherService {

    static API_KEY = '9fa84fea8c9501540ec1aefecf11c25d';
    static BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall?';

    static getWeatherByLocation(lat, lon) {
        return Axios.get(`${this.BASE_URL}lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`);
    }

    static getWeatherIconUrl(icon, size) {
        return `http://openweathermap.org/img/wn/${icon}@${size}.png`
    }
}
