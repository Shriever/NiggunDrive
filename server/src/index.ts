import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
// import session from 'express-session'
// import { COOKIE_NAME } from './constants';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'graphql';
import { createConnection } from 'typeorm';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    migrations: [path.join(__dirname, './migrations')],
    entities: [],
  });
  const app = express();

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  //   app.use(
  //       session({
  //           name: COOKIE_NAME,
  //           cookie: {
  //               maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years

  //           }
  //       })
  //   )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
      validate: false,
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
