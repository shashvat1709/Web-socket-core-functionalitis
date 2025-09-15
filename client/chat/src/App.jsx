import React, { useEffect,useState,useMemo } from "react";
import { Container, Stack, TextField, Typography,Box } from "@mui/material";
import{ io } from "socket.io-client";


const App = () => { 

  const socket = useMemo(() => io("http://localhost:3000"), []);

    const [messages,setMessages] = useState([]);

  const [message,setMessage] = useState("");
  const [room,setRoom] = useState("");
  const [socketID,setSocketID] = useState("");
  const[roomName, setRoomName] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();
  socket.emit("message", { room, message }); // ✅ send object
  setMessage("");
};

const joinRoomHandler = (e) => {
  e.preventDefault();
  if (roomName !== "") {
    socket.emit("join-room", roomName);
    
    setRoom(roomName); // Set the current room to the joined room
    setRoomName(""); // Clear the input field after joining
  }
}




  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("recieve-message", (data) => {
      console.log(data);

      setMessages((messages) => [...messages, data]);
    });


  }, [socket]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}></Box>
        <Typography variant="h2" align="center" component="div" gutterBottom>
          Welcome to weChat
        </Typography>

        <Typography variant="h5" align="center" component="div" gutterBottom>
          Your ID: {socketID}
        </Typography>

        <form onSubmit={joinRoomHandler}>

          <h5>Join a Room</h5>

           <TextField
            id="outlined-basic"
            label="Room Name"
            variant="outlined"
            fullWidth
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
           <button type="submit">click to join</button>

        </form>


        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Type your message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Room"
            variant="outlined"
            fullWidth
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>


     

      <Stack>

        {
          messages.map((msg, index) => (
            <Typography key={index} variant="body1" align="left" component="div" gutterBottom>
              {msg.message || msg}
            </Typography>
          ))}
      </Stack>


    </Container>
  );


 
}

export default App;  