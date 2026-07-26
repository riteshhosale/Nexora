const { Server } = require("socket.io");
const registerSocket = require("../socket");

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5137",
            credentials: true,
        },
    });
    registerSocket(io);
};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO,
};