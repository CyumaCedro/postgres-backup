import cron from 'node-cron';
import dotenv from 'dotenv';
import { deleteBackup } from './deleteOldBackups.js';

import { sendEmail } from './helpers/sendMail.js';
import { backup } from './run_backup.js';
import fs from 'fs';

dotenv.config();

export const sendEmails = () => {
  const allBackups = [];
  let latest;
  fs.readdir('./backups/', async (err, files) => {
    await files.forEach((file) => {
      allBackups.push(file);
    });
    //---The files
    const sortedBackup = allBackups.reverse();
    latest = sortedBackup[0];
    cron.schedule('0 0 1 * * *', async () => {
      try {
        await deleteBackup();
        await backup();
        let recievers = process.env.RECIEVERS;
        recievers = recievers.split(',');
        const latestBackup = `${process.env.BACKUP_URL}/${latest}`;
        const subject = `DAP DATABASE BACKUP ${new Date()}`;
        const body = `
        <div style="background-color:#115e82; padding: 15px;">
          <div style="background-color:#fff; padding: 10px; text-align: center;">
              <h3 style="text-transform: uppercase;">DAP Database Backup</h3>
              <p><b>This backup is valid for only 7 days.</p>
              <p><a href="${latestBackup}" style="text-decoration: none; color:#115e82;">Follow this link to download the backup</a></p>
          </div>
        </div>`;
        for (let i = 0; i < recievers.length; i++) {
          await sendEmail(recievers[i], subject, body);
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  });
  return latest;
};
