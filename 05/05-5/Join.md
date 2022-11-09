# JOIN

데이터베이스에서 다른 테이블에서 정보를 가지고 올 수 있는 방법으로 JOIN이 있습니다.

예를들어 우리는 board 테이블을 만들 때 사용자에 대한 정보는 b_uid를 넣고 사용자의 아이디만을 Foreign Key로 묶어만 놓았습니다.

그렇다면 board 테이블에서 사용자 테이블에 있는 정보를 불러오기 위해서 Join을 해보는 연습을 해 보려 합니다.

## 조인의 종류

조인의 종류는 다음과 같이 7가지가 있습니다. 그 이상의 소위 FULL JOIN이라 불리우는 것은 UNION입니다.

![제목없음16](./%EC%A0%9C%EB%AA%A9%EC%97%86%EC%9D%8C16.png)

저희는 위의 JOIN에 대해서 별도로 진행하지 않고 일반적인 JOIN 즉 INNER JOIN을 이용해 보려 합니다. 위의 이미지는 그냥 7가지나 있었구나~ 라고 참고 해 주세요.

## 조인 쿼리

INNER JOIN 사용자가 쿼리문에서 JOIN으로만 입력하면 자동적으로 INNER JOIN이 된다.

기준 테이블과 조인 테이블의 중복된 값을 보여준다. A테이블과 B테이블이 모두 가지고 있는 데이터가 검색된다.

```SQL
// INNER JOIN
SELECT
  A.칼럼
  B.칼럼
FROM
  기준테이블 A INNER JOIN 조인테이블 B
  ON A.기준키 = B.기준키

// JOIN
SELECT
  A.칼럼
  B.칼럼
FROM
  기준테이블 A JOIN 조인테이블 B
  ON A.기준키 = B.기준키
```

board테이블에 데이터를 추가 하고 아래의 예제로 검색을 해 보자

```SQL
SELECT
  a.b_id,
  a.b_name,
  a.b_content,
  a.b_date,
  b.user_id,
  b.user_name
FROM
  board a JOIN user b ON a.b_uid = b.user_id
WHERE b.user_id = 1;
```

위의 쿼리문을 통해 게시판 테이블에 굳이 사용자 정보를 넣지 않더라도 사용자 테이블에서 작성자의 이름을 가지고 올 수 있게 된다.
