import React, { useEffect, useState } from 'react'

// Library

import misc from '../../lib/misc';

import { weatherIcon } from '../../lib/icon'
import { greetings } from '../../lib/greetings'

import assets from '../../lib/images';
import icons from '../../lib/icons.js';
import antd from '../../lib/antd.js';

const apikey = 'gQ00YmD3q2SEUCgzHUNYT5GsOKwAXV3I'

const Home = () => {

  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([])

  const [countries, setCountries] = useState({});
  const [timeHour, setTimeHour] = useState(new Date());
  const [forecast, setForecast] = useState([])

  const [top, setTop] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await misc.axios
      .get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${location}`)
      .then((response) => {
        setResults(response.data)
      })
      .catch((error) => console.log(error));
  };


  console.log(results)

  // Start of react-alice-carousel Documentation
  const responsive = {
    0: {
      items: 1
    },
    568: {
      items: 2
    },
    1024: {
      items: 4,
      itemsFit: 'contain'
    },
    1280: {
      items: 6,
      itemsFit: 'contain'
    }
  };

  // End of react-alice-carousel Documentation

  // Get Keycode

  // Code from ANT Design Documentation
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keycode, setKeycode] = useState(null);

  const handleShowModal = (item) => {

    setLoading(true);
    setKeycode(item);

    // Info about country
    fetch(`https://restcountries.com/v2/name/${item?.country}`)
      .then(function (response) {
        response.json().then((s) => setCountries(s));
      })
      .catch(error => {
        console.log(error)
      })

    misc.axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${item?.key}?apikey=${apikey}`
      )
      .then((response) => {

        setForecast(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })


    setIsVisible(true);
  };

  const handleCancel = () => {
    setKeycode(null);
    setIsVisible(false);
  };

  useEffect(() => {

    // Top Countries
    misc.axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/topcities/50?apikey=${apikey}`
      )
      .then((response) => {

        setTop(response.data)

      })
      .catch((error) => console.log(error));

    const intervalId = setInterval(() => {
      setTimeHour(new Date());
    }, 60000);
    return () => clearInterval(intervalId);

  }, []);


  // Logout 
  const logoutAction = () => {
    sessionStorage.clear();
    window.location.pathname = "/login";
  };

  const User = sessionStorage.getItem('user') !== 'undefined' ? JSON.parse(sessionStorage.getItem('user')) : sessionStorage.clear();

  return (
    <>
      <header className='flex justify-between items-center text-center py-4 px-4 shadow-md'>
        <div>
          <img src={assets.Logo} alt="header-logo" width={200} className="hover:brightness-105 cursor-pointer" />
        </div>
        <div className='flex'>
          {/* <div className='flex mr-2 laptop:block small:hidden'>
            <form onSubmit={handleSubmit}>
              <input placeholder="Search City"
                name='location'
                onChange={(e) => setLocation(e.target.value)}
                className='border border-gray-300 rounded-l-md rounded-t-md py-1 px-3  focus:border focus:outline-none focus:border-primary' />
              <button
                type='submit'
                className='bg-primary text-white pt-1.5 pb-2 px-3 -ml-1 h-9 border-gray-100 border rounded-r-md hover:bg-secondary duration-150'> Search </button>
            </form>
          </div> */}
          <div
            onClick={logoutAction}
            className='flex justify-center text-center items-center hover:cursor-pointer hover:text-gray-400 duration-150 '>
            <p className='text-sm text-primary mx-2'> Help</p>
          </div>
          <div
            onClick={logoutAction}
            className='flex justify-center text-center items-center hover:cursor-pointer hover:text-gray-400 duration-150 '>
            <p className='text-sm text-primary mx-2'> Send Gift </p>
          </div>
          <div
            onClick={logoutAction}
            className='flex justify-center text-center items-center hover:cursor-pointer hover:text-gray-400 duration-150 '>
            <p className='text-sm text-primary mx-2'> Menu </p>
          </div>
        </div>
      </header>
      <div className='relative flex flex-col  w-full h-full object-cover bg-black'>
        <div className="laptop:block small:hidden">
          <img src={assets.Background} alt="background" className='w-full h-fit object-cover opacity-40' />
        </div>
        <div className="laptop:hidden small:block object-cover opacity-40 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
          <img src={assets.Background} alt="background" className='w-full h-fit object-cover opacity-0' />
        </div>
        <div className='absolute flex flex-col w-full'>
          <div className='flex 
          laptop:justify-between laptop:flex-row
          small:flex-col
          items-center'>
            <div className='flex mx-8 
            laptop:my-14 small:my-4
            p-5 justify-center items-center'>
              <p className='text-white 
              laptop:text-xl
              tablets:text-[35px]
              small:text-[20px]
              '> {shuffle(greetings).slice(0, 1).map(a => a.hello)}!,  </p>
              <p className='
               laptop:text-xl
               tablets:text-[35px]
               small:text-[30px]
              text-secondary pl-2'> {User?.username} </p>
            </div>

            <div className='flex mr-2 laptop:hidden small:block'>
              <form onSubmit={handleSubmit}>
                <input placeholder="Search City"
                  name='location'
                  onChange={(e) => setLocation(e.target.value)}
                  className='border
                  tablets:w-[350px]
                  small:w-[150px]
                   border-gray-300 rounded-l-md rounded-t-md py-1.5 px-3 focus:border focus:outline-none focus:border-primary' />
                <button
                  type='submit'
                  className='bg-primary text-white px-3 -ml-1 h-9 border-gray-100 border rounded-r-md hover:bg-secondary duration-150'> Search </button>
              </form>
            </div>


            <div className='flex flex-col mx-16 my-10  
              laptop:block
              small:hidden'>
              <div className='flex items-center'>
                <p className='text-white text-[70px] font-bold'>  {timeHour.toLocaleString().slice(10, 16)} </p>
                <p className='text-white text-[20px] pt-6 pl-3 text-end font-bold'>  {timeHour.toLocaleString().slice(19, 22)}</p>
              </div>
              <p className='text-white text-[20px] font-medium -mt-4 pl-1 tracking-wider'>
                {timeHour.toLocaleString().slice(2, 4)} {
                  timeHour.getMonth() === 0 ?
                    "January" :
                    timeHour.getMonth() === 1 ?
                      "February" :
                      timeHour.getMonth() === 2 ?
                        "March" :
                        timeHour.getMonth() === 3 ?
                          "April" :
                          timeHour.getMonth() === 4 ?
                            "May" :
                            timeHour.getMonth() === 5 ?
                              "June" :
                              timeHour.getMonth() === 6 ?
                                "July" :
                                timeHour.getMonth() === 7 ?
                                  "August" :
                                  timeHour.getMonth() === 8 ?
                                    "September" :
                                    timeHour.getMonth() === 9 ?
                                      "October" :
                                      timeHour.getMonth() === 10 ?
                                        "November" :
                                        timeHour.getMonth() === 11 ?
                                          "December" :
                                          ""
                } {timeHour.toLocaleString().slice(5, 9)}

              </p>
            </div>
          </div>


          {/* {
            results.map(a => (
              <h1> {a.Country.LocalizedName} </h1>
            ))
          } */}

          {results?.length === 0 ?
            <>
            </>

            :
            <div className='mx-4 small:flex small:flex-col small:text-center'>
              <div className='mx-6 -mb-2 mt-10'>
                <h3 className='text-white font-semibold 
              laptop:text-2xl
              tablets:text-lg
              small:text-sm'> Searched </h3>
              </div>
              <div className='flex justify-center'>
                <misc.AliceCarousel
                  autoPlay
                  autoPlayInterval={1000}
                  disableButtonsControls
                  responsive={responsive}
                >
                  {
                    results.map(a => (
                      <div className='flex justify-center text-center items-center'>
                        <div onClick={() => handleShowModal({ key: a.Key, city: a.LocalizedName, country: a.Country.LocalizedName })}
                          key={a?.Key} className="flex justify-center text-center items-center my-10 hover:scale-105 hover:cursor-pointer duration-150">
                          <div className='bg-black/60 p-10 w-5/5 mx-4 rounded-lg'>
                            <h2 className='text-primary font-semibold text-[20px]'>
                              {a.Country.LocalizedName}
                            </h2>
                            <h2 className='text-white text-[15px] pt-4'>{a.LocalizedName}</h2>
                          </div>
                        </div>
                      </div>
                    ))}
                </misc.AliceCarousel>
              </div>
            </div>
          }

          <div className='mx-3 laptop:text-start small:flex small:flex-col small:text-center'>
            <div className='mx-6 -mb-2 mt-10'>
              <h3 className='text-white font-semibold 
              laptop:text-2xl
              tablets:text-lg
              small:text-sm
              '> Top Cities Current Weather </h3>
            </div>
            <div className='flex justify-center'>
              <misc.AliceCarousel
                autoPlay
                autoPlayInterval={1000}
                disableButtonsControls
                responsive={responsive}
              >
                {top.slice(2, 22).map((item) => (
                  <div onClick={() => handleShowModal({ key: item.Key, city: item.EnglishName, country: item.Country.EnglishName })}
                    key={item.Key} className="flex justify-center text-center items-center my-10 hover:scale-105 hover:cursor-pointer duration-150">
                    <div className='bg-black/60 p-10 w-4/5 rounded-lg'>
                      <h2 className='text-primary font-semibold text-[20px]'>
                        {item.Country.EnglishName}
                      </h2>

                      {weatherIcon.map((src, index) => (

                        src.name === item.WeatherText ?

                          <div className='flex flex-col justify-center items-center text-center'>
                            <img key={index} className="pt-2"
                              src={`${src.image}`} alt="Weather icon" width={100} />
                            <h1 className='text-white pt-4 pb-3 font-medium'>
                              {(item.Temperature.Metric.Value)} °C {(item.Temperature.Imperial.Value)} °F
                            </h1>
                            <h1 className='text-white pb-3'>
                              {item.WeatherText}
                            </h1>
                          </div>
                          :
                          ""
                      ))}

                      <h2 className='text-white text-[15px] pt-4'>{item.EnglishName}</h2>
                    </div>
                  </div>
                ))}
              </misc.AliceCarousel>
            </div>
          </div>
        </div>
      </div>

      <antd.Modal
        title={
          <div className='flex items-center'>
            {loading ? "" :
              <img src={countries[0]?.flag} width={40} alt="flag" className='mr-2 mt-1' />
            }
            <p>
              {loading ? "" : `${keycode?.city}, ${keycode?.country} - 5 Day Forecast`}
            </p>
          </div>
        }

        key={`${keycode?.key}`}
        open={isVisible}
        width={700}
        onCancel={handleCancel}
        footer={loading ? "" :
          <button className='bg-primary text-white pt-1.5 pb-2 px-3 -ml-1 h-9 border-gray-100 border rounded-md hover:bg-secondary duration-150'
            onClick={handleCancel}>Close</button>
        }
      >
        {loading ?
          <antd.Spin tip="Loading Data" size="large">
            <div className='h-[50px] py-20' />
          </antd.Spin> :
          <div className='my-10 hover'>
            {
              forecast?.DailyForecasts?.map((weather) => (
                <div className='bg-primary flex justify-between my-6 py-3 px-4 rounded-md hover:scale-105 hover:cursor-pointer duration-150' key={weather.Date}>
                  {/* <h3>{weather.Date}</h3> */}
                  <div className='flex justify-start'>
                    {weatherIcon.map((src, index) => (
                      src.name === weather.Day.IconPhrase ?
                        <div className='flex justify-start text-left items-center'>
                          <img key={index} className="hover:brightness-125 hover:cursor-pointer"
                            src={`${src.image}`} alt="Weather icon" width={100} />
                          <p className='font-bold text-textColor pl-4'> {weather.Day.IconPhrase}</p>
                        </div>
                        :
                        ""
                    ))}
                  </div>
                  <div className='flex justify-around items-center'>
                    <p className='text-white font-semibold text-lg'> {weather.Date.slice(5, 7)}</p>
                    <p className='text-white font-semibold text-lg px-1'> {weather.Date.slice(8, 10)}</p>
                    <p className='text-white font-semibold text-lg'> {weather.Date.slice(0, 4)}</p>
                  </div>
                  <div className='flex items-center'>
                    <p className='font-semibold'>
                      {" " + (((weather?.Temperature.Minimum.Value) - 32) * (5 / 9)).toFixed(2)} °C -
                      {" " + (((weather?.Temperature.Minimum.Value) - 32) * (5 / 8)).toFixed(2)} °C
                    </p>
                  </div>
                </div>
              ))}
          </div>
        }
      </antd.Modal>

    </>
  )
}

export default Home
