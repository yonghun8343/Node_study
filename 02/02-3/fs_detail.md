# 파일 시스템 접근하기

이전 장에서 실습 해 보았다 싶이 fs모듈은 파일시스템에 접근하는 모듈 입니다. 이전 장에서 실습 해 본 readFile이외에 다른 함수들에 대해서 이번 장에서 실습을 해 보려 합니다.

## writeFile

Node에서 제공하는 fs는 파일을 작성 할 수 있습니다.

writeFile의 기본형은 다음과 같습니다.

```javascript
fs.writeFile(file, data[, options], callback)

file : 파일 이름
data : 데이터
options
  encoding : 인코딩 default는 'utf8'
callback
  err : 에러가 발생 시 입력됨
```

```javascript
const fs = require("fs");

fs.writeFile("./write.txt", "가나다라", (err) => {
  if (err) {
    throw err;
  }
  console.log("The file has been saved!");
});
```

이제 현재 폴더에 write.txt가 생성 되었고, 내용으로는 "가나다라"가 들어갔습니다.

---

## 동기 메소드, 비동기 메소드

Node에서 설명 드릴 때 블록킹과 논 블록킹에 대해서 어느정도 설명을 했었습니다. 이번에는 동기와 비동기에 대해서 잠시 설명을 드리려 하는데, 해당 부분에 대한 내용은 어렵고 처음에는 이해하기 힘듭니다. 하지만 이 부분에 대한 내용도 중요하기 때문에 간단하게 설명하고 넘어 가려 합니다.

동기와 비동기는 함수가 바로 결과값을 주는지, 주지 않는지를 생각 하면 됩니다.
블로킹과 논 블로킹은 결과값을 받는 함수가 계속 기다리는지 안기다리는지 생각하면 됩니다.

예를들어 아래의 4가지 경우를 생각 해 봅시다.

- 동기 + 블로킹

  손님 : 짜장면 한그릇이요

  주인 : 짜장면 만드는 중

  손님 : 짜장면 만드는 모습을 구경중 나올 때 까지 자리로 안 감

- 동기 + 논 블로킹

  손님 : 짜장면 한그릇이요

  주인 : 짜장면 만드는 중

  손님 : 짜장면 다 만들었나요?

  손님 : 짜장면 다 만들었나요?

  손님 : 짜장면 다 만들었나요?

  손님 : 짜장면 다 만들었나요?

- 비동기 + 블로킹

  손님 : 짜장면 한그릇이요

  주인 : 짜장면 만드는 중

  손님 : 멍 때리고 있음. 자리로 안 감

- 비동기 + 논 블로킹

  손님 : 짜장면 한그릇이요

  주인 : 짜장면 만드는 중

  손님 : 유투브 봄

  주인 : 다 되었습니다.

동기와 비동기, 블록킹과 논블록킹에 대한 예시는 위와 같고 자바스크립트는 기본적으로 논 블록킹입니다.

그러므로 동기 + 논블록킹과 비동기 + 논블록킹일 때를 생각 해 보면

동기 + 논블록킹은 계속 다 되었는지 물어 보지만 재촉 결과 짜장면이 나온다면 그 때 부터 바로 먹을 수 있겠지요

비동기 + 논블록킹은 짜장면이 나올 때 까지 자기가 다른 일을 처리를 한다고 생각 하면 됩니다.

그러므로 우리가 쓰는 readFile, writeFile은 비동기 + 논블록킹이기 때문에 다른일이 처리가 됩니다.

그러므로 동기 + 논블록킹으로 처리를 해야 할 때가 있습니다.

왜 그런지는 아래의 예시를 통해서 알아 봅시다.

```javascript
const fs = require("fs");

console.log("시작");

fs.readFile("./readme.txt", (err, data) => {
  if (err) throw err;
  console.log(`1번 ${data.toString()}`);
});
fs.readFile("./readme.txt", (err, data) => {
  if (err) throw err;
  console.log(`2번 ${data.toString()}`);
});
fs.readFile("./readme.txt", (err, data) => {
  if (err) throw err;
  console.log(`3번 ${data.toString()}`);
});

console.log("끝");
```

결과는 할 때 마다 끝나는 순서가 다릅니다.

그러므로 비동기 + 논블록킹에서 원하는대로 1,2,3번 순서로 가려면 아래와 같이 해야합니다.

```javascript
const fs = require("fs");

console.log("시작");

fs.readFile("./readme.txt", (err, data) => {
  if (err) throw err;
  console.log(`1번 ${data.toString()}`);
  fs.readFile("./readme.txt", (err, data) => {
    if (err) throw err;
    console.log(`2번 ${data.toString()}`);
    fs.readFile("./readme.txt", (err, data) => {
      if (err) throw err;
      console.log(`3번 ${data.toString()}`);
    });
  });
});

console.log("끝");
```

위의 코드 처럼 콜백은 동작이 끝났을 때 불러오는 함수이기 때문에 차례차례 실행이 되는 것을 볼 수 있습니다.

하지만 우리는 소위 "콜백지옥(callback hell)"에 빠지게 되었지요.

이러한 상황을 막기 위해서 추후에 설명할 Promise나 Await/Async를 이용 하지만 Node에서는 fs에 동기 메소드를 제공 해 줍니다.

## readFileSync(), writeFileSync()

sync 어디서 많이 보았듯이 synchronous의 앞 4글자를 가지고 온것 입니다.

즉 파일을 읽는것을 동기로 수행한다는 뜻이므로 동기로 파일을 읽고 쓰는 것이 필요하면 readFileSync(), writeFileSync()를 사용 해야합니다.

readFileSync의 기본형은 다음과 같습니다.

```javascript
fs.readFileSync(path[, options])

path <string> | <Buffer> | <URL> | <integer> 파일 명
options <Object> | <string>
  encoding <string> | <null> 인코딩 Default: null
  flag <string> 파일 시스템 플래그를 지정 Default: 'r'.
Returns: <string> | <Buffer>
```

예제는 다음과 같습니다.

```javascript
const fs = require("fs");

console.log("시작");
let data = fs.readFileSync("./readme.txt");
console.log(`1번 ${data.toString()}`);
data = fs.readFileSync("./readme.txt");
console.log(`2번 ${data.toString()}`);
data = fs.readFileSync("./readme.txt");
console.log(`3번 ${data.toString()}`);
```

위의 예제대로 하면 data에 각각 readFileSync가 호출이 될 때 마다 새로운 데이터가 들어가고 콘솔에 출력이 됩니다.

여기서는 기존의 readFile과 다른 부분이 콜백함수가 없습니다. 이는 동기로 동작하기 때문에 계속 체크를 해서 끝나고 나서의 동작은 그냥 해당 함수 밑에 작성하면 되기 때문이지요.

## 기타 fs 메소드

| 함수                                    | 설명                                                                                                                                                                                  |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fs.access(path, option, callback)       | 폴더나 파일에 접근 할 수 있는지 체크 합니다. 폴더나 파일이 없을 경우 에러 코드는 ENOENT입니다.                                                                                        |
| fs.mkdir(path, callback)                | 폴더를 만드는 메소드입니다.                                                                                                                                                           |
| fs.open(path, option, callback)         | 파일의 아이디(fd)를 가져오는 메소드입니다. 파일이 없다면 파일을 생성한 뒤 아이디를 가지고 옵니다. 옵션으로는 r일 경우 읽기 옵션, w일 경우 쓰기 옵션, a일 경우 기존 파일에 추가입니다. |
| fs.rename(기존 경로, 새 path, callback) | 파일 이름을 바꾸는 메소드 입니다. 기조 파일위치와 새로운 파일 위치를 적어줍니다.                                                                                                      |

```javascript
const fs = require("fs");

fs.access("./folder", (err) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.log("폴더가 없습니다.");
      fs.mkdir("./folder", (err) => {
        if (err) throw err;
        console.log("폴더가 생성 되었습니다.");
        fs.open("./folder/afile.js", "w", (err, fd) => {
          if (err) throw err;
          console.log(`빈 파일이 생성 되었습니다. ${fd}`);

          fs.rename("./folder/afile.js", "./folder/bfile.js", (err) => {
            if (err) throw err;
            console.log("이름이 바뀌었습니다.");
          });
        });
      });
    } else {
      throw err;
    }
  } else {
    console.log("존재합니다.");
  }
});
```

---

| 함수                       | 설명                                                                                     |
| :------------------------- | :--------------------------------------------------------------------------------------- |
| fs.readdir(path, callback) | 폴더 안의 파일을 확인 할 수 있습니다.                                                    |
| fs.unlink(path, callback)  | 파일을 삭제 할 수 있습니다. 파일이 없을 시 에러가 발생합니다.                            |
| fs.rmdir(path, callback)   | 폴더를 삭제합니다. 폴더 안에 파일이 있을 경우 에러가 발생해 파일 먼저 지워 주셔야합니다. |

```javascript
const fs = require("fs");

fs.readdir("./folder", (err, dir) => {
  if (err) throw err;
  console.log(`폴더 내용 : ${dir}`);
  fs.unlink("./folder/bfile.js", (err) => {
    if (err) throw err;
    console.log("파일 삭제");
    fs.rmdir("./folder", (err) => {
      if (err) throw err;
      console.log("폴더 삭제");
    });
  });
});
```
