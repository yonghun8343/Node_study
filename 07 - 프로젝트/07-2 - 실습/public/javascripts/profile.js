/* eslint-disable camelcase */
// [0]? [1]bid[0] = 38[1]
const url = location.search;
const uid = url.split("?")[1].split("=")[1];

let wpage = 0;
const wcount = 5;

let cpage = 0;
const ccount = 5;

sessionStorage.setItem("id", 3);
sessionStorage.setItem("name", "4");
sessionStorage.setItem("nick", "4");

function getProfile(userId, getId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      const nick = document.getElementById("nick");
      nick.innerText = response.info.nick;

      const follower = document.getElementById("follower-count");
      follower.innerText = new Intl.NumberFormat("ko-KR", {
        notation: "compact",
      }).format(Number(response.info.follower));

      const following = document.getElementById("following-count");
      following.innerText = new Intl.NumberFormat("en-US", {
        notation: "compact",
      }).format(Number(response.info.following));

      const folBtn = document.getElementsByClassName("profile-content-btn")[0];
      const folSpan = document.getElementsByClassName("profile-content-btn")[0]
        .children[0];
      if (uid === getId) {
        folBtn.style.display = "none";
      }
      if (response.isFollow === true) {
        folSpan.innerText = "팔로우 중";
        folBtn.addEventListener("click", unfollow);
      } else {
        folSpan.innerText = "팔로우";
        folBtn.addEventListener("click", follow);
      }

      callback();
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open("GET", `http://localhost:3000/profile/get/${uid}?getId=${getId}`);
  xhr.send();
}

function follow() {
  console.log("follow");
  const xhr2 = new XMLHttpRequest();
  const data = {
    follower: uid,
    following: sessionStorage.getItem("id"),
  };

  xhr2.onload = () => {
    if (xhr2.status === 200) {
      const folBtn = document.getElementsByClassName("profile-content-btn")[0];
      folBtn.removeEventListener("click", follow);
      folBtn.addEventListener("click", unfollow);
      const folSpan = document.getElementsByClassName("profile-content-btn")[0]
        .children[0];
      folSpan.innerText = "팔로우 중";
    }
  };

  xhr2.onerror = () => {
    console.error(xhr2.responseText);
  };

  xhr2.open("POST", `http://localhost:3000/profile/follow`);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.send(JSON.stringify(data));
}

function unfollow() {
  console.log("unfollow");
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const folBtn = document.getElementsByClassName("profile-content-btn")[0];
    folBtn.removeEventListener("click", unfollow);
    folBtn.addEventListener("click", follow);
    const folSpan = document.getElementsByClassName("profile-content-btn")[0]
      .children[0];
    folSpan.innerText = "팔로우";
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open(
    "DELETE",
    `http://localhost:3000/profile/unfollow?follower=${uid}&following=${sessionStorage.getItem(
      "id"
    )}`
  );
  xhr.send();
}

function getWriteCount(userId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open("GET", `http://localhost:3000/board/get/count/${uid}`);
  xhr.send();
}

function getCommCount(userId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open("GET", `http://localhost:3000/comment/get/count/${uid}`);
  xhr.send();
}

function getWrite(userId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      wpage += 1;
      callback(response);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open(
    "GET",
    `http://localhost:3000/board/get/${uid}?page=${wpage}&count=${wcount}`
  );
  xhr.send();
}

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
    document.getElementsByClassName("profile-bottom")[0].prepend(div1);
  } else if (sort === "DESC") {
    document.getElementsByClassName("profile-bottom")[0].append(div1);
  }
}

function getComm(userId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      cpage += 1;
      callback(response);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open("GET", `http://localhost:3000/comment/get/user/${userId}`);
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

function makeComment(cid, userId, nick, date, content, sort = "DESC") {
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
    document.getElementsByClassName("profile-bottom")[0].prepend(div1);
  } else if (sort === "DESC") {
    document.getElementsByClassName("profile-bottom")[0].append(div1);
  }
}

let ferPage = 0;
const ferCount = 10;

function getFollower(userId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      ferPage += 1;
      callback(response);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open(
    "GET",
    `http://localhost:3000/profile/follower/${userId}?page=${ferPage}&count=${ferCount}`
  );
  xhr.send();
}

let fingPage = 0;
const fingCount = 10;
function getFollowing(userId, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      fingPage += 1;
      callback(response);
    }
  };

  xhr.onerror = () => {
    console.error(xhr.responseText);
  };

  xhr.open(
    "GET",
    `http://localhost:3000/profile/following/${userId}?page=${fingPage}&count=${fingCount}`
  );
  xhr.send();
}

function makeFollow(userId, nick, sort) {
  const div1 = document.createElement("div");
  div1.className = "follow-content";

  const div1_1 = document.createElement("div");
  div1_1.className = "follow-top";
  const span1_1 = document.createElement("span");
  span1_1.innerText = nick;

  div1_1.addEventListener("click", () => {
    location.href = `http://localhost:3000/profile.html?uid=${userId}`;
  });

  div1_1.append(span1_1);
  div1.append(div1_1);

  if (sort === "ASC") {
    document.getElementsByClassName("profile-bottom")[0].prepend(div1);
  } else if (sort === "DESC") {
    document.getElementsByClassName("profile-bottom")[0].append(div1);
  }
}

getProfile(sessionStorage.getItem("id"), sessionStorage.getItem("id"), () => {
  getWriteCount(uid, (response) => {
    const writeCount = document.getElementById("write-count");
    writeCount.innerText = new Intl.NumberFormat("en-US", {
      notation: "compact",
    }).format(Number(response.count));
    getCommCount(uid, (response2) => {
      const commCount = document.getElementById("comm-count");
      commCount.innerText = new Intl.NumberFormat("en-US", {
        notation: "compact",
      }).format(Number(response2.count));
    });
  });
});

const write = document.getElementById("write");
write.addEventListener("click", () => {
  wpage = 0;
  const bottom = document.getElementsByClassName("profile-bottom")[0];
  for (let i = bottom.children.length; i > 0; i -= 1) {
    bottom.children[0].remove();
  }
  getWrite(uid, (response) => {
    response.content.forEach((element) => {
      makeBoard(
        element.bid,
        element.nick,
        getTime(element.date),
        element.content
      );
    });
  });
});

const comm = document.getElementById("comm");
comm.addEventListener("click", () => {
  cpage = 0;
  const bottom = document.getElementsByClassName("profile-bottom")[0];
  for (let i = bottom.children.length; i > 0; i -= 1) {
    bottom.children[0].remove();
  }
  getComm(uid, (response) => {
    response.content.forEach((element) => {
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

const follower = document.getElementById("follower");
follower.addEventListener("click", () => {
  ferPage = 0;
  const bottom = document.getElementsByClassName("profile-bottom")[0];
  for (let i = bottom.children.length; i > 0; i -= 1) {
    bottom.children[0].remove();
  }
  getFollower(uid, (response) => {
    response.follower.forEach((element) => {
      makeFollow(element.u_id, element.u_nick, "DESC");
    });
  });
});

const following = document.getElementById("following");
following.addEventListener("click", () => {
  console.log("11");
  fingPage = 0;
  const bottom = document.getElementsByClassName("profile-bottom")[0];
  for (let i = bottom.children.length; i > 0; i -= 1) {
    bottom.children[0].remove();
  }
  getFollowing(uid, (response) => {
    console.log("22");
    response.following.forEach((element) => {
      console.log("333");
      makeFollow(element.u_id, element.u_nick, "DESC");
    });
  });
});

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
