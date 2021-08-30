const { execute } = require("@getvim/execute");
const dotenv = require("dotenv");
dotenv.config();
const username = process.env.DB_USERNAME;
const database = process.env.DB_NAME;
const pgpass = process.env.PGPASS;
const date = new Date();
const currentDate = `${date.getFullYear()}.${
  date.getMonth() + 1
}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `database-backup-${currentDate}.sql`;

function restore() {
  execute(
    `pg_dump "host=localhost port=5432 dbname=${database} user=${username} password=${pgpass}" > ./backups/database-backup-2021.8.30.15.34.sql`
  )
    .then(async () => {
      console.log("Restored");
    })
    .catch((err) => {
      console.log(err);
    });
}

restore();
