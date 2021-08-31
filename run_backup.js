import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();
const username = process.env.DB_USERNAME;
const database = process.env.DB_NAME;
const pgpass = process.env.PGPASS;
const date = new Date();
const currentDate = `${date.getFullYear()}.${
  date.getMonth() + 1
}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `database-backup-${currentDate}.sql`;

import compress from 'gzipme';

export function backup() {
  const date_backup = new Date();
  const currentDate_backup = `${date_backup.getFullYear()}.${
    date_backup.getMonth() + 1
  }.${date_backup.getDate()}.${date_backup.getHours()}.${date_backup.getMinutes()}.${date_backup.getSeconds()}`;
  const fileName_backup = `database-backup-${currentDate_backup}.sql`;
  exec(
    `pg_dump --dbname=postgresql://${username}:${pgpass}@127.0.0.1:5432/${database}  -F c -b -v -f ./backups/${fileName_backup}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Finito');
    }
  );
}

function backup_compressed() {
  exec(
    `pg_dump -U ${username} -d ${database} -f ${fileName} -F t`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`exec error: ${error}`);
        return;
      }
      await compress(fileName);
      fs.unlinkSync(fileName);
      console.log('Finito');
    }
  );
}

function restore() {
  exec(
    `pg_restore -U ${username} -d ${database} -f ${fileName}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log('Restored');
    }
  );
}
function sendToBackupServer(fileName = fileNameGzip) {
  const form = new FormData();
  form.append('file', fileName);
  axios
    .post('http://my.backupserver.org/private', form, {
      headers: form.getHeaders(),
    })
    .then((result) => {
      // Handle result…
      fs.unlinkSync(fileNameGzip);
      console.log(result.data);
    })
    .catch((err) => {
      // log error, send it to sentry... etc
      console.error(err);
    });
}
