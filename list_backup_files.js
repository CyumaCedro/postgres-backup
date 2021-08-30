const backups = "./backups/";
const fs = require("fs");

const allBackups = [];
fs.readdir(backups, async (err, files) => {
  await files.forEach((file) => {
    console.log(file);
    allBackups.push(file);
  });
  //---The files
  console.log(allBackups.reverse());
});
