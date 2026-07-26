require("dotenv").config({ path: "./.env" });

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { initializeSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

// Start Server
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});