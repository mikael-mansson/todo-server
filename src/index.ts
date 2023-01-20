import express, { Express } from 'express';
import bodyParser from 'body-parser';
import router from './router';

const { urlencoded, json } = bodyParser;

const PORT = 3001;

const app: Express = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Listing on http://localhost:${PORT}`);
});
