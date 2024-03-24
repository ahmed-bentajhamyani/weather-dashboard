import React, { useEffect, useRef, useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import ForecastsCard from '../components/ForecastsCard';
import SearchBox from '../components/SearchBox';
import WeatherService from '../services/WeatherService';

function WeatherPage() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    const [searchResult, setSearchResult] = useState(null);
    const [searchBoxOpen, setSearchBoxOpen] = useState(false);
    const [city, setCity] = useState('');

    // get the user location
    useEffect(() => {
        console.log(navigator.position);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }

        function success(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }

        function error() {
            setError('Unable to retrieve your location');
        }
    }, []);

    // search input change
    const handleInputChange = (e) => {
        const input = e.target.value;
        setCity(input);
        console.log(input)
    }

    // search the city
    useEffect(() => {
        const isItCity = async (inputResult) => {
            await WeatherService.isItCity(inputResult)
                .then((res) => {
                    console.log('res', res);
                    setSearchResult(res.data);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }

        if (city.length > 2) {
            isItCity(city);
            setSearchBoxOpen(true);
        }

        if (city.length === 0) setSearchBoxOpen(false);
    }, [city])

    // close the search box if click outside
    const searchBoxRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setSearchBoxOpen(false);
                setCity('');
            }
        }

        if (searchBoxOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchBoxOpen]);

    return (
        <section className='mx-auto p-12 min-h-screen bg-black'>

            <header ref={searchBoxRef} className='relative my-5'>
                <form className="flex bg-gray-900 text-white border border-gray-700 rounded-full px-3 py-2.5 w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="city" className='opacity-50'>
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                    </label>
                    <input type="text" name='city' value={city} onChange={handleInputChange} className='appearance-none bg-gray-900 px-2 outline-none w-full' placeholder='Search city' />
                </form>
                <SearchBox
                    searchBoxOpen={searchBoxOpen}
                    setSearchBoxOpen={setSearchBoxOpen}
                    searchResult={searchResult}
                />
            </header>

            {latitude && longitude && !city ?
                <div className="grid lg:grid-cols-6 gap-y-5">
                    <WeatherCard latitude={latitude} longitude={longitude} />
                    <ForecastsCard latitude={latitude} longitude={longitude} />
                </div>
                :
                <div className="flex justify-center items-center mt-60">
                    <h2 className='font-medium text-xl md:text-2xl text-white text-center'>{error}</h2>
                </div>
            }
        </section>
    );
}

export default WeatherPage 