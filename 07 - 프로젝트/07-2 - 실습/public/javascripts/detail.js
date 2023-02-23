/* eslint-disable camelcase */
// [0]? [1]bid[0] = 38[1]
const url = location.search;
const bid = url.split("?")[1].split("=")[1];

let page = 0;
const count = 5;

sessionStorage.setItem("id", 3);
sessionStorage.setItem("name", "4");
sessionStorage.setItem("nick", "4");

getBoard(bid, () => {
  getComment(bid, (data) => {
    data.forEach((element) => {
      makeComment(
        element.cid,
        element.uid,
        element.nick,
        getTime(element.date),
        element.content
      );
    });
  });
});

document
  .getElementsByClassName("comment-more")[0]
  .addEventListener("click", () => {
    getComment(bid, (data) => {
      data.forEach((element) => {
        makeComment(
          element.cid,
          element.uid,
          element.nick,
          getTime(element.date),
          element.content
        );
      });
    });
  });

document.getElementById("comment-btn").addEventListener("click", () => {
  if (document.getElementById("comm").value.length) {
    const xhr = new XMLHttpRequest();
    const data = {
      userId: sessionStorage.getItem("id"),
      content: document.getElementById("comm").value,
      bid,
      // bid: bid와 같습니다.
    };

    xhr.onload = () => {
      if (xhr.status === 201) {
        // 동적 DOM 만들어서 추가
        document.getElementById("comm").value = "";
        const response = JSON.parse(xhr.responseText);
        makeComment(
          response.cid,
          sessionStorage.getItem("id"),
          sessionStorage.getItem("nick"),
          getTime(Date()),
          data.content,
          "ASC"
        );
      }
    };

    xhr.onerror = () => {
      console.error(xhr.responseText);
    };

    xhr.open("POST", "http://localhost:3000/comment/write");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  }
});

function getComment(boardId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      if (response.content.length < 5) {
        document.getElementsByClassName("comment-more")[0].style.display =
          "none";
      }
      page += 1;
      callback(response.content);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open(
    "GET",
    `http://localhost:3000/comment/get/${boardId}?page=${page}&count=${count}`
  );
  xhr.send();
}

function makeComment(cid, uid, nick, date, content, sort = "DESC") {
  const div1 = document.createElement("div");
  div1.className = "comment-wrap";

  const div1_1 = document.createElement("div");
  div1_1.className = "comment-first";
  const div1_1_1 = document.createElement("div");
  div1_1_1.className = "comment-first-left";
  const span1_1_1_1 = document.createElement("span");
  span1_1_1_1.innerText = nick;
  const span1_1_1_2 = document.createElement("span");
  span1_1_1_2.innerText = date;
  div1_1_1.append(span1_1_1_1, span1_1_1_2);
  div1_1.append(div1_1_1);

  if (Number(uid) === Number(sessionStorage.getItem("id"))) {
    const div1_1_2 = document.createElement("div");
    div1_1_2.className = "comment-first-right";
    const span1_1_2_1 = document.createElement("span");
    span1_1_2_1.innerText = "수정";
    const span1_1_2_2 = document.createElement("span");
    span1_1_2_2.innerText = "삭제";
    div1_1_2.append(span1_1_2_1, span1_1_2_2);
    div1_1.append(div1_1_2);

    const newSpan1 = document.createElement("span");
    newSpan1.innerText = "확인";
    const newSpan2 = document.createElement("span");
    newSpan2.innerText = "취소";
    const newInput = document.createElement("input");
    newInput.type = "text";

    span1_1_2_1.addEventListener("click", () => {
      span1_1_2_1.style.display = "none";
      span1_1_2_2.style.display = "none";
      span1_2_1.style.display = "none";
      newInput.value = span1_2_1.innerText;
      div1_2.append(newInput);
      div1_1_2.append(newSpan1, newSpan2);
    });

    newSpan1.addEventListener("click", () => {
      const xhr = new XMLHttpRequest();
      const data = {
        userId: uid,
        content: newInput.value,
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          span1_1_2_1.style.display = "block";
          span1_1_2_2.style.display = "block";
          span1_2_1.style.display = "block";
          span1_2_1.innerText = newInput.value;
          newInput.remove();
          newSpan1.remove();
          newSpan2.remove();
        }
      };

      xhr.onerror = () => {
        console.error(xhr.response);
      };

      xhr.open("PUT", `http://localhost:3000/comment/fix/${cid}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    });

    newSpan2.addEventListener("click", () => {
      span1_1_2_1.style.display = "block";
      span1_1_2_2.style.display = "block";
      span1_2_1.style.display = "block";
      newInput.remove();
      newSpan1.remove();
      newSpan2.remove();
    });

    span1_1_2_2.addEventListener("click", () => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status === 200) {
          div1.remove();
        }
      };

      xhr.onerror = () => {
        console.error(xhr.responseText);
      };

      xhr.open(
        "DELETE",
        `http://localhost:3000/comment/delete/${cid}?uid=${uid}`
      );
      xhr.send();
    });
  }

  const div1_2 = document.createElement("div");
  div1_2.className = "comment-second";
  const span1_2_1 = document.createElement("span");
  span1_2_1.innerText = content;
  div1_2.append(span1_2_1);

  div1.append(div1_1, div1_2);

  if (sort === "ASC") {
    document.getElementsByClassName("comment-box")[0].prepend(div1);
  } else if (sort === "DESC") {
    document.getElementsByClassName("comment-box")[0].append(div1);
  }
}

function getBoard(boardId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      document.getElementById("nick").innerText = response.nick;
      document.getElementById("date").innerText = getTime(response.date);
      document.getElementById("content").innerText = response.content;
      callback();
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open("GET", `http://localhost:3000/board/get/board/${boardId}`);
  xhr.send();
}

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

    case pass >= 3600000:
      val = `${Math.floor(pass / 3600000)}시간 전`;
      break;

    case pass >= 60000:
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
