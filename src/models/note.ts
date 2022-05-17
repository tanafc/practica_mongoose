import {Document, Schema, model} from 'mongoose';

export interface NoteDocumentInterface extends Document {
  name: string,
  monthlyListeners: number
}

const NoteSchema = new Schema<NoteDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  monthlyListeners: {
    type: Number,
    default: 0,
  },
});

export const Note = model<NoteDocumentInterface>('Note', NoteSchema);