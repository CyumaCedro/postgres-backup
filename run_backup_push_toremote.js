// run_backup.js

require("dotenv").config();

const execFile = require("child_process").execFile;
const fs = require("fs");
const Client = require("ssh2-sftp-client");
let sftp = new Client();

const date = new Date();
const current_date = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
const backup_file_ext = `export_${current_date}.dump`;

let backup_script;
if (process.env.NODE_ENV == "development") {
  backup_script = `pg_dump --username=${process.env.DB_USER} ${process.env.DB_NAME}`;
} else {
  backup_script = `pg_dump --username=${process.env.DB_USER} -Fc ${process.env.DB_NAME} -h ${process.env.DB_HOST}`;
}
var script = execFile(
  `./backup.sh`,
  [db, backup_file_ext, process.env.DB_PASSWORD],
  (error, stdout, stderr) => {
    sftp.connect(importConfig.sftpConnectionDetails).then(() => {
      sftp.fastPut(backup_file_ext, "/" + backup_file_ext).then(() => {
        fs.unlink(backup_file_ext, () => {
          script.kill("SIGINT");
        });
      });
    });
  }
);
