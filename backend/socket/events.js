const { addUser, removeUser } = require("./users");

const registerSocketEvents = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Register user after frontend connects
        socket.on("register", (userId) => {
            addUser(userId, socket.id);
            console.log(`User ${userId} registered`);
        });

        socket.on("disconnect", () => {
            removeUser(socket.id);
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = registerSocketEvents;