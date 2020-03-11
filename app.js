require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import route from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);


app.listen(process.env.PORT || 3000, () => {
  console.log('server is running');
});

export default app;