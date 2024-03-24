import React, { useEffect, useState } from 'react'
import dateNowFunction from '../utils/dateNowFunction';
import WeatherService from '../services/WeatherService';

export default function WeatherCard({ latitude, longitude, city }) {
    const [dateNow, setDateNow] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        setDateNow(dateNowFunction());
    }, []);

    useEffect(() => {
        const getWeatherNow = async () => {
            await WeatherService.getWeaderNow(latitude, longitude)
                .then((res) => {
                    console.log('res', res);
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    // setInput('');
                    console.log('error', error);
                });
        }

        if (latitude && longitude) {
            getWeatherNow();
        }
    }, [latitude, longitude]);

    useEffect(() => {
        const getWeatherNowByCityName = async () => {
            await WeatherService.getWeaderNowByCityName(city)
                .then((res) => {
                    console.log('res', res);
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    console.log('error', error);
                });
        }

        if (city) {
            getWeatherNowByCityName();
        }
    }, [city]);

    return (
        <section className="lg:col-span-4 flex flex-wrap">
            <div className="w-full px-2">
                {weather?.error ?
                    <div className="mx-4 my-8">City not found</div>
                    :
                    <div className="bg-gray-900 text-white border border-gray-700 relative min-w-0 break-words rounded-3xl overflow-hidden shadow-sm w-full">
                        <div className="px-6 py-6 relative">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 place-items-center gap-5 mb-4">
                                <div className='flex justify-center items-center col-span-2'>
                                    <img className="h-full" src={`https://openweathermap.org/img/wn/${weather?.data.weather[0].icon}@2x.png`} alt={weather?.data.weather[0].description} />
                                    <div>
                                        <h5 className="mb-0 font-medium text-xl">{weather?.data.name}, {weather?.data.sys?.country}</h5>
                                        <h6 className="mb-0 font-light">{dateNow}</h6>
                                        <p className='mb-0'>{weather?.data.weather[0].description}</p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="font-bold text-3xl mb-0"><span>{(weather?.data.main.temp - 273.15).toFixed(1)}&deg;</span></h3>
                                    <p className='text-sm'>Temperature</p>
                                </div>

                                <div className="text-center">
                                    <h3 className="font-bold text-3xl mb-0">{weather?.data.main.humidity}<span className='font-normal text-sm'>%</span></h3>
                                    <p className='text-sm'>Humidity</p>
                                </div>

                                <div className="text-center">
                                    <h3 className="font-bold text-3xl mb-0">{weather?.data.wind.speed}<span className='font-normal text-sm'>km/h</span></h3>
                                    <p className='text-sm'>Wind speed</p>
                                </div>

                                <div className="text-center">
                                    <h3 className="font-bold text-3xl mb-0">{(weather?.data.main.temp_max - 273.15).toFixed(1)}&deg;<span className="font-normal text-base">/{(weather?.data.main.temp_min - 273.15).toFixed(1)}&deg;</span></h3>
                                    <p className='text-sm'>Max / Min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section >
    )
}
