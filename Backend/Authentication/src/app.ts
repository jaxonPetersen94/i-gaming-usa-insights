import './config/config.js';
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import https from 'https';
import authenticationRoutes from './routes/Auth.js';
import initializeDatabase from './utils/db.js';

const app = express();
const port = process.env.PORT || 5000;
const options = {
  key: fs.readFileSync('./certs/development/key.pem'),
  cert: fs.readFileSync('./certs/development/cert.pem'),
};

app.use(cors());
app.use(express.json());
app.use(authenticationRoutes);

const mongoDatabase = initializeDatabase();

const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { mongoDatabase };
