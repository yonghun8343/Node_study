/* eslint-disable camelcase */
sessionStorage.setItem("id", 3);
sessionStorage.setItem("name", "4");
sessionStorage.setItem("nick", "4");

const uid = sessionStorage.getItem("id");

let page = 0;
const count = 10;
let isEnd = false;

getUserList(uid, page, count, () => {
  document
    .getElementsByClassName("wrap-right-bottom")[0]
    .addEventListener("scroll", () => {
      // scroll의 전체 높이
      // bottom.scrollHeight
      const scHei =
        document.getElementsByClassName("wrap-right-bottom")[0].scrollHeight;

      // 현재 스크롤의 위치
      // bottom.scrollTop
      const scTop =
        document.getElementsByClassName("wrap-right-bottom")[0].scrollTop;

      const height =
        document.getElementsByClassName("wrap-right-bottom")[0].clientHeight;

      console.log(`scHei: ${scHei}`);
      console.log(`scTop: ${scTop}`);
      console.log(`height: ${height}`);
      if (scHei <= scTop + height && isEnd === false) {
        page += 1;
        getUserList(uid, page, count);
      }
    });
});

function makeBoard(bid, nick, date, content, sort = "DESC") {
  const div1 = document.createElement("div");
  div1.className = "board-content";

  const div1_1 = document.createElement("div");
  div1_1.className = "content-top";
  const span1_1 = document.createElement("span");
  span1_1.innerText = nick;
  const span1_2 = document.createElement("span");
  span1_2.innerText = date;
  div1_1.append(span1_1, span1_2);

  const div1_2 = document.createElement("div");
  div1_2.className = "content-middle";
  const span1_2_1 = document.createElement("span");
  span1_2_1.innerText = content;
  div1_2.append(span1_2_1);

  const div1_3 = document.createElement("div");
  div1_3.className = "comment-container";
  const div1_3_1 = document.createElement("div");
  div1_3_1.className = "submit-btn";
  div1_3_1.id = "comment-btn";
  const span1_3_1_1 = document.createElement("span");
  span1_3_1_1.innerText = "댓글 보기";
  div1_3_1.append(span1_3_1_1);

  div1_3_1.addEventListener("click", () => {
    location.href = `http://localhost:3000/detail.html?bid=${bid}`;
  });

  div1_3.append(div1_3_1);

  div1.append(div1_1, div1_2, div1_3);

  if (sort === "ASC") {
    document.getElementsByClassName("wrap-right-bottom")[0].prepend(div1);
  } else if (sort === "DESC") {
    document.getElementsByClassName("wrap-right-bottom")[0].append(div1);
  }
}

function getUserList(userId, pageIndex, limit, callback) {
  const xhr = new XMLHttpRequest();
  console.log(xhr.status);

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.status);
      const response = JSON.parse(xhr.responseText);
      if (response.content.length < 10) {
        isEnd = true;
      }
      response.content.forEach((element) => {
        makeBoard(
          element.bid,
          element.nick,
          getTime(element.date),
          element.content
        );
      });
      callback(response);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open(
    "GET",
    `http://localhost:3000/board/get/${userId}?page=${pageIndex}&count=${limit}`
  );
  xhr.send();
}

document.getElementById("desc-btn").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  const data = {
    userId: uid,
    content: document.getElementById("desc").value,
  };

  xhr.onload = () => {
    if (xhr.status === 201) {
      const response = JSON.parse(xhr.responseText);
      makeBoard(
        response.bid,
        sessionStorage.getItem("nick"),
        getTime(Date.now()),
        document.getElementById("desc").value,
        "ASC"
      );
      document.getElementById("desc").value = "";
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open("POST", "http://localhost:3000/board/write");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
});

function getTime(date) {
  const dt = new Date(date);
  const year = dt.getFullYear();
  const month = `0${dt.getMonth() + 1}`.slice(-2);
  const day = `0${dt.getDate()}`.slice(-2);
  const hh = `0${dt.getHours()}`.slice(-2);
  const mm = `0${dt.getMinutes()}`.slice(-2);

  // 입력 받은 시간의 UNIX Timestamp
  dt.getTime();

  // 현재 시간의 UNIX Timestamp
  const now = new Date();

  const pass = now.getTime() - dt.getTime();

  let val = "";
  switch (true) {
    case pass >= 31536000000:
      val = `${Math.floor(pass / 31536000000)}년 전`;
      break;

    case pass >= 2592000000:
      val = `${Math.floor(pass / 2592000000)}월 전`;
      break;

    case pass >= 86400000:
      val = `${Math.floor(pass / 86400000)}일 전`;
      break;

    case pass >= 60000:
      console.log(pass);
      val = `${Math.floor(pass / 60000)}분 전`;
      break;

    default:
      console.log("default");
      val = "0분 전";
      break;
  }

  return `${year}-${month}-${day} ${hh}:${mm} (${val})`;
}

const home = document.getElementById("home");
home.addEventListener("click", () => {
  location.href = "http://localhost:3000/main.html";
});

const profile = document.getElementById("profile");
profile.addEventListener("click", () => {
  location.href = `http://localhost:3000/profile.html?uid=${sessionStorage.getItem(
    "id"
  )}`;
});
