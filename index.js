const { graphql, buildSchema } = require('graphql')

// definiciendo Schema
const schema = buildSchema(`
	type Query {
		hello: String
	} 
`);

// Ejecutar el query hello
graphql({schema:schema,source:'{hello}'})
.then((data) => {console.log(data)})