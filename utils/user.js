let allUsers = [];

const addUser = (user) => {
    allUsers.push(user);
};

const getAllUsers = (room) => {
    return allUsers.filter(user => user.room === room);
};

const getUser = (socketId) => {
    const user = allUsers.filter(curUser => curUser.id === socketId);
    return user[0];
};

const removeUser = (socketId) => {
    const usersLeft = allUsers.filter(user => user.id !== socketId);
    const removedUser = allUsers.filter(user => user.id === socketId)[0];
    allUsers = usersLeft;
    return { allUsers, removedUser };
};

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    removeUser
};