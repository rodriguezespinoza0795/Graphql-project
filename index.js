const express = require('express');
const cors = require("cors")
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const typeDefs = buildSchema(readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf8'));

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express();
app.use(cors())
const port = process.env.port || 4000
const isDev = process.env.NODE_ENV !== 'production'

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev,
}));

app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));