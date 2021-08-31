const { exec } = require('child_process');
const dotenv = require('dotenv');
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
  exec(
    `pg_restore --dbname=postgresql://${username}:${pgpass}@127.0.0.1:5432/${database}  -v ./backups/database-backup-2021.8.31.13.8.sql`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log('Restored');
    }
  );
}

restore();
