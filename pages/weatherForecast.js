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
      `https://api.openweathermap.org/data/2.5/onecall?lat=48.2030964&lon=16.3851084&exclude=current,minutely,hourly,alerts&units=metric&appid=6ba39f42dec962922960a70c23f20cd4`,
    )
      .then((response) => response.json())
      .then((res) => {
        setWeather(res);
        console.log(JSON.stringify(res));
        const test = JSON.stringify(res);
        const newIcon =
          'http://openweathermap.org/img/wn/' +
          res.daily[6].weather[0].icon +
          '@2x.png';
        console.log(newIcon);
        setIcon(newIcon);
        const unixTimestamp = res.daily[6].dt;
        console.log(JSON.stringify(unixTimestamp));
        const dateObj = new Date(unixTimestamp * 1000);
        const utcString = dateObj.toUTCString();
        setTripDate(utcString);
        console.log(utcString);
      });
  }
  return (
    <Layout loggedIn={props.loggedIn} page="step3">
      <Head>
        <title>Weather Forecast</title>
      </Head>
      <main>
        <div className="location">
          {/* <div className="tripWishList"> */}
          {/* <div className="dateText">Sunny weather forecast</div> */}
          {/* </div> */}
          <button onClick={getWeather} className="indexButton">
            Get Weather
          </button>
          <ul className="tripWishListCities">
            {/* {weather.map((item) => ( */}
            <li>
              {weather?.daily?.[6]?.dt}//
              {tripDate}//
              {weather?.daily?.[6]?.temp?.day}//
              {weather?.daily?.[6]?.pressure} hPa//
              {weather?.daily?.[6]?.humidity} %//
              {weather?.daily?.[6]?.wind_speed} metre/sec//
              {weather?.daily?.[6]?.weather?.[0]?.icon}//
              {weather?.daily?.[6]?.weather?.[0]?.main}//
              {weather?.daily?.[6]?.weather?.[0]?.description}//
              <img src={icon} alt="weather" />
            </li>
            {/* ))} */}
            {/* <li>{weather.daily[0]}</li>
          <li>{weather.daily[1]}</li>
          <li>{weather.daily[2]}</li>
          <li>{weather.daily[3]}</li>
          <li>{weather.daily[4]}</li>
          <li>{weather.daily[5]}</li>
          <li>{weather.daily[6]}</li>
          <li>{weather.daily[7]}</li> */}
          </ul>
          <div className="locationButtonBox">
            <Link href="/maxDist">
              <a>
                <button className="locationButton">Back</button>
              </a>
            </Link>
            <Link href="/weatherForecast">
              <a>
                <button className="locationButton">Next</button>
              </a>
            </Link>
          </div>
        </div>
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
