let users = new Set()
let socketToUsers = {} // maps socket id to username

module.exports.addUsername = (username) => {
    if (users.has(username)) throw "Username already exists";
    users.add(username) 
}

module.exports.setUserForSocket = (socketId, username) => {
    socketToUsers[socketId] = username;
}

module.exports.usernameExists = (username) => {
    return users.has(username)
}