const express = require('express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const typeDefs = buildSchema(readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf8'));

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express();
const port = process.env.port || 4000

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));