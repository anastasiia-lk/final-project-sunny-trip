exports.up = async (sql) => {
  await sql`
    ALTER TABLE users
      ADD COLUMN last_name varchar(40);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE users
      DROP COLUMN last_name;
  `;
};
