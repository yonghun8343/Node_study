# Mariadb

이전 장에서 설치를 마치고 routes/users.js에서 작업을 진행 합니다.

데이터베이스와의 연결을 위해 아래와 같이 코드를 입력 해 주세요. 기존 코드에 섞어서 작업 합니다.

Connection을 만드는 방법에는 두가지가 있습니다.

두가지 모두 장단점이 있기 때문에 두 방법 모두 실습 해 보겠습니다.

## createConnection(options)

createConnection은 데이터베이스에 질의를 던지기 위해 쿼리문이 필요할 때 마다 연결을 맺고 질의를 던지게 됩니다.

이 때 사용량이 많지 않은 서버일 경우에는 간단하게 연결만 맺고 끊어 별도의 추가 리소스가 필요 없는 장점이 있으나 사용량이 많은 서버일 경우 연결을 맺는 과정에서 발생하는 리소스가 발생하여 오히려 속도가 느려집니다.

연결 시 옵션은 [링크](https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/callback-api.md#connection-options)를 참고 해 주세요.

```javascript
const mariadb = require("mariadb/callback");
const conn = mariadb.createConnection({
  host: "localhost",
  user: "user",
  password: "user",
  port: "3306",
  database: "hscampus",
});

conn.query(`쿼리문`, (err, rows) => {
  console.log(err);
  console.log(rows);
});
```

## createPool(options)

createPool은 데이터베이스와 미리 연결을 설정한 옵션의 수 만큼 유지 합니다.

매번 커넥션을 발생 시키는 것은 서버와 데이터베이스 둘 다 리소스를 발생시키지만, 서버에 pool을 생성하여 순차적으로 작업을 진행 시키면 데이터베이스는 동일한 리소스를 꾸준히 발생 시킬 수 있는 장점이 있습니다.

이는 서버는 확장이 가능하지만, 데이터베이스는 확장이 어려운 점이 있기 떄문에 서버의 리소스를 희생하자는 관점으로 봐 주면 될 것 같습니다.

연결 시 옵션은 [링크](https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/callback-api.md#pool-options)를 참고 해 주세요.

```javascript
const mariadb = require("mariadb/callback");
const poll = mariadb.createPool({
  host: "localhost",
  user: "user",
  password: "users",
  port: "3306",
  database: "hscampus",
  connectionLimit: 5,
});

poll.query(`쿼리문`, (err, results, metadata) => {
  console.log(err);
  console.log(results);
  console.log(metadata);
});
```

## 실습

1. 쿼리를 보내는 것을 통해 우리가 기존에 CLI로 조회 했던 값들을 받아 봅시다.
