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

const compress = require('gzipme');

function backup() {
  exec(
    `pg_dump --dbname=postgresql://${username}:${pgpass}@127.0.0.1:5432/${database}  -F c -b -v -f ./backups/${fileName}`,
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

backup();
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
