import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import cookie from 'cookie';
import {
  deleteExpiredSessions,
  getUserByUsername,
  insertSession,
} from '../../util/database';
import { Z_DATA_ERROR } from 'zlib';

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
    dateForecast: weather?.daily?.map((item) => {
      const dateObj = new Date(item.dt * 1000);
      const utcString = dateObj.toUTCString();
      const tempCels = Math.round(item?.temp?.day);
      const longText = item?.weather?.[0].description;
      const iconIndex = item?.weather?.[0].icon;
      const iconURL =
        'http://openweathermap.org/img/wn/' + iconIndex + '@2x.png';
      return {
        date: utcString,
        temp: tempCels,
        long: longText,
        icon: iconURL,
      };
    }),
  });
}
