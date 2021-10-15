// import crypto from 'crypto';
// import { promisify } from 'util';

// export const generateRandomString = async () => {
//   const randomBytes = promisify(crypto.randomBytes);
//   const rawBytes = await randomBytes(16);
//   return rawBytes.toString();
// };
export const generateRandomString = (length = 12) => {
  const beginning = Math.random().toString(16).substr(2, length);
  const end = Math.random().toString(16).substr(2, length);
  return beginning + end;
};
