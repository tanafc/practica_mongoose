import * as express from 'express';
import {Note} from '../models/note';

export const patchRouter = express.Router();

// Recibe peticiones para actualizar un artista según su nombre
patchRouter.patch('/note', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'monthlyListeners'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      Note.findOneAndUpdate({name: req.query.name.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((note) => {
        if (!note) {
          res.status(404).send();
        } else {
          res.send(note);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});