const backups = './backups/';
import fs from 'fs';

export const deleteBackup = () => {
  const allBackups = [];
  fs.readdir(backups, async (err, files) => {
    await files.forEach((file) => {
      allBackups.push(file);
    });
    //---The files
    const sortedBackups = allBackups.reverse();
    if (sortedBackups.length > 7) {
      try {
        fs.unlinkSync(`${backups}${sortedBackups[sortedBackups.length - 1]}`);
        //file removed
      } catch (err) {
        console.error(err);
      }
    }
  });
};
