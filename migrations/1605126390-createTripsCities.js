exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS trips_cities (
      PRIMARY KEY (trip_id, city_id),
      trip_id INT REFERENCES trips (id),
			city_id INT REFERENCES cities (id)
    );
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS trips_cities;
	`;
};
