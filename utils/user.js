let allUsers = [];

const addUser = (user) => {
    allUsers.push(user);
};

const getAllUsers = () => {
    return allUsers;
};

const getUser = (socketId) => {
    const user = allUsers.filter(curUser => curUser.id === socketId);
    return user[0];
};

const removeUser = (socketId) => {
    const usersLeft = allUsers.filter(user => user.id !== socketId);
    allUsers = usersLeft;
    return allUsers;
};

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    removeUser
};