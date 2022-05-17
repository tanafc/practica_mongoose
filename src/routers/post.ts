import * as express from 'express';
import {Note} from '../models/note';


export const postRouter = express.Router();

// Recibe peticiones para crear notas
postRouter.post('/note', (req, res) => {
  const note = new Note({
    name: req.body.name,
    monthlyListeners: req.body.monthlyListeners,
  });
  // Se almacenan los datos de la nota
  note.save().then((note) => {
    res.status(201).send(note);
  }).catch((error) => {
    res.status(400).send(error);
  });
});
