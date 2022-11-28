// 일반적으로 변수에 값을 할당 하는 방법
const name = "hun";
const phon = "010-1234-1234";
const live = "pusan";
const age = 92;

// obj의 기본 형태
const obj = {
  Key: "Value",
};

// 변수 이외에 obj에 값을 할당하는 방법
const hun = {
  name: "hun",
  phon: "010-1234-1234",
  live: "pusan",
  age: 92,
};

// obj에 여러개의 Key값을 두어 확장 할 수 있고
// key와 value로 function 즉 함수를 둘 수 있다.
const user = {
  hun: {
    name: "hun",
    phon: "010-1234-1234",
    live: "pusan",
    age: 92,
    getAge: function () {
      return user.hun.age;
    },
  },
  han: {
    name: "han",
    phon: "010-1234-1234",
    live: "pusan",
    age: 92,
  },
};

// 둘 다 타입이 object인 것을 알 수 있다.
// 즉 우리가 썻던 windows, document는 obj이다!
typeof user;
typeof windows;

// windows도 대충 이런식으로 구성이 되어있다.
// 하지만 이를 구성하는 것은 브라우저에서 구현 하여 주기 때문에 정확한 파라미터와 리턴값은 찾아보아야한다.
const windows = {
  0: {
    AF_dataServiceRequests: 1,
  },
};

const documents = {
  getElementById: function () {
    return "getElementById";
  },
  createElementById: function () {
    return "createElementById";
  },
};

// 아래의 예시처럼 우리가 코드를 가지고 있지 않는 이상
// 매개변수를 알 수 없다.
const user = {
  plusAge: function (age) {
    if (age === undefined) {
      return new Error("age가 없습니다.");
    }
    return age;
  },
};

// obj안에 배열도 넣을 수 있다.
const user = {
  count: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
};

// 배열을 부르는 방법
used[0];

// 이것과 비슷한 것을 우리는 써 왔습니다.
// 즉 object에서 해당 함수는 Array를 반환합니다.
document.getElementsByClassName("클래스 명")[0];

// express의 req는 아래처럼 되어있다.
// 즉 obj인 것이다.
const IncomingMessage = {
  _readableState: {},
  params: {},
  body: {},
};
