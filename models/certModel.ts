import mongoose, { Schema, Document } from 'mongoose';

export interface Certificate extends Document {
  ssintId: string;
  cardNumber: string;
  cardName: string;
  cardSet: string;
  cardYear: number;
  grade: string;
  additionalInfo?: string;
}

const CertificateSchema: Schema = new Schema(
  {
    ssintId: { type: String, required: true, unique: true },
    cardNumber: { type: String, required: true },
    cardName: { type: String, required: true },
    cardSet: { type: String, required: true },
    cardYear: { type: Number, required: true },
    grade: { type: String, required: true },
    additionalInfo: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Certificate || mongoose.model<Certificate>('Certificate', CertificateSchema);

/**
 * Exporting the Mongoose model for the "Certificate" collection.
 * 
 * - The `mongoose.models` object stores all previously created Mongoose models.
 * - This line ensures that the "Certificate" model is not redefined if it already exists,
 *   which is particularly important in development environments with hot-reloading
 *   (like when using Next.js).
 * 
 * - `mongoose.models.Certificate`: Checks if the "Certificate" model already exists.
 * - `mongoose.model<Certificate>('Certificate', CertificateSchema)`: Creates the model if it doesn't exist.
 * 
 * Why this is necessary:
 * - If we try to define a model with the same name multiple times, Mongoose will throw an error:
 *   "OverwriteModelError: Cannot overwrite 'Certificate' model once compiled."
 * 
 * Usage:
 * - Import this model wherever you need to interact with the "Certificate" collection in MongoDB.
 * 
 * Example:
 *   const Certificate = await Certificate.find({});
 */