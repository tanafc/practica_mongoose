import {Document, Schema, model} from 'mongoose';

/**
 * Interfaces that defines a series of attributes
 * for documenting an Athlete
 */
export interface AthleteDocumentInterface extends Document {
  name: string,
  surname: string,
  NIF: string,
  age: number,
  sport: string,
  competence: string,
  bestRecord: number
}

/**
 * Schema that defines an Athlete with its valid attributes
 */
const AthleteSchema = new Schema<AthleteDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Athlete name must start with a capital letter');
      }
    },
  },
  surname: {
    type: String,
    trim: true,
  },
  NIF: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[0-9]{8}[A-Z]$/i)) {
        throw new Error('NIF format not valid');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
  },
  sport: {
    type: String,
    default: 'Football',
    enum: ['Football', 'BasketBall', 'Athletics', 'Cycling', 'Swim'],
  },
  competence: {
    type: String,
  },
  bestRecord: {
    type: Number,
  },
});

/**
 * Model of the Athlete to be exported
 */
export const Athlete = model<AthleteDocumentInterface>('Athlete', AthleteSchema);