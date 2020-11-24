import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserBySessionToken,
  addTrip,
  getTripsByUserId,
  deleteTrip,
} from '../../../util/database';
import argon2 from 'argon2';
import Tokens from 'csrf';
import { getUserByUsername, registerUser } from '../../../util/database';

export default async function handler(request, response) {
  const tripId = request.query.id;
  const user = await getUserBySessionToken(request.cookies.session);
  if (user === undefined) {
    return response.status(401).send({ success: false });
  }
  let trip = {};
  if (request.method === 'DELETE') {
    const trip = await deleteTrip(tripId, user.id);
  }
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ trip: trip }));
}
