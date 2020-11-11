exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS trips (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      title_trip varchar(40),
      day_trip date,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
      city_id integer NOT NULL REFERENCES cities (id) ON DELETE CASCADE ON UPDATE CASCADE
    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS trips;
	`;
};
