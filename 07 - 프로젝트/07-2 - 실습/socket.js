const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const io = new Server();

instrument(io, {
  auth: false,
  mode: "development",
});

io.of("/bexco").on("connection", (socket) => {
  console.log(`${socket.id}가 들어왔습니다.`);
  console.log(socket.rooms);
  socket.join("hs");

  console.log(socket.rooms);

  socket.on("chat", (arg) => {
    console.log(`chat이벤트가 발생했고, 값으로 "${arg}"가 왔습니다.`);
    // io.of("/").emit("hi", "hi이벤트를 서버에서 보냄.");
    // socket.emit("hi", "hi이벤트를 서버에서 보냄.");
    // socket.to("hs").emit("hi", "hi이벤트를 서버에서 보냄.");
    // io.of("/").to("hs").emit("hi", "hi이벤트를 서버에서 보냄.");
    // io.of("/bexco").to("hs").emit("chat", arg);
    socket.to(arg.room).emit("chat", arg);
  });

  socket.on("join", (v1) => {
    socket.join(v1.room);
    socket.to(v1.room).emit("clientJoin", `${v1.nick}`);
  });

  socket.on("leave", (v1) => {
    socket.to(v1.room).emit("clientLeave", `${v1.nick}`);
    socket.leave(v1.room);
  });
});

module.exports = io;
