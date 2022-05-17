import * as express from 'express';
import {Note} from '../models/note';


export const deleteRouter = express.Router();

// Recibe peticiones de eliminación de artistas por su nombre
deleteRouter.delete('/note', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    Note.findOneAndDelete({name: req.query.name.toString()}).then((note) => {
      if (!note) {
        res.status(404).send();
      } else {
        res.send(note);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});