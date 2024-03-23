import React, { useEffect, useState } from 'react'
import ForecastCard from './ForecastCard';
import formatDateFunction from '../utils/formatDateFunction';
import WeatherService from '../services/WeatherService';

export default function ForecastsCard({ latitude, longitude }) {
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        const weatherService = new WeatherService();

        const getForecast = async () => {
            await weatherService.getForecast(latitude, longitude)
                .then((res) => {
                    console.log('res', res);
                    if (res?.data.list) {
                        const filteredForecast = [];
                        for (let i = 0; i < res.data.list.length; i += 8) {
                            filteredForecast.push(res.data.list[i]);
                        }
                        setForecasts(filteredForecast);
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }

        if (latitude && longitude) {
            getForecast();
        }
    }, [latitude, longitude]);

    return (
        <section className="lg:col-span-2 flex flex-wrap">
            <div className="w-full px-2">
                <div className="bg-gray-900 text-white border border-gray-700 relative min-w-0 break-words rounded-3xl overflow-hidden shadow-sm mb-4 w-full">
                    <div className="px-6 py-6 relative">
                        <h1 className='font-bold text-3xl uppercase'>Forecasts</h1>

                        <div className="grid grid-rows-5 place-items-center mt-5">
                            {forecasts?.map((forecast, index) => (
                                <ForecastCard key={index} forecast={forecast} date={formatDateFunction(forecast?.dt_txt)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
