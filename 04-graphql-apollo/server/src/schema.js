const { gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
        token: String
    }   

    type Mission {
        name: String,
        missionPatch(size: PatchSize): String
    }

    type Rocket {
     id: ID!
     name: String
     type: String   
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type Query {
        launches(pageSize: Int after: String): LaunchConnection!
        launch(id: ID!): Launch
        me: User
    }

    type LaunchConnection {
        cursor: String
        hasMore: Boolean!
        launches: [Launch]!
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): User
    }
`;

exports.typeDefs = typeDefs;