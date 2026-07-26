const {
    addUser,
    removeUser,
} = require("./users");

module.exports = (io, socket) => {
    socket.on("join", (userId) => {
        addUser(userId, socket.id);
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log(`User disconnected with socket ID: ${socket.id}`);
    });
}; 