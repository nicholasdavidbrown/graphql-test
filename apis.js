let testContacts = {
    "123": { id: 123, contactName: 'Nicholas' },
    "234": { id: 234, contactName: 'Andre' }
}

let testAccounts = {
    "1123": { id: 1123, accountName: 'NicholasAccount' },
    "1234": { id: 1234, accountName: 'AndreAccount' }
}

let testCapacities = {
    "998": { id: 998, account: 1234, contact: 234, role: 'Staff' },
    "999": { id: 999, account: 1123, contact: 123, role: 'Owner' },
    "997": { id: 997, account: 1234, contact: 234, role: 'Owner' }
}

const accountById = (id) => {
    console.log(`accountById`, id)
    return testAccounts[id]
}

const contactById = (id) => {
    console.log(`contactById`, id)
    return testContacts[id]
}
const capacityById = (id) => {
    console.log(`capacityById`, id)
    return testCapacities[id]
}

const contacts = () => {
    return Object.values(testContacts)
}

const accounts = () => {
    return Object.values(testAccounts)
}

const capacities = () => {
    return Object.values(testCapacities)
}

const capacitiesByRole = (role) => {
    return Object.values(testCapacities).filter(capacity => {
        return capacity.role === role
    })
}
const capacityByContactId = (id) => {
    return Object.values(testCapacities).filter(capacity => {
        return capacity.contact === id
    })
}

const capacityByAccountId = (id) => {
    return Object.values(testCapacities).filter(capacity => {
        return capacity.account === id
    })
}

const capacityByAccountIdAndRole = (id, role) => {
    return Object.values(testCapacities).filter(capacity => {
        return capacity.account === id && capacity.role === role
    })
}

const capacityByContactIdAndRole = (id, role) => {
    return Object.values(testCapacities).filter(capacity => {
        return capacity.contact === id && capacity.role === role
    })
}

const apiFunctions = { accountById, contactById, capacityById, contacts, accounts, capacities, capacityByContactId, capacityByAccountId, capacityByAccountIdAndRole, capacityByContactIdAndRole, capacitiesByRole }
module.exports = { apiFunctions }