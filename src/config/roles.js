const allRoles = {
    user: ['getUsers', 'manageUsers', 'getBooks', 'manageBooks'],
    admin: ['getUsers', 'manageUsers', 'getBooks', 'manageBooks'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};