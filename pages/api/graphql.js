import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from '../../src/schema/resolvers';
import { typeDefs } from '../../src/schema/typeDefs';
import 'dotenv/config';

const allowOrigin = process.env.ALLOW_ORIGIN;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const startServer = startServerAndCreateNextHandler(server);

const enableCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', allowOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  return await fn(req, res)
}

const handler = async (req, res) => {
  await startServer(req, res);
}

module.exports = enableCors(handler)