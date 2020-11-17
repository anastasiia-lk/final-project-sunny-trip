import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import cookie from 'cookie';
import {
  deleteExpiredSessions,
  getUserByUsername,
  insertSession,
} from '../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { lat, lon } = request.body;
  // All info about the server
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_APP_API_KEY}`,
  );

  // Extract the body of the API
  const weather = await weatherResponse.json();

  console.log(weatherResponse);

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
  response.send({
    lt: weather?.lat,
    ln: weather?.lon,
    date: weather?.daily?.[6]?.dt,
    temp: weather?.daily?.[6]?.temp?.day,
  });
}
