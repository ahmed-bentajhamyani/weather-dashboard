import React from 'react'
import WeatherCard from './WeatherCard'

export default function SearchBox({ searchBoxOpen, searchResult }) {
    console.log(searchResult);
    return (
        <>
            {searchBoxOpen ?
                <section className='absolute top-12 rounded-3xl bg-black text-white w-full md:w-3/4 border border-gray-700 z-10'>
                    {searchResult?.length >= 1 ?
                        <div className={`h-fit overflow-y-auto overflow-x-hidden p-2`}>
                            <WeatherCard city={searchResult[0]?.name} />
                        </div>
                        :
                        <div className='mx-4 my-8'>Please enter the full name of a city.</div>
                    }
                </section>
                :
                null
            }
        </>
    )
}
