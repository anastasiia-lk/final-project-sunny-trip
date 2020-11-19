import { NextApiRequest, NextApiResponse } from 'next';
import { getUserBySessionToken, addTrip } from '../../util/database';
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
  const { date, temp, long, icon, city, country } = request.body;
  const newTrip = await addTrip(date, temp, long, icon, city, country, user.id);
  response.send({
    trip: newTrip,
  });
}
