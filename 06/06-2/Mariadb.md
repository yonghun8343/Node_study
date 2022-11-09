# Mariadb

이전 장에서 설치를 마치고 routes/users.js에서 작업을 진행 합니다.

데이터베이스와의 연결을 위해 아래와 같이 코드를 입력 해 주세요. 기존 코드에 섞어서 작업 합니다.

연결 시 옵션은 [링크](https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/callback-api.md#connection-options)를 참고 해 주세요.

```javascript
const mariadb = require("mariadb");
const conn = mariadb.createPool({
  host: "localhost",
  user: "user",
  password: "users",
  port: "3306"
  connectionLimit: 5,
});

conn.query(`쿼리문`, (err, rows) => {
  console.log(rows)
})
```

---

# 실습

1. 쿼리를 보내는 것을 통해 우리가 기존에 CLI로 조회 했던 값들을 받아 봅시다.

2. 회원가입과 관련된 로직을 만들어 봅시다.
