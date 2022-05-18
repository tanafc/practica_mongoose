import * as express from 'express';
import {Athlete} from '../models/athlete';


export const postRouter = express.Router();

/** Receives petitions to create Athletes */
postRouter.post('/athlete', (req, res) => {
  const athlete = new Athlete(req.body);

  athlete.save().then((athlete) => {
    res.status(201).send(athlete);
  }).catch((error) => {
    res.status(400).send(error);
  });
});
