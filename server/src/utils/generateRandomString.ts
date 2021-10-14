import crypto from 'crypto';
import { promisify } from 'util';

export const generateRandomString = async () => {
  const randomBytes = promisify(crypto.randomBytes);
  const rawBytes = await randomBytes(16);
  return rawBytes.toString();
};
