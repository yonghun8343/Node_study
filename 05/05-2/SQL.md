# SQL

이번 장에서는 SQL을 이용하여 사용자를 생성하고, CURD를 기본적으로 다뤄 보려 합니다.

쿼리문 연습은 아래의 그림의 큰틀에서 부터 세부 내용까지 들어갑니다.
![DB](../05-1/Frame%209.png)

우선 사용자를 생성하여 MySQL Workbench라는 프로그램을 설치하기 전 까지는 PowerShell에서 기본적으로 작업 합니다.

맥이나 리눅스에서는 터미널에서 다음과 같이 입력을 해 줍니다.

```bash
mysql -uroot -p
mariadb -uroot -p
// mariadb를 설치 해도 mysql이라고 하면 mariadb가 실행이 됩니다.
// -u : user의 이름
// -p : 비밀번호를 입력
```

윈도우에서는 터미널에서 위와 같이 명령어를 입력하여도 실행할 수 있는 프로그램으로 인식이 되지 않습니다. 그래서 mysql과 mariadb는 이를 대체할 터미널을 별도로 설치를 진행하였습니다. 윈도우키를 누르고 mysql 을 검색하면 Mysql Client(Mariadb 버전)이 나옵니다.

해당 프로그램을 실행시키면 비밀번호를 입력하라고 나오는데 이전 장에서 설치 할 때 사용 했던 비밀번호인 root를 입력해서 들어갑니다.

자 이제 mariadb에 접근을 완료하였습니다. 이제 사용자 계정을 생성하고 CURD를 해 봅시다.

---

## 데이터베이스 관련 쿼리

### 데이터베이스 확인

```SQL
show databases;
```

### 데이터베이스 생성

```SQL
CREATE DATABASE DB명
```

저희 실습에서는 hscampus로 하여 데이터베이스를 만들겠습니다.

### 데이터베이스 선택

show databases 명령을 통해 보았을 때 기본적으로도 설치가 되는 여러 데이터베이스가 있습니다. 하지만 쿼리를 그냥 지정 해 주었을 때에는 어느 데이터베이스에 작업을 할 것인지 불분명 하기 때문에 내가 사용할 데이터베이스를 선택 해합니다. 선택하는 쿼리는 다음과 같습니다.

```SQL
use hscampus;
```

## 사용자 관련 쿼리

### 사용자 목록 보기

```SQL
SELECT * from mysql.user; // 해당 커맨드는 모든 정보를 보는 것이고, 일반적으로는 User와 Host를 조회합니다.
SELECT User, Host FROM mysql.user;
```

### 사용자 추가하기

사용자 추가하기의 기본적인 사용 방법은 다음과 같습니다.

```SQL
CREATE USER '계정'@'접근 허용 방법' IDENTIFIED BY '비밀번호';

만약 hun이라는 계정은 localhost에서만 접근이 가능하게 한다면
CREATE USER 'hun'@'localhost' IDENTIFIED BY '비밀번호';

hun 계정이 어디서나 접근이 가능하게 한다면
CREATE USER 'hun'@'%' IDENTIFIED BY '비밀번호';

hun 계정이 특정 아이피에서만 접근이 가능하다면
CREATE USER 'hun'@'특정 아이피' IDENTIFIED BY '비밀번호';
```

우리 실습에서는 사용자 명은 user로 진행하며 비밀번호 또한 user, 접근은 어디서나 가능하도록 합니다.

```SQL
CREATE USER 'user'@'%' IDENTIFIED BY 'user';

// 생성을 완료 한 뒤 잘 생성되었는지 확인

SELECT User, Host FROM mysql.user;
```

### 권한 부여하기

생성한 사용자는 기본적으로 권한을 가지고 있지 않습니다. 그러므로 추가 권한을 부여 해야합니다. 여기서는 모든 권한을 다 주도록 하겠습니다.

```SQL
GRANT ALL PRIVILEGES ON 'DB명'.* TO '사용자'@'접근';

ex) GRANT ALL PRIVILEGES ON hscampus.* TO 'user'@'%';

```

## 테이블 관련 쿼리

### 테이블을 생성하기 전 참고

서비스가 오픈하고 나서 테이블을 변경하는 것은 매우 까다롭습니다. 이미 서비스에서 조회하고 있는 값이 있고, 해당 값을 삭제하거나 컬럼 명을 수정하게 되면 서비스에 있는 코드도 전부 수정을 해 주어야합니다. 그러므로 테이블을 생성할 때 부터 조심해서 생성 해야합니다.

### 테이블 목록 확인하기

```SQL
show tables;
```

### 테이블 상세 정보 확인하기

```SQL
desc 테이블 명;
show columns from 테이블 명;

더 자세한 정보 조회
show full columns from 테이블 명;
ex) desc user;
```

### 테이블 생성하기

```SQL
기본형
CREATE [OR REPLACE] [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
    (create_definition,...) [table_options    ]... [partition_options]
```

예시로 사용자 테이블 만드는 쿼리문은 다음과 같습니다.

```SQL
CREATE TABLE IF NOT EXISTS `user`(
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(25) NOT NULL,
  `gender` TINYINT(1) NOT NULL,
  `phon` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`)
)
COLLATE=utf8_general_ci
ENGINE=InnoDB;
```

테이블 생성 구문에 들어간 DB의 자료형은 다음 장을 참고 해 주세요.

### 테이블 수정

- 열 추가하기

```SQL
하나 추가하기
ALTER TABLE 테이블 명 ADD 컬럼 명 타입;

여러개 추가하기
ALTER TABLE 테이블 명 ADD (컬럼 명 타입, 컬럼 명 타입...);

ex) ALTER TABLE user ADD nick_name VARCHAR(255);
```

- 열 순서 변경하기

```SQL
ALTER TABLE 테이블 명 MODIFY 컬럼 명 타입 [FIRST, AFTER (앞에 올 컬럼)]

ex) ALTER TABLE user MODIFY nick_name VARCHAR(255) FIRST;

ALTER TABLE user MODIFY nick_name VARCHAR(255) AFTER user_name;
```

- 열 이름 변경하기, 타입 변경

변경할 타입이 없어도 기존 타입으로 입력 해 주어야 합니다.

```SQL
ALTER TABLE 테이블 명 CHANGE 기존 컬럼 명 바꿀 컬럼 명 변경 할 타입

ex) ALTER TABLE user CHANGE nick_name nickName VARCHAR(255);
```

- 열 삭제하기

```SQL
ALTER TABLE 테이블 명 DROP 컬럼 명;

ex) ALTER TABLE user DROP nickName;
```

## CRUD 쿼리

| 이름   | 조작 | SQL    |
| ------ | ---- | ------ |
| Create | 생성 | INSERT |
| Read   | 읽기 | SELECT |
| Update | 갱신 | UPDATE |
| Delete | 삭제 | DELETE |

### Create(생성) 쿼리

CREATE는 MariaDB에서 INSERT로 명령어를 입력합니다.

```SQL
INSERT INTO 테이블 명
(컬럼1, 컬럼2, ...)
VALUES (값1, 값2, ...), ...;

ex) INSERT INTO user
(user_name, gender, phon)
VALUES ('hun', '1', '01012341234');
```

### Read(읽기) 쿼리

```SQL
SELECT 컬럼명, 컬럼명, ...
FROM 테이블 명
WHERE 조건;

ex) SELECT user_id, user_name, gender, phon
FROM user
WHERE user_id = 1;
```

위의 예제에서 조건의 부분은 AND가 될 수도 있고 OR이 될 수 있으며 조회할 때 오름차순, 내림차순, 혹은 위치 범위를 지정 할 수 있습니다.

조건이 없을 경우 모든 데이터를 조회합니다. 데이터가 많으면 많을 수록 좋지 않습니다.

```SQL
SELECT *
FROM 테이블 명;
테이블에 있는 모든 정보를 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE (조건1) AND (조건2);
조건1과 조건2를 모두 만족하는 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE 컬럼 명 BETWEEN 조건1 AND 조건2
해당 컬럼의 조건1과 조건2 사이에 있는 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE 조건1 OR 조건2
조건1과 조건2 중 하나라도 충족하는 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE 컬럼 명 IN (조건1, 조건2, ...)
속성의 값이 조건1이거나 조건2 등 괄호 안에 있는 값을 충족하는 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE NOT 조건1;
테이블에서 조건1을 만족하지 않는 모든 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE 컬럼1 LIKE `A_`;
컬럼의 값 중 A + 1글자 값을 가진 모든 행을 조회합니다. `A__`이면 A + 2글자 입니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE 컬럼1 LIKE `A%`;
컬럼의 값 중 A로 시작하는 모든 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE 컬럼1 LIKE `%A`;
컬럼의 값 중 A로 끝나는 모든 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
WHERE 컬럼1 LIKE `%A%`;
컬럼의 값 중 A를 포함하는 모든 행을 조회합니다.

SELECT 컬럼1, 컬럼2, ...
FROM 테이블 명
ORDER BY 컬럼 명 순서
컬럼의 값의 순서에 따라 모든 행을 조회합니다. 순서에는 DESC(내림차순) 또는 ASC(오름차순)을 입력할 수 있고 default는 ASC입니다.

SELECT 컬럼1 AS 별명1, 컬럼2 AS 별명2 FROM 테이블 명
조회 하려는 컬럼에 as를 붙혀주어 별명을 가지고 조회 할 수 있습니다.
```

### Update(갱신) 쿼리

UPDATE 문을 사용하여 내용을 수정 할 수 있습니다. 여기서 주의 해야 할 것은 WHERE 조건을 만족하는 모든 값을 수정합니다. 만약 WHERE가 없을 경우 테이블에 저장된 모든 데이터가 일괄 수정 됩니다.

```SQL
UPDATE 테이블 명
SET
  컬럼1 = 값1,
  컬럼2 = 값2,
  ...
WHERE 조건;
```

### Delete(삭제) 쿼리

DELETE도 UPDATE와 마찬가지로 조건을 만족하는 모든 값을 삭제합니다. 만약 DELETE가 없을 경우 테이블에 저장된 모든 데이터가 일괄 삭제 됩니다.

```SQL
DELETE
FROM 테이블 명
WHERE 조건
```
