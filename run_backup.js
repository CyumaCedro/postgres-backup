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
const fileName = `database-backup-${currentDate}.tar`;

const compress = require("gzipme");

function backup() {
  execute(
    `pg_dump "host=localhost port=5432 dbname=${database} user=${username} password=${pgpass}" > dap_export.sql`
  )
    .then(async () => {
      console.log("Finito");
    })
    .catch((err) => {
      console.log(err);
    });
}

function backup_compressed() {
  execute(`pg_dump -U ${username} -d ${database} -f ${fileName} -F t`)
    .then(async () => {
      //added line
      await compress(fileName);
      fs.unlinkSync(fileName);
      console.log("Finito");
    })
    .catch((err) => {
      console.log(err);
    });
}

backup();
function restore() {
  execute(`pg_restore -cC -d ${database} ${fileNameGzip}`)
    .then(async () => {
      console.log("Restored");
    })
    .catch((err) => {
      console.log(err);
    });
}
function sendToBackupServer(fileName = fileNameGzip) {
  const form = new FormData();
  form.append("file", fileName);
  axios
    .post("http://my.backupserver.org/private", form, {
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
