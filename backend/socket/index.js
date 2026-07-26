const registerEvents = require("./events");
module.exports = (io) => {
    io.on("Connection", (socket) => {
        console.log("Socket Connected: ", socket.id);
        registerEvents(io, socket);
    });
};