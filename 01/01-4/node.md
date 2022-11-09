# Node 기본 명령어

## Global

Node에서는 전역으로 함수를 넣어 사용자의 편의성을 증진 시키는 객체가 있습니다. 이를 global으로 부르고, 웹에서도 페이지나 브라우저에 관련된 정보를 담고있는 global과 같다고 생각하시면 됩니다.

### Console

| 함수                                                                                                                                                                               | 설명                                                                                           |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| console.time(레이블)                                                                                                                                                               | console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정합니다. |
| console.log(내용)                                                                                                                                                                  | 일반적인 로그를 표시합니다.                                                                    |
| console.error(에러 내용)                                                                                                                                                           | 에러를 콘솔에 표시합니다.                                                                      |
| console.dir(객체, 옵션)                                                                                                                                                            | 객체를 콘솔에 표시할 때 사용합니다. 옵션에는 showHidden, depth, colors가 있습니다.             |
| console.trace(레이블)ㅣ 에러가 어디서 발생 했는지 추적 할 수 있게 해줍니다. 보통은 에러 발생 시 위치를 알려 주므로 자주 사용하지는 않지만, 위치가 나오지 않는다면 사용할만 합니다. |

아래의 코드는 위의 Console 예제입니다.

```javascript
const string = abd;
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: 'value
    }
  }
}
console.time("전체 시간");
console.log("평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.");
console.log(string, number, boolean);
console.error("에러 메시지는 console.error에 담아주세요");

console.dir(obj, {color: false, depth: 2});
console.dir(obj, {color: true, depth: 1});

console.time("시간 측정");
for (let i = 0; i < 100000; i++) {
  continue;
}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}
function a() {
  b();
}

console.timeEnd("전체 시간");
```

### Timer

타이머 기능을 제공하는 함수인 setTimeout, setInterval, setImmediate 중 setTimeout과 setInterval은 웹에서도 자주 쓰이는 함수 입니다.

| 함수                           | 설명                                                      |
| :----------------------------- | :-------------------------------------------------------- |
| setTimeout(콜백 함수, 밀리초)  | 주어진 밀리초(1000분의 1초) 이후에 콜백 함수를 실행합니다 |
| setInterval(콜백 함수, 밀리초) | 주어진 밀리초마다 콜백함수를 반복 실행합니다.             |
| setImmediate(콜백함수)         | 콜백함수를 즉시 실행합니다.                               |
| clearTimeout(아이디)           | setTimeout 을 취소합니다.                                 |
| clearInterval(아이디)          | setInterval을 취소합니다.                                 |
| clearImmediate(아이디)         | setImmediate를 취소합니다.                                |

아래의 코드는 위의 Timer 예제입니다.

```javascript
const timeout = setTimeout(() => {
  console.log("1.5초 후 실행");
}, 1500);

const interval = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

const timeout2 = setTimeout(() => {
  console.log("실행되지 않습니다.");
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log("즉시 실행");
});

const immediate2 = setImmediate(() => {
  console.log("실행되지 않습니다");
});

clearImmediate(immediate2);
```

### **filename, **dirname

노드에서는 파일 사이에 모듈 관계가 있는 경우가 있어 현재 ㅍ라일의 경로나 파일 명을 알아야 하는 경우가 있습니다. 노드는 **filename, **dirname이라는 키워드로 경로에 대한 정보를 제공 합니다.

```javascript
console.log(__filename);
console.log(__dirname);
```

## Process

초반에는 사용할 일이 잘 없지만 후반부에 Cluster와 같은 것들을 이용 할 때 알아야 하는 객체입니다. process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있습니다.

```javascript
console.log(process.version); // 설치된 노드의 버전입니다.
console.log(process.arch); // 프로세서 아키텍처 정보입니다. arm, ia32 등의 값일 수 있습니다.
console.log(process.platform); // 운영체제에 대한 정보입니다. linux나 darwin, frebsd 등의 값일 수 있습니다.

const { argv } = require('node:process'); // process.execPath에서 각 경로를 분할해서 제공 해 줍니다.

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

console.log(process.pid); // 현재 프로세스의 아이디입니다. 프로세스를 여러 개 가질 때 구분 할 수 있습니다.
console.log(proces.uptime()); // 프로세스가 시작된 후 흐른 시간입니다. 단위는 초 입니다.
console.log(process.execPath); // 노드의 경로입니다.
console.log(process.cwd()) // 현재 프로세스가 실행되는 위치입니다.
console.log(process.cpuUsage()); 현재 cpu 사용된 시간입니다.
```

이후 설명드릴 내용은 중요한 내용이기 때문에 별도로 설명합니다.

---

### process.env

process.env는 시스템에서 가지고 있는 환경 변수를 가지고 있습니다. 서비스의 중요한 키를 저장하는 공가능로도 사용 됩니다.

---

### process.exit()

노드에서 실행중인 프로세스를 종료할 때 사용됩니다. 추후 다중 프로세스를 이용 할 때 에러가 발생하거나 특정 경우에 사용 할 수 있습니다.

## os

웹 브라우저에서 사용되는 자바스크립트는 운영체제의 정보를 가져올 수 없지만, 노드는 os 모듈에 정보가 담겨 있어 정보를 가지고 올 수 있습니다.

process와 겹치는 부분도 있지만 조금 다른 부분도 있습니다.

| 함수          | 설명                                                                                        |
| :------------ | :------------------------------------------------------------------------------------------ |
| os.arch()     | process.arch와 동일합니다.                                                                  |
| os.platform() | process.platform과 동일합니다.                                                              |
| os.type()     | 운영체제의 종류를 보여줍니다.                                                               |
| os.uptime()   | 운영체제를 부팅 이후 흐른 시간(초)를 보여줍니다. process.uptime()은 노드의 실행 시간입니다. |
| os.hostname() | 컴퓨터의 이름을 보여줍니다.                                                                 |
| os.release()  | 운영체제의 버전을 보여줍니다.                                                               |
| os.homedir()  | 홈 디렉터리 경로를 보여줍니다.                                                              |
| os.tmpdir()   | 임시 파일 저장 경로를 보여줍니다.                                                           |
| os.cpus()     | 컴퓨터의 코어 정보를 보여줍니다.                                                            |
| os.freemem()  | 사용 가능한 메모리(RAM)를 보여줍니다.                                                       |
| os.totalmem() | 전체 메모리 용량을 보여줍니다.                                                              |

```javascript
const os = require("os");

console.log("운영체제 정보---------------------------------");
console.log("os.arch():", os.arch());
console.log("os.platform():", os.platform());
console.log("os.type():", os.type());
console.log("os.uptime():", os.uptime());
console.log("os.hostname():", os.hostname());
console.log("os.release():", os.release());

console.log("경로------------------------------------------");
console.log("os.homedir():", os.homedir());
console.log("os.tmpdir():", os.tmpdir());

console.log("cpu 정보--------------------------------------");
console.log("os.cpus():", os.cpus());
console.log("os.cpus().length:", os.cpus().length);

console.log("메모리 정보-----------------------------------");
console.log("os.freemem():", os.freemem());
console.log("os.totalmem():", os.totalmem());
```

## path

폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈입니다. path 모듈은 운영체제별로 경로 구분자가 다르기 때문에 사용합니다.

| 함수                                                                                                                                                   | 설명                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| path.sep                                                                                                                                               | 경로의 구분자입니다. Windows는 \, POSIX는 /입니다.                             |
| path.delimiter                                                                                                                                         | 환경 변수의 구분자입니다. Windows는 세미콜론(;)이고 POSIX는 콜론(:)입니다.     |
| path.dirname(경로)                                                                                                                                     | 파일이 위치한 폴더 경로를 보여줍니다.                                          |
| path.extname(경로)                                                                                                                                     | 파일의 확장자를 보여줍니다.                                                    |
| path.basename(경로, 확장자): 파일의 이름(확장자 포함)을 보여줍니다. 파일의 이름만 표시하고 싶다면 basename의 두번째 인자로 파일의 확장자를 넣어줍니다. |
| path.parse(경로)                                                                                                                                       | 파일 경로를 root, dir, base, ext, name으로 분리합니다.                         |
| path.format(객체)                                                                                                                                      | path.parse()한 객체를 파일 경로로 합칩니다.                                    |
| path.normalize(경로)                                                                                                                                   | /나 \를 실수로 여러번 사용 했거나 혼용 했을 떄 정상적인 경로로 변환 해 줍니다. |
| path.isAbsolute(경로)                                                                                                                                  | 파일의 경로가 절대경로인지 상대경로인지 true나 false로 알려 줍니다.            |
| path.relative(기준경로, 비교경로)                                                                                                                      | 경로를 두 개 넣으면 첫번째 경로에서 두번째 경로로 가는 방법을 알려줍니다.      |

```javascript
const path = require("path");

const string = __filename;

console.log("path.sep:", path.sep);
console.log("path.delimiter:", path.delimiter);
console.log("------------------------------");
console.log("path.dirname():", path.dirname(string));
console.log("path.extname():", path.extname(string));
console.log("path.basename():", path.basename(string));
console.log("path.basename():", path.basename(string, path.extname(string)));
console.log("------------------------------");
console.log("path.parse()", path.parse(string));
console.log(
  "path.format():",
  path.format({
    dir: "C:\\users\\hun",
    name: "path",
    ext: ".js",
  })
);
console.log("path.normalize():", path.normalize("C://users\\\\hun\\path.js"));
console.log("------------------------------");
console.log("path.isAbsolute():", path.isAbsolute("C:\\"));
console.log("path.isAbsolute():", path.isAbsolute("./home"));
console.log("------------------------------");
console.log(
  "path.relative():",
  path.relative("C:\\users\\hun\\path.js", "C:\\")
);
console.log(
  "path.join():",
  path.join(__dirname, "..", "..", "/users", ".", "/hun")
);
console.log(
  "path.resolve():",
  path.resolve(__dirname, "..", "users", ".", "/hun")
);
```

## crypto

암호화에는 단방향 암호화와 양방향 암호화가 있습니다.

### 단방향 암호화

단방향 암호화를 사용하면 원래 문자열을 찾을 수 없습니다.

| 함수                 | 설명                                                                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createHash(알고리즘) | 사용할 해시 알고리즘을 넣어줍니다. md5, sha1, sha256, sha512 등이 가능하지만 md5와 sha1은 이미 취약점이 발견되었습니다. 현재는 sha512로도 충분은 합니다. |
| update(문자열)       | 변홚랄 문자열을 넣어줍니다.                                                                                                                              |
| digest(인코딩)       | 인코딩할 알고리즘을 넣어줍니다. base64, hex, latin 1이 주로 사용되지만 그 중 base64가 결과 문자열이 가장 짧아 애용됩니다.                                |

```javascript
const crypto = require("crypto");

console.log(
  "base64:",
  crypto.createHash("sha512").update("비밀번호").digest("base64")
);
console.log(
  "hex:",
  crypto.createHash("sha512").update("비밀번호").digest("hex")
);
console.log(
  "base64:",
  crypto.createHash("sha512").update("다른 비밀번호").digest("base64")
);
```

기본적으로 제공해 주는것 이외에 pbkdf2나 bcrypt, scrypt라는 알고리즘으로 비밀번호를 암호화 하고 있습니다.

### 양방향 암호화

| 함수                                         | 설명                                                                                                                                                                                      |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| crypto.createCipher(알고리즘, 키)            | 암호화 알고리즘과 키를 넣어줍니다. 암호화 알고리즘은 aes-256-cbc를 사용했습니다. 다른 알고리즘을 사용해도 됩니다. 사용 가능한 알고리즘은 crypto.getCipgers()를 하면 볼 수 있습니다.       |
| cipher.update(문자열, 인코딩, 출력 인코딩)   | 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣어줍니다. 보통은 utf8 인코딩을, 암호는 base64를 많이 사용합니다.                                                                  |
| cipher.final(출력 인코딩)                    | 출력 결과물의 인코딩을 넣어주면 암호화가 완료됩니다.                                                                                                                                      |
| crypto.createDecipher(알고리즘, 키)          | 복호화할 때 사용합니다. 암호화 할 때 사용했던 알고리즘과 키를 그대로 넣어주어야합니다.                                                                                                    |
| decipher.update(문자열, 인코딩, 출력 인코딩) | 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣어줍니다. createCipher의 update()에서 utf8, base64순으로 넣었다면 createDecipher의 update()에서는 base64, utf8 순서로 넣으면 됩니다. |
| decipher.final(출력 인코딩)                  | 복호화 결과물의 인코딩을 넣어줍니다.                                                                                                                                                      |

```javascript
const crypto = require("crypto");

const cipher = crypto.createCipher("aes-256-cbc", "열쇠");
let result = cipher.update("암호화 할 문장", "utf8", "base64");
result += cipher.final("base64");
console.log("암호화:", result);

const decipher = crypto.createDecipher("aes-256-cbc", "열쇠");
let result2 = decipher.update(result, "base64", "utf8");
result2 += decipher.final("utf8");
console.log("복호화:", result2);
```

