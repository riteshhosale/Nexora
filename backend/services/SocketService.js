const { getIO } = require("../server/socket");
const { getUserSocket } = require("../socket/users");

const sendNotification = (receiverId, notification) => {
    const socketId = getUserSocket(receiverId);
    if (!socketid) return;
    getIO().to(socketId).emit("newNotification", notification);
};

module.exports = {
    sendNotification,
}