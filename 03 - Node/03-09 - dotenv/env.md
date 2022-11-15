# .env

process.env에 환경 변수를 넣는 것은 새로운 서버가 생성 될 때 마다 사람이 넣도록 하는것은 매우 효율적이지 않습니다.

그러므로 환경변수에 넣을 것들을 코드화 해서 서버에 코드를 올리기만 해도 환경변수가 알아서 설정이 되고 올라간다면 매우 효율적이 되겠지요.

그래서 나온것이 .env입니다.

해당 패키지는 [링크](https://www.npmjs.com/package/dotenv) 를 참고 해 주세요.

## 설치

npm에 있는 패키지인 만큼 설치하기 매우 쉽습니다.

```bash
npm i dotenv --save
```

## 사용법

사용 방법은 우리가 작업하는 폴더의 최상위에 .env라는 파일을 만들어 줍니다. 그리고 우리가 데이터베이스에서 설정했던 값들을 아래와 같이 넣어줍니다.

```text
host="localhost"
user="user"
password="users"
port="3306"
database="hscampus"
connectionLimit=5
```

참고로 "="의 양 옆에는 공백이 들어가지 않습니다.

문자형일 경우에는 ""(큰따옴표)를 넣어주시고 숫자형일 경우에는 숫자를 넣어 줍니다.

그리고 서버를 구동시키는 코드에 아래의 내용을 추가 해 줍니다.

```javascript
require("dotenv").config();
```

그러면 우리는 dotenv를 사용할 준비가 끝이 났습니다.

이제 실제 우리가 적용했던 데이터베이스 설정에 해당 내용을 넣어 보겠습니다.

아래의 예제는 createConnection을 바탕으로 작성 되었습니다.

```javascript
const mariadb = require("mariadb/callback");
const conn = mariadb.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  database: process.env.database,
});

conn.query(`쿼리문`, (err, rows) => {
  console.log(err);
  console.log(rows);
});
```

## 그런데 잠깐

우리가 .env를 쓰는 이유가 깃허브에 올라갔을 때 파일 안에 서버나 데이터베이스의 정보 같은 민감한 정보들을 가려주기 위해서 사용한다고 했습니다. 하지만 .env파일은 깃허브에 안올라갈까요...?

답은 "올라간다." 입니다. 그러면 어떻게 해야 올라가지 않을 수 있을까요?

그것은 .gitignore에 .env라고 내용을 추가 해 주면 깃허브에 .env파일은 올라가지 않습니다.

기왕 한 김에 우리가 mac에서 작업한 것을 올렸을 때 DS_Store가 올라간 것을 볼 수 있습니다. 이런 것 까지 내가 매번 복사 붙여넣기 할 수 없으니 편하게 하는 방법에 대해서 소개 해 드리겠습니다.

우선 vscode extension에서 gitignore generator를 검색하면 상위에 나오는 gitignore가 아닌 작성일 기준 5K정도 다운 받은 gitignore generator를 install하겠습니다.

설치가 완료되고 Ctrl(cmd) + Shift + P 를 눌러주시고 generate를 입력 해 주시면 아래의 이미지와 같은 상태가 됩니다.

![제목없음17](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C17.png)

여기서 엔터를 쳐 주시고 특정OS나 개발 환경에 따라서 gitignore를 할 것을 선택 하면 됩니다.

저는 여기서 windows, visualstudiocode, node, macos를 선택하고 검색창 우측에 OK를 눌러주시면 생성이 완료됩니다.

그러면 이제 .env파일은 깃허브에 올라가지 않게 됩니다.
