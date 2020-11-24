import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import { Session, User, Trips, Cities, TripsCities } from './types';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

setPostgresDefaultsOnHeroku();
// import extractHerokuDatabaseEnvVars from './extractHerokuDatabaseEnvVars';

// extractHerokuDatabaseEnvVars();

dotenv.config();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres({
        // Avoid the error below of using too many connection slots with
        // Next.js hot reloading
        //
        // Example error message:
        //
        // Error: remaining connection slots are reserved for non-replication superuser connectionsError: remaining connection slots are reserved for non-replication superuser connections
        idle_timeout: 5,
      });

export async function registerUser(username: string, passwordHash: string) {
  const users = await sql<User[]>`
          INSERT INTO users
            (username, password_hash)
          VALUES
            (${username}, ${passwordHash})
          RETURNING *;
        `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserByUsername(username: string) {
  const users = await sql<User[]>`
          SELECT * FROM users WHERE username = ${username};
        `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    SELECT * FROM sessions WHERE token = ${token};
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function deleteSessionByToken(token: string | undefined) {
  if (typeof token === 'undefined') return;
  await sql`
    DELETE FROM sessions WHERE token = ${token};
  `;
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry_timestamp < NOW();
  `;
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *;
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

// Example of a database query with an Inner Join
export async function getUserBySessionToken(token: string | undefined) {
  if (typeof token === 'undefined') return undefined;

  const users = await sql<User[]>`
    SELECT
      users.id,
      users.first_name,
      users.last_name,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.user_id;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql`
    SELECT * FROM users WHERE id = ${id};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function deleteUserById(id: string) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const users = await sql`
    DELETE FROM users
      WHERE id = ${id}
      RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function updateUserById(id: string, user: User) {
  // Return undefined if the id is not
  // in the correct format
  if (!/^\d+$/.test(id)) return undefined;

  const allowedProperties = ['firstName', 'lastName', 'city'];
  const userProperties = Object.keys(user);

  if (userProperties.length < 1) {
    return undefined;
  }

  const difference = userProperties.filter(
    (prop) => !allowedProperties.includes(prop),
  );

  if (difference.length > 0) {
    return undefined;
  }

  let users: User[] = [];

  if ('firstName' in user) {
    users = await sql`
      UPDATE users
        SET first_name = ${user.firstName}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('lastName' in user) {
    users = await sql`
      UPDATE users
        SET last_name = ${user.lastName}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  // if ('city' in user) {
  //   users = await sql`
  //     UPDATE users
  //       SET city = ${user.city}
  //       WHERE id = ${id}
  //       RETURNING *;
  //   `;
  // }

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function addTrip(
  date: string,
  temp: number,
  long: string,
  icon: string,
  city: string,
  country: string,
  userId: number,
) {
  const newTrip = await sql<Trips[]>`
          INSERT INTO trips
            (date_trip, temp_forecast, forecast_trip, icon_forecast, user_id)
          VALUES
            (${date}, ${temp}, ${long}, ${icon}, ${userId} )
          RETURNING *;
        `;

  const newCity = await sql<Cities[]>`
        INSERT INTO cities
          (city, country)
        VALUES
          (${city}, ${country} )
        RETURNING *;
      `;

  const newTripsCities = await sql<TripsCities[]>`
        INSERT INTO trips_cities
          (trip_id, city_id)
        VALUES
          (${newTrip[0].id}, ${newCity[0].id} )
        RETURNING *;
      `;

  const newWishListItem = {
    date: newTrip[0].date_trip,
    temp: newTrip[0].temp_forecast,
    long: newTrip[0].forecast_trip,
    icon: newTrip[0].icon_forecast,
    city: newCity[0].city,
    country: newCity[0].country,
  };
  return newWishListItem;
}

export async function getTripsByUserId(userId: number) {
  const trips = await sql`
    SELECT 
    trips.date_trip,
    trips.temp_forecast,
    trips.forecast_trip,
    trips.icon_forecast,
    cities.city,
    cities.country
    FROM
    trips,
    cities,
    trips_cities
    WHERE
    trips.user_id = ${userId} AND
    trips_cities.trip_id = trips.id AND
    trips_cities.city_id = cities.id;
  `;
  return trips.map((item) => {
    return {
      date: item.date_trip,
      temp: item.temp_forecast,
      long: item.forecast_trip,
      icon: item.icon_forecast,
      city: item.city,
      country: item.country,
    };
  });
}
