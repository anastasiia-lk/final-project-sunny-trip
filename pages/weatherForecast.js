import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import React, { useState } from 'react';

export default function weatherForecast(props) {
  const key_weather_api = process.env.REACT_APP_OPENWEATHER_APP_API_KEY;
  const [weather, setWeather] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [icon, setIcon] = useState(
    'http://openweathermap.org/img/wn/10d@2x.png',
  );
  function getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=48.2030964&lon=16.3851084&exclude=current,minutely,hourly,alerts&units=metric&appid=${key_weather_api}`,
    )
      .then((response) => response.json())
      .then((res) => {
        setWeather(res);
        console.log(JSON.stringify(res));
        const test = JSON.stringify(res);
        const newIcon =
          'http://openweathermap.org/img/wn/' +
          res.daily[0].weather[0].icon +
          '@2x.png';
        console.log(newIcon);
        setIcon(newIcon);
        const unixTimestamp = res.daily[0].dt;
        console.log(JSON.stringify(unixTimestamp));
        const dateObj = new Date(unixTimestamp * 1000);
        const utcString = dateObj.toUTCString();
        setTripDate(utcString);
        console.log(utcString);
      });
  }
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Weather Forecast</title>
      </Head>
      <main>
        <div className="tripWishList">
          <div>Sunny weather forecast</div>
        </div>
        <button onClick={getWeather}>Get Weather</button>
        <ul className="tripWishListCities">
          <li>
            {weather?.daily?.[0]?.dt}//{weather?.daily?.[0]?.temp?.day}//
            {weather?.daily?.[0]?.pressure} hPa//
            {weather?.daily?.[0]?.humidity} %//
            {weather?.daily?.[0]?.wind_speed} metre/sec//
            {weather?.daily?.[0]?.weather?.[0]?.icon}//
            {weather?.daily?.[0]?.weather?.[0]?.main}//
            {weather?.daily?.[0]?.weather?.[0]?.description}//{tripDate}
            <img src={icon} alt="weather" />
          </li>
          {/* <li>{weather.daily[0]}</li>
          <li>{weather.daily[1]}</li>
          <li>{weather.daily[2]}</li>
          <li>{weather.daily[3]}</li>
          <li>{weather.daily[4]}</li>
          <li>{weather.daily[5]}</li>
          <li>{weather.daily[6]}</li>
          <li>{weather.daily[7]}</li> */}
        </ul>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  return {
    props: { loggedIn: await isSessionTokenValid(token) },
  };
}
