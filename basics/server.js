const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => {
        return 'Hello graphQL world';
    }
};

graphql(schema, '{ hello }', root)
    .then( (result) => {
        console.log('graphQL response: ', result);
    });