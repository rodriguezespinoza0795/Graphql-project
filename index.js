const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const app = express();
const port = process.env.port || 4000

const resolvers = {
    hello: () => {
        return 'Hola Mundo'
    }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));