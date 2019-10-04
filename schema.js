/**
 * Construct a schema, using GraphQL schema language
 */
const typeDefs = `
    type Query {
        contact(id: ID!): Contact!
        contacts: [Contact!]!
        account(id: ID!): Account!
        accounts: [Account!]!
        capacity(id: ID!): Capacity!
        capacities(role: String): [Capacity!]!
    }

    type Capacity {
        id: ID!
        account: Account!
        contact: Contact!
        role: String!
    }

    type Account {
        id: ID!
        name: String!
        capacities: [Capacity!]!
    }

    type Contact {
        id: ID!
        name: String!
        capacities: [Capacity!]!
    }

    type Mutation {
        createContact(input: CreateContactInput!): Contact!
        updateContact(input: UpdateContactInput!): Contact!
        createAccount(input: CreateAccountInput!): Account!
        updateAccount(input: UpdateAccountInput!): Account!
        createCapacity(input: CreateCapacityInput!): Capacity!
        updateCapacity(input: UpdateCapacityInput!): Capacity!
    }

    input CreateContactInput {
        name: String!
    }

    input UpdateContactInput {
        name: String!
    }

    input CreateAccountInput {
        name: String!
    }

    input UpdateAccountInput {
        name: String!
    }

    input CreateCapacityInput {
        role: String!
    }

    input UpdateCapacityInput {
        role: String!
    }
`

module.exports = { typeDefs }