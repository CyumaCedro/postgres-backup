import express from 'express';
import dotenv from 'dotenv';
import { sendEmails } from './cronjob.js';

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.static('./backups'));
// app.get('/')
sendEmails();
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

export default app;
