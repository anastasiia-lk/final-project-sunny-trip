import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Router from 'next/dist/next-server/lib/router/router';
import { useRouter } from 'next/router';
import { getUserBySessionToken } from '../util/database';

const AnyReactComponent = ({ text }) => (
  <div
    style={{ width: '120', height: '120', borderRadius: '50%', color: 'red' }}
  >
    {text}
  </div>
);

export default function startingPoint(props) {
  const [dateForecast, setDateForecast] = useState([]);

  const [lt, setLt] = useState(0);
  const [ln, setLn] = useState(0);
  const [lat, setLat] = useState(59.95);
  const [lon, setLon] = useState(30.33);
  const router = useRouter();
  console.log(props);
  // States for rendering Plan Trip steps pages
  const [step, setStep] = useState(1);
  //States for Google Maps&Current Location
  const key_google_maps = process.env.REACT_APP_WEATHER_APP_API_KEY;
  const [latcur, setlatcur] = useState(59.95);
  const [lngcur, setlngcur] = useState(30.33);
  //State for Trip Date
  const [startDate, setStartDate] = useState(new Date());
  const [numberStartDate, setNumberStartDate] = useState(0);
  //States for the nearby cities
  const [distance, setDistance] = useState(0);
  const [population, setPopulation] = useState(0);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  //States and key for the weather forecast
  // const key_cities_api = process.env.REACT_APP_CITIES_APP_API_KEY;
  // const [weather, setWeather] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [checkDate, setCheckDate] = useState('');
  const [icon, setIcon] = useState(
    'http://openweathermap.org/img/wn/10d@2x.png',
  );

  //Get current location
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setlatcur(position.coords.latitude);
        setlngcur(position.coords.longitude);
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);
      },
      (err) => console.log(err),
    );
  }

  //Get nearby cities
  // `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/48.2030964+16.3851084/
  async function getCities() {
    // console.log(props);
    // const getPromiseCities = await fetch(
    //   `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latcur}+${lngcur}/nearbyCities?radius=${distance}&limit=10&minPopulation=${population}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'x-rapidapi-key': `${props.key_cities_api}`,
    //       'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    //     },
    //   },
    // );
    // const getObject = await getPromiseCities.json();
    // console.log('getObject', getObject);
    // const draft = getObject.data;
    // console.log('draft', draft);
    // const newCityList = getObject.data.filter((item) => item.type === 'CITY');
    // console.log('newCityList', newCityList);
    // setCities(newCityList);
  }

  //
  function getSelectedCity(item) {
    // setCheckedCity(item);
    // console.log(item);
    // setSelectedCity(item);
    setStep(3);
    setSelectedCity(item);
    setLat(item.latitude);
    setLon(item.longitude);
    // console.log('selectedCity', selectedCity);
    // console.log('selectedCity city', selectedCity.city);
    // console.log('selectedCity city', selectedCity.country);
    // console.log('selectedCity city', selectedCity.latitude);
    // console.log('selectedCity city', selectedCity.longitude);
  }

  function check() {
    // const string = parseInt(startDate.match(/\d+/));
    // setNumberStartDate(string);
    // console.log(numberStartDate);
    // console.log(startDate);
    console.log('selectedCity city', selectedCity.city);
    console.log('selectedCity city', selectedCity.country);
    console.log('selectedCity city', selectedCity.latitude);
    console.log('selectedCity city', selectedCity.longitude);
  }

  //Get weather forecast
  async function getWeather() {
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${props.key_weather_api}`,
    // )
    //   .then((response) => response.json())
    //   .then((res) => {
    //     setWeather(res);
    //     console.log(JSON.stringify(res));
    //     const test = JSON.stringify(res);
    //     const newIcon =
    //       'http://openweathermap.org/img/wn/' +
    //       res.daily[6].weather[0].icon +
    //       '@2x.png';
    //     console.log(newIcon);
    //     setIcon(newIcon);
    //     const unixTimestamp = res.daily[6].dt;
    //     console.log(JSON.stringify(unixTimestamp));
    //     const dateObj = new Date(unixTimestamp * 1000);
    //     const utcString = dateObj.toUTCString();
    //     // const string = parseInt(utcString.match(/\d+/));
    //     // const string = parseInt(startDate.match(/\d+/));
    //     setCheckDate(utcString);
    //     console.log(utcString);
    //     // console.log('string', string);
    //   });
    // console.log();
    // const lat = selectedCity.latitude;
    // const lon = selectedCity.longitude;
    // const lat = 59.95;
    // const lon = 30.33;
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lon }),
    });
    const { date, temp } = await response.json();
    console.log(date);
  }
  return (
    <div>
      {(() => {
        if (step === 1)
          return (
            <div>
              <Layout loggedIn={props.loggedIn} step={step}>
                <Head>
                  <title>Starting Point</title>
                </Head>
                <div className="location">
                  <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: key_google_maps }}
                      defaultCenter={{
                        lat: latcur,
                        lng: lngcur,
                      }}
                      defaultZoom={1}
                    >
                      <AnyReactComponent lat={latcur} lng={lngcur} text="📍" />
                    </GoogleMapReact>
                    <div className="location">
                      <button className="indexButton" onClick={getLocation}>
                        Get My Current Location
                      </button>
                      <div className="locationButtonBox">
                        <button
                          className="locationButton"
                          onClick={() => setStep(2)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Layout>
            </div>
          );
        if (step === 2)
          return (
            <div>
              <Layout loggedIn={props.loggedIn} step={step}>
                <Head>
                  <title>Maximum Distance</title>
                </Head>
                <main>
                  <div className="location">
                    <input
                      className="indexLocationItem1"
                      type="text"
                      id="distance"
                      placeholder="Enter distance (km)"
                      // className="bottomText"
                      onChange={(event) =>
                        setDistance(event.currentTarget.value)
                      }
                    />
                    <input
                      className="indexLocationItem1"
                      type="text"
                      id="population"
                      placeholder="Enter population"
                      // className="bottomText"
                      onChange={(event) =>
                        setPopulation(event.currentTarget.value)
                      }
                    />
                    <br />
                    <button
                      className="indexButton"
                      onClick={async (e) => {
                        e.preventDefault();

                        const response = await fetch('/api/cities', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            latcur,
                            lngcur,
                            distance,
                            population,
                          }),
                        });
                        const { cities, nearbyCities } = await response.json();
                        // console.log(forecast);
                        // const unixTimestamp = res.daily[6].dt;
                        // const dateObj = new Date(unixTimestamp * 1000);
                        // const utcString = dateObj.toUTCString();
                        setCities(nearbyCities);
                      }}
                      className="indexButton"
                    >
                      Get Cities
                    </button>
                    <ul className="tripWishListCities">
                      {cities.map((item) => (
                        <li>
                          {item.city}
                          {'             '}

                          <button
                            className="checkedCity"
                            onClick={() => {
                              // e.preventDefault();
                              // getSelectedCity();
                              // getSelectedCity(item);
                              // setSelectedCity(item);
                              getSelectedCity(item);
                              // setStep(4);
                            }}
                            // onClick={() => setSelectedCity(item)}
                            // onClick={getCheckedCity(item)}
                          >
                            Check
                          </button>
                          {/* <input
                            type="checkbox"
                            onChange={(event) => setSelectedCity(item)}
                          ></input> */}
                        </li>
                      ))}
                      {/* (
                        <li>{item.city}</li>
                      ) */}
                      {/* <li>{cities?.[0]?.city}</li> */}
                    </ul>
                    <div className="locationButtonBox">
                      <button
                        className="locationButton"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>

                      <button
                        className="locationButton"
                        onClick={() => setStep(3)}
                      >
                        Next
                      </button>
                      <button className="locationButton" onClick={check}>
                        Check
                      </button>
                      {/* <button
                        className="locationButton"
                        onClick={getCheckedCity}
                      >
                        Check
                      </button> */}
                    </div>
                  </div>
                </main>
              </Layout>
            </div>
          );
        if (step === 3)
          return (
            <div>
              <Layout loggedIn={props.loggedIn} step={step}>
                <Head>
                  <title>Weather Forecast</title>
                </Head>
                <main>
                  <div className="location">
                    {/* <div className="tripWishList"> */}
                    {/* <div className="dateText">Sunny weather forecast</div> */}
                    {/* </div> */}
                    <div className="dateText">
                      One week daily weather forecast
                    </div>
                    <div className="dateText">
                      {selectedCity.city}, {selectedCity.country}
                    </div>
                    <button
                      // onClick={() => getWeather()}
                      onClick={async (e) => {
                        e.preventDefault();

                        const response = await fetch('/api/weather', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ lat, lon }),
                        });
                        const { lt, ln, dateForecast } = await response.json();
                        // console.log(forecast);
                        // const unixTimestamp = res.daily[6].dt;
                        // const dateObj = new Date(unixTimestamp * 1000);
                        // const utcString = dateObj.toUTCString();
                        setDateForecast(dateForecast);
                        setLt(lt);
                        setLn(ln);
                      }}
                      className="indexButton"
                    >
                      Get Forecast
                    </button>
                    <br />
                    <br />
                    <ul className="tripWishListCities">
                      {dateForecast.map((item) => (
                        <li className="liStyle">
                          {/* {lt}//
                          {ln}// */}
                          {'📅'}
                          {'  '}
                          {item.date} {'🌡'}
                          {'  '}
                          {item.temp}°C {'📝'}
                          {'  '}
                          {item.long}
                          {'  '}
                          <img src={item.icon} alt="weather" />
                          {'  '}
                          <button
                            className="checkedWeather"
                            onClick={async (e) => {
                              e.preventDefault();
                              const response = await fetch('/api/wishList', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  date: item.date,
                                  temp: item.temp,
                                  long: item.long,
                                  icon: item.icon,
                                  city: selectedCity.city,
                                  country: selectedCity.country,
                                  user: props.user,
                                }),
                              });
                              router.push('/profile');
                              // setStep(4);
                            }}
                            // onClick={() => setSelectedCity(item)}
                            // onClick={getCheckedCity(item)}
                          >
                            Add to wish list
                          </button>
                          {/* {lt}//
                        {ln}// */}
                          {/* {updatedWeather?.daily?.[6]?.dt}//
                        {tripDate}// */}
                          {/* {weather?.daily?.[6]?.temp?.day}//
                        {weather?.daily?.[6]?.pressure} hPa//
                        {weather?.daily?.[6]?.humidity} %//
                        {weather?.daily?.[6]?.wind_speed} metre/sec//
                        {weather?.daily?.[6]?.weather?.[0]?.icon}//
                        {weather?.daily?.[6]?.weather?.[0]?.main}//
                        {weather?.daily?.[6]?.weather?.[0]?.description}//
                        <img src={icon} alt="weather" />
                        //
                        {weather?.lat}//
                        {weather?.lon}// */}
                          {/* {selectedCity.city}//
                          {selectedCity.country}//
                          {selectedCity.latitude}//
                          {selectedCity.longitude}// */}
                          <br />
                          <br />
                          <br />
                        </li>
                      ))}
                      {/* ))
                       <li>{weather.daily[0]}</li>
                <li>{weather.daily[1]}</li>
                <li>{weather.daily[2]}</li>
                <li>{weather.daily[3]}</li>
                <li>{weather.daily[4]}</li>
                <li>{weather.daily[5]}</li>
                <li>{weather.daily[6]}</li>
                <li>{weather.daily[7]}</li>  */}
                    </ul>
                    <div className="locationButtonBox">
                      <button
                        className="locationButton"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </button>

                      <button className="locationButton">Next</button>
                      <button className="locationButton" onClick={check}>
                        Check
                      </button>
                    </div>
                  </div>
                </main>
              </Layout>
            </div>
          );
      })()}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  return {
    props: {
      loggedIn: await isSessionTokenValid(token),
    },
  };
}
