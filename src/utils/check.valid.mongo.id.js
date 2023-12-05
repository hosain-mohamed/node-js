import mongoose from 'mongoose';
import AppError from './app.error.js';
import * as httpMessages from './http.message.text.js';

export async function checkValidId(id, callBack) {
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) throw new AppError(500, httpMessages.INVALID_ID);
  return callBack();
}