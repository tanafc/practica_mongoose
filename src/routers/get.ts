import * as express from 'express';
import {Athlete} from '../models/athlete';


export const getRouter = express.Router();

/** Receives petitions to get an athlete */
getRouter.get('/athlete', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Athlete.find(filter).then((athlete) => {
    if (athlete.length !== 0) {
      res.send(athlete);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});
