import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { BookResolver } from './resolvers/book.resolver';

async function main () {
    const connection = await createConnection();
    const schema = await buildSchema({
        resolvers: [ BookResolver ]
    });
    const server = new ApolloServer({ schema });
    await server.listen(8301);
    console.log('Apollo server running on port 8301');
}

main();