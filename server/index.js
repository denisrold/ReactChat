import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/message.js";

//Moongose configuration:
const url = process.env.MONGODB_URL;

mongoose.Promise = global.Promise;

const app = express();
const PORT = 4000;

// http module server and socket server;
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

//MiddleWare:
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("Client connected");
  socket.on("message", (message, nickname) => {
    //Sending message to all clients
    socket.broadcast.emit("message", {
      body: message,
      from: nickname,
    });
  });
});

//database conexion.
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Database Connected");
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
