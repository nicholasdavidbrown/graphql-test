const { GraphQLServer } = require('graphql-yoga')
const { DataLoader } = require('dataloader')
const { apiFunctions } = require('./apis')

// Construct a schema, using GraphQL schema language
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
`

/**
 * Resolvers given a contact
 */
const contactResolvers = {
    capacities: (parent, args) => {
        return apiFunctions.capacityByContactId(parent.id)
    }
}

/**
 * Resolvers given accounts
 */
const accountResolvers = {
    capacities: (parent, args) => {
        return apiFunctions.capacityByAccount(parent.id)
    }
}

/**
 * Resolvers given a capacity
 */
const capacityResolvers = {
    contact: (parent, args) => {
        const qrc = queryResolvers.contact
        return qrc(parent, { id: parent.contact })
    },
    account: (parent, args) => {
        const qrc = queryResolvers.account
        return qrc(parent, { id: parent.account })
    }
}

// The root provides a resolver function for each API endpoint
const queryResolvers = {
    contacts(obj, args, context, info) {
        return apiFunctions.contacts().map(c => { return { id: c.id, name: c.contactName } })
    },
    contact(obj, args, context, info) {
        // replace contactName with name
        const c = apiFunctions.contactById(args.id)
        return { id: c.id, name: c.contactName }
    },
    accounts(obj, args, context, info) {
        return apiFunctions.accounts().map(c => { return { id: c.id, name: c.accountName } })
    },
    account(obj, args, context, info) {
        const c = apiFunctions.accountById(args.id)
        return { id: c.id, name: c.accountName }
    },
    capacities(obj, args, context, info) {

        // If undefined search
        if (args.role) {
            return apiFunctions.capacitiesByRole(args.role)
        } else {
            return apiFunctions.capacities()
        }

    },
    capacity(obj, args, context, info) {
        return apiFunctions.capacityById(args.id)
    }
}

const resolvers = {
    Query: queryResolvers,
    Contact: contactResolvers,
    Account: accountResolvers,
    Capacity: capacityResolvers
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))