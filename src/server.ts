import express from 'express';
import { json as jsonBodyParser } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getRouters } from './routers';

const runServer = () => {
  const app: express.Express = express();

  app.use(jsonBodyParser());
  app.use(cors());
  app.use(cookieParser());

  app.use(getRouters());

  app.listen(9487);
}

export { runServer }