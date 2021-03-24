const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

class User {
    id;
    name;
    email;
    constructor(args) {
        Object.assign(this, args);
    }
}

const users = [1,2,3].map(n=> new User({id:n, name:'steve'+n, email:'info@konfer.be'+n}))

const fakeDatabase = users;

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

const schema2 = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!,
        rollThreeDice: [Int],
        rollDice(idx:Int): Int
    }
`);


const root2 = {
    quoteOfTheDay: () => {
        return 'Quote of the day'
    },
    random: () => {
        return 3.14
    },
    rollThreeDice: () => {
        return [1,2,3]
    },
    rollDice: (idx) => {
        return [1,2,3].find(v => v === idx.idx)
    }
};

const schema3 = buildSchema(`
    type User {
        id: Int,
        name: String,
        email: String
    },
    type Query {
        single(args: Int): User,
        multiple: [User]
    }
`);

const root3 = {
    single: (args) => {
        return users.find(u => u.id === args.args);
    },
    multiple: () => {
        return users;
    }
};

const schema4 = buildSchema(`
    input UserInput {
        name: String,
        email: String
    },
    type User {
        id: Int,
        name: String,
        email: String
    },
    type Query {
        getUser(id: ID!): User
    },
    type Mutation {
        createUser(input: UserInput): User,
        updateUser(id: ID!, input: UserInput): User
    }
`);

const root4 = {
    single: (args) => {
        return fakeDatabase.find(u => u.id === args.args);
    },
    getUser: ({ id }) => {
        console.log('id', id);
        return fakeDatabase.find(u => u.id == id);
    },
    createUser: ({ input }) => {
        fakeDatabase.push(input);
        return fakeDatabase.slice().shift();
    },
    updateUser: ({ id, input }) => {
        fakeDatabase[id].name = name;
        return fakeDatabase[id];
    }
};

const app = express();

app.post('/graphql', graphqlHTTP({
    schema: schema4,
    rootValue: root4,
    graphiql: true
}));

app.listen(8201, () => {
    console.log('Express is running on port 8201');
});