require("dotenv").config({ path: "./.env" });

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { Db } = require("mongodb");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});