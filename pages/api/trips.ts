import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserBySessionToken,
  addTrip,
  getTripsByUserId,
  deleteTrip,
} from '../../util/database';
import argon2 from 'argon2';
import Tokens from 'csrf';
import { getUserByUsername, registerUser } from '../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const user = await getUserBySessionToken(request.cookies.session);
  if (user === undefined) {
    return response.status(401).send({ success: false });
  }

  if (request.method === 'GET') {
    const userTrips = await getTripsByUserId(user.id);
    response.send(userTrips);
  } else if (request.method === 'POST') {
    const { date, temp, long, icon, city, country } = request.body;
    const newTrip = await addTrip(
      date,
      temp,
      long,
      icon,
      city,
      country,
      user.id,
    );

    response.send({
      trip: newTrip,
    });
  } else if (request.method === 'DELETE') {
    const { date, city, country } = request.body;
    const trip = await deleteTrip(date, city, country, user.id);
  }
}
