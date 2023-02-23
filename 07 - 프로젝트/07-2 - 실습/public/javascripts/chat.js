/* eslint-disable camelcase */
/* eslint-disable no-undef */
// io("url", {options})
let socket = "";
const myNick = Math.floor(Math.random() * (999999 - 100000) + 100000);
let joinRoom;

const connect = document.getElementById("connect");
connect.addEventListener("click", () => {
  socket = io("ws://localhost:3000/bexco", {
    autoConnect: false,
    transports: ["websocket"],
  });

  socket.open((err) => {
    console.log(err);
  });

  socket.on("connect", () => {
    console.log(`socket의 아이디는 ${socket.id}`);
    console.log(`socket의 연결 상태는${socket.connected}`);
  });

  socket.on("chat", (arg) => {
    console.log(arg);
    makeURChat(arg.nick, arg.message);
  });

  socket.on("clientJoin", (nick) => {
    joinLeaveMessage("join", nick);
  });

  socket.on("clientLeave", (nick) => {
    joinLeaveMessage("leave", nick);
  });
});

const join = document.getElementById("join");
join.addEventListener("click", () => {
  const room = document.getElementById("room-text");
  joinRoom = room.value;
  socket.emit("join", { nick: myNick, room: joinRoom });
});

const send = document.getElementById("send");
send.addEventListener("click", () => {
  const message = document.getElementById("chat-text");
  if (message.value.length > 0) {
    socket.emit("chat", {
      room: joinRoom,
      nick: myNick,
      message: message.value,
    });
    makeMYChat(myNick, message.value);
    message.value = "";
  }
});

const leave = document.getElementById("leave");
leave.addEventListener("click", () => {
  socket.emit("leave", { nick: myNick, room: joinRoom });
  const room = document.getElementById("room-text");
  room.value = "";
  joinRoom = "";
});

function makeURChat(nick, message) {
  const div0 = document.createElement("div");
  div0.className = "UR-message";
  const div1 = document.createElement("div");
  div1.className = "gray";

  const div1_1 = document.createElement("div");
  const span1_1 = document.createElement("span");
  span1_1.innerText = nick;
  div1_1.append(span1_1);

  const div1_2 = document.createElement("div");
  const span1_2 = document.createElement("span");
  span1_2.innerText = message;
  div1_2.append(span1_2);
  div1.append(div1_1, div1_2);
  div0.append(div1);

  const box = document.getElementsByClassName("message-box")[0];
  box.append(div0);
}

function makeMYChat(nick, message) {
  const div0 = document.createElement("div");
  div0.className = "MY-message";
  const div1 = document.createElement("div");
  div1.className = "yellow";

  const div1_1 = document.createElement("div");
  const span1_1 = document.createElement("span");
  span1_1.innerText = nick;
  div1_1.append(span1_1);

  const div1_2 = document.createElement("div");
  const span1_2 = document.createElement("span");
  span1_2.innerText = message;
  div1_2.append(span1_2);
  div1.append(div1_1, div1_2);
  div0.append(div1);

  const box = document.getElementsByClassName("message-box")[0];
  box.append(div0);
}

function joinLeaveMessage(state, nick) {
  const div0 = document.createElement("div");
  className = `${state}-box`;
  const div1 = document.createElement("div");
  const span1 = document.createElement("span");
  if (state === "join") {
    span1.innerText = `${nick}님이 채팅방을 들어왔습니다.`;
  } else {
    span1.innerText = `${nick}님이 채팅방을 나갔습니다.`;
  }

  div1.append(span1);
  div0.append(div1);

  const box = document.getElementsByClassName("message-box")[0];
  box.append(div0);
}
