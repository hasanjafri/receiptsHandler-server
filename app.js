import express from 'express';
import bodyParser from 'body-parser';

import receipt_routes from './routes/receipts';
import { jsonErr } from './utils/json';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
})

app.use('/api', receipt_routes);
app.use((req, res) => jsonErr(res, {
  url: `${req.originalUrl} not found`
}, 404));

export default app;