import express from "express";
import http, { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { create } from "domain";



const app = express();
const port = 3000;
const server =  createServer(app);

app.use(cors());



const io =  new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});





io.on("connection",(socket)=>{
  console.log(`User connected: ${socket.id}`);

  socket.on("message",({room,message})=>{
    console.log({room,message});

    io.to(room).emit("recieve-message",message);
  })
 

  socket.on("join-room",(room)=>{
    socket.join(room);
    console.log(`User with ID ${socket.id} joined room: ${room}`);
    socket.to(room).emit("welcome", `User with ID ${socket.id} has joined the room`);
  });

   socket.broadcast.emit("welcome", `User with ID ${socket.id} has connected`);

});

app.get("/", (req, res) => {
  res.send("Server is running");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});