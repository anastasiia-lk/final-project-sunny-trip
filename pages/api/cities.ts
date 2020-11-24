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
  const { latcur, lngcur, distance, population } = request.body;
  const citiesResponse = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latcur}${
      lngcur < 0 ? '' : '+'
    }${lngcur}/nearbyCities?radius=${distance}&limit=10&minPopulation=${population}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': `${process.env.REACT_APP_CITIES_APP_API_KEY}`,
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    },
  );
  const cities = await citiesResponse.json();
  console.log(citiesResponse);
  response.send({
    cities: cities,
    nearbyCities: cities?.data?.filter((item) => item.type === 'CITY'),
  });
}
