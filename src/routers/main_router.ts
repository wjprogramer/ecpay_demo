import express, { Request, Response, NextFunction, IRouterHandler } from 'express';
import { json as jsonBodyParser } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const getMainRouter = () => {
  const mainRouter = express.Router();

  mainRouter.route('/hello')
    .get((_, res) => {
      res.json({ msg: 'hello world' });
    })

  mainRouter.route('/')
    .post((req, res) => {
      const { data } = req.body;
      res.json({ result: true });
    });

  return mainRouter;
}