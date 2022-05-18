import * as express from 'express';
import {Athlete} from '../models/athlete';


export const deleteRouter = express.Router();

/** Receives petitions to delete an athlete */
deleteRouter.delete('/athlete', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Athlete.findOneAndDelete({name: req.query.name.toString()}).then((athlete) => {
      if (!athlete) {
        res.status(404).send();
      } else {
        res.send(athlete);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});