exports.up = async (sql) => {
  await sql`
    ALTER TABLE users
      ADD COLUMN first_name varchar(40);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE users
      DROP COLUMN first_name;
  `;
};
