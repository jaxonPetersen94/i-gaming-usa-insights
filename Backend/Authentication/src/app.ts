import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import authenticationRoutes from './routes/Auth.js';

const app = express();
const port = process.env.PORT || 5000;
const options = {
  key: fs.readFileSync('./certs/development/key.pem'),
  cert: fs.readFileSync('./certs/development/cert.pem'),
};

app.use(cors());
app.use(express.json());
app.use(authenticationRoutes);

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
