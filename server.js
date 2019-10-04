const { GraphQLServer } = require('graphql-yoga')
const { DataLoader } = require('dataloader')
const { apiFunctions } = require('./apis')
const { typeDefs } = require('./schema')

/**
 * Query Resolvers: The GraphQL query resolvers
 * Uses helper resolvers:
 * - contactResolvers
 * - accountResolvers
 * - capacityResolvers
 */
const queryResolvers = {
    contacts(obj, args, context, info) {
        return apiFunctions.contacts().map(c => { return { id: c.id, name: c.contactName } })
    },
    contact(obj, args, context, info) {
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
        return args.role ? apiFunctions.capacitiesByRole(args.role) : apiFunctions.capacities()
    },
    capacity(obj, args, context, info) {
        return apiFunctions.capacityById(args.id)
    }
}

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

/**
 * Mutation Resolvers
 */
const mutationResolvers = {
    createContact(obj, args, context, info) {
        // POST to API
    },
    updateContact(obj, args, context, info) {
        // PUT to API
    },
    createAccount(obj, args, context, info) {
        // POST to API
    },
    updateAccount(obj, args, context, info) {
        // PUT to API
    },
    createCapacity(obj, args, context, info) {
        // POST to API
    },
    updateCapacity(obj, args, context, info) {
        // PUT to API
    }
}

const resolvers = {
    Query: queryResolvers,
    Contact: contactResolvers,
    Account: accountResolvers,
    Capacity: capacityResolvers,
    Mutation: mutationResolvers
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))