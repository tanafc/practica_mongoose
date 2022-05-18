import * as express from 'express';
import {Athlete} from '../models/athlete';

export const patchRouter = express.Router();

/** Receives petitions to update an athlete */
patchRouter.patch('/athlete', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'surname', 'NIF', 'age', 'sport', 'competence', 'bestRecord'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Athlete.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((athelete) => {
        if (!athelete) {
          res.status(404).send();
        } else {
          res.send(athelete);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});