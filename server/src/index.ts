import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import { COOKIE_NAME, __prod__ } from './constants';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'graphql';
import { createConnection, RelationId } from 'typeorm';
import { User } from './entities/User';
import { Niggun } from './entities/Niggun';
import connectRedis from 'connect-redis';
import redis from 'redis';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User, Niggun],
  });
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.ACCESS_TOKEN_SECRET || 'amazing secret',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
  });
};

main().catch(err => {
  console.error(err);
});
