import React from 'react'

export default function ForecastCard({ forecast, date }) {
    return (
        <article className="flex justify-between items-center bg-black text-white border border-gray-700 relative min-w-0 break-words rounded-3xl overflow-hidden shadow-sm mb-4 py-1 px-3 w-full">
            <div className='flex justify-center items-center'>
                <img className="h-20" src={`https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`} alt={forecast?.weather[0].description} />
                <div>
                    <h5 className="mb-0 font-medium text-2xl">{(forecast?.main.temp_max - 273.15).toFixed(1)}&deg;<span className="mb-0 font-normal text-xs">/ {(forecast?.main.temp_min - 273.15).toFixed(1)}&deg;</span></h5>
                    <p className='text-sm'>{forecast?.weather[0].description}</p>
                </div>
            </div>

            <h5 className="mb-0 font-medium text-xl">{date.date} <span className="mb-0 font-normal text-sm">{date.month}, {date.day}</span></h5>
        </article>
    )
}
