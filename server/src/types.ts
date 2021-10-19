import { Request, Response } from 'express';
import { Redis } from 'ioredis';
export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
};
export type UserParams = {
  email: string;
  password: string;
  isAdmin?: boolean;
};
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}