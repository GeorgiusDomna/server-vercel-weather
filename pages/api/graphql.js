import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from '../../src/schema/resolvers';
import { typeDefs } from '../../src/schema/typeDefs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const startServer = startServerAndCreateNextHandler(server);


const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  }
  await startServer(req, res);
};

export default handler;