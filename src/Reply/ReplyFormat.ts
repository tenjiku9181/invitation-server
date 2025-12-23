import * as mongodb from "mongodb";

export interface ReplyFormat {
  _id?: mongodb.ObjectId;
  name: string;
  furigana?: string;
  email: string;
  phone: string;
  guestSide: 'groom' | 'bride';
  willAttend: 'Yes' | 'No';
  foodAllergy?: string;
  otherQuestions?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}