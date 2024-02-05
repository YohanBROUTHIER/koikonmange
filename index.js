import { createServer } from 'node:http';

import './src/helpers/envLoad.js';

import app from './src/index.js'; //Module express

const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});