require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import route from './routes';
import { errorHandler } from './utils/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.use(function (err, req, res, next) {
  errorHandler(err, res);
});


app.listen(process.env.PORT || 3000, () => {
  console.log('server is running');
});

export default app;