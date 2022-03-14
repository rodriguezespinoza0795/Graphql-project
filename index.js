const { graphql, buildSchema } = require('graphql')

// definiendo Schema
const schema = buildSchema(`
	type Query {
		hello: String
	} 
`);

// definiciendo los Resolvers
const resolvers = {
    hello: () => {
        return 'Hola Mundo'
    }
}

// Ejecutar el query hello
graphql({
    schema: schema,
    source: '{ hello }',
    rootValue: resolvers
})
.then((data) => {console.log(data)})