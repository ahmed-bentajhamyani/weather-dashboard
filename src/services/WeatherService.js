import axios from "axios";

class WeatherService {
    URL = process.env.REACT_APP_API_URL;
    GEO_URL = process.env.REACT_APP_API_GEO_URL;
    API_KEY = process.env.REACT_APP_API_KEY;

    async isItCity(name) {
        return await axios.get(this.GEO_URL, {
            params: {
                q: name,
                limit: 1,
                appid: this.API_KEY,
            },
        });
    }

    async getWeaderNow(latitude, longitude) {
        return await axios.get(this.URL + 'weather', {
            params: {
                lat: latitude,
                lon: longitude,
                appid: this.API_KEY,
            },
        });
    }

    async getForecast(latitude, longitude) {
        return await axios.get(this.URL + 'forecast', {
            params: {
                lat: latitude,
                lon: longitude,
                appid: this.API_KEY,
            },
        });
    }

    async getWeaderNowByCityName(city) {
        return await axios.get(this.URL + 'weather', {
            params: {
                q: city,
                appid: this.API_KEY,
            },
        });
    }

    async getForecastByCityName(city) {
        return await axios.get(this.URL + 'forecast', {
            params: {
                q: city,
                appid: this.API_KEY,
            },
        });
    }
}

export default WeatherService;