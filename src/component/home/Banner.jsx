import React, { useState, useEffect } from 'react'
import assets from '../../lib/images'
import antd from '../../lib/antd'
import { weatherIcon } from '../../lib/icon'

import { getCurrentPosition, getCurrentConditions } from '../../util/util'

const Banner = ({ day, currentTime }) => {

    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);

    console.log(location)
    console.log(weather)

    useEffect(() => {
        const fetchLocation = async () => {
            const position = await getCurrentPosition();
            setLocation(position);
        };

        const fetchWeather = async () => {
            const conditions = await getCurrentConditions(location.Key);
            setWeather(conditions);
        };

        if (!location) {
            fetchLocation()

        } else {
            fetchWeather()

        }

        if (location === null) {
            antd.notification.info({
                message: 'Accuweather API High Traffic',
                description: `You may experience delay of displaying data as this Accuweather is only a free version. 
                            Please wait for a minute or try to use it later. Sorry for the inconvenience`,
                duration: 0,
            });
        }

    }, [location]);

    return (
        <>

            <div className='relative flex justify-between items-center bg-cover bg-center h-[600px]'
                style={{ backgroundImage: `url(${day ? assets.BgDay : assets.BgNight})`, }}>

                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute top-0 flex justify-between w-full ">
                    <div className="relative backdrop-blur-lg rounded-lg overflow-hidden border  border-white ml-10 my-10 px-12 py-10
                                    hover:-translate-y-1 hover:cursor-pointer duration-150
                    ">
                        <div className="inset-0 bg-transparent opacity-10 "></div>
                        <div className="inset-0 flex items-center justify-center">
                            <p className="text-5xl font-bold text-white">
                                {currentTime.time}
                            </p>
                        </div>
                        <div className="bottom-0 flex flex-col items-center justify-center left mt-3">
                            <p className="text-white"> {currentTime.currentDate} </p>
                            <p className="text-white mt-2">
                                {location?.AdministrativeArea?.EnglishName.length <= 40 ? location?.AdministrativeArea?.EnglishName : location?.AdministrativeArea?.ID} </p>
                            <p className="text-white">  {location?.Country?.EnglishName.length <= 40 ? location?.Country?.EnglishName : location?.Country?.ID} </p>
                        </div>
                    </div>

                    {location && weather && (
                        <div className={`${location ? "block" : "hidden"} relative backdrop-blur-lg rounded-lg overflow-hidden border border-white mr-10 my-10 px-5 pt-3
                                    hover:-translate-y-1 hover:cursor-pointer duration-150`}>
                            <div className="inset-0 bg-transparent opacity-10 "></div>
                            <div className="inset-0 flex items-center justify-center">
                                {weatherIcon.map((src, index) => (
                                    src.name === weather?.WeatherText ?
                                        <img key={index} className="hover:brightness-125 hover:cursor-pointer"
                                            src={`${src.image}`} alt="Weather icon" width={100} />
                                        :
                                        ""
                                ))}
                            </div>
                            <div className="bottom-0 left-0 p-4 items-center text-center">
                                <p className="text-white"> {weather?.WeatherText} </p>
                                <p className="text-white mt-4"> Temperature: {weather?.Temperature.Metric.Value + '°C - ' +
                                    weather?.RealFeelTemperature.Metric.Value + '°C'} </p>
                                <p className="text-white"> Wind-Gusts:   {weather?.Wind.Speed.Metric.Value + " km/h - " +
                                    weather?.WindGust.Speed.Metric.Value + " km/h " + weather?.Wind.Direction.English}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Banner