const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');
const GraphQLJSON = require('graphql-type-json');

// mutation: put patch delete post schema data
// query: get schema data
// type: schema data collections

// resolvers handle the querys to mongo for each mutation / query

const typeDefs = `

  scalar JSON

  type Query {
    user: User
  }

  type User {
    _id: ID!
    _oAuthId: String
    password: String
    resetPasswordToken: String
    resetPasswordExpires: String
    email: String
    properties: JSON
  }

  type Property {
    _id: ID!
    address: String!
  }

`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
// module.exports = makeExecutableSchema({ typeDefs });
