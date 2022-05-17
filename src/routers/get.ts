import * as express from 'express';
import {Note} from '../models/note';


export const getRouter = express.Router();

// Recibe peticiones para obtener artistas por sus nombres
getRouter.get('/note', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};

  Note.find(filter).then((note) => {
    if (note.length !== 0) {
      res.send(note);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});
