# MySQL Workbench

저희가 지금까지는 CLI(Command-Line Interface)를 이용해서 데이터베이스를 조작 하였습니다. 하지만 Mysql에서는 이를 편하게 조작 할 수 있게 하기 위해 Mysql Workbench를 사용 해 왔습니다. 이를 fork하면서 Mariadb에서도 비슷한 기능을 가진 HeidiSQL을 출시 하였으나 국내에서는 Mysql Workbench를 주로 사용하기 때문에 간단한 사용법에 대해서 수업 하려 합니다.

## 설치하기

[링크](https://dev.mysql.com/downloads/workbench/)를 통해 mysql workbench를 설치 해 주세요

## MariaDB 연결하기

1. 아래의 이미지에서 보이는 빨간 박스 속 +버튼을 눌러 주세요.
   ![제목없음9](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C9.png)

2. Connection Name은 이 연결을 의미하는 별칭 같은 것입니다. 저희는 hscampus라고 지칭하겠습니다. 그리고 비밀번호를 입력하는 Password 옆의 Store in Valut...을 눌러 비밀번호를 입력 해 줍니다.
   ![제목없음10](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C9.png)

3. 제대로 연결이 가능한지 Text Connection을 눌러 줍니다. 경고창이 뜨는 것은 MariaDB의 버전이 높기 때문에 나오는 것 입니다. 무시하고 확인을 눌러 주시면 Successfully made the MySQL connection이라 나오고, 아래의 이미지 처럼 나오는 것을 볼 수 있습니다.
   ![제목없음11](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C11.png)

4. 새로 생성된 hscampus 박스를 클릭하면 해당 데이터베이스로 이동이 됩니다. 경고가 발생할 경우 continue anyway를 눌러줍니다.

5. 제일 처음 접속 하였을 때에는 데이터베이스나 테이블에 대한 정보를 보고 싶으면 다음과 같이 합니다. 왼쪽의 Navigator 박스에서 하단의 Scheme를 눌러주시면 데이터베이스에 대한 정보가 나옵니다. 그리고 테이블의 하위 목록을 확인 할 수 있습니다. 만약 안에 정보를 보고 싶으며 테이블 이름의 제일 마지막에 아이콘을 눌러줍니다.
   ![제목없음12](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C12.png)

6. 이제 여기서 데이터를 추가하거나 삭제 할 수 있으며, 테이블에 대한 정보를 수정 할 수 있습니다.

## 테이블 추가하기

아래의 이미지와 같이 Tables에서 마우스 우클릭 후 Create Table를 눌러 줍니다.
![제목없음13](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C13.png)

그 뒤 아래의 이미지와 같이 내용을 별도의 명령어 없이 만들어 줄 수 있습니다.
![제목없음14](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C14.png)

### 외래키 설정

외래키라는 것은 다른 테이블과의 연관성이 있을 경우 설정을 해 줍니다. 우리의 board테이블의 경우에는 작성자가 사용자 테이블의 사용자 이름과 연동을 지어 줄 것이기 때문에 외래키를 지정 해 줍니다.

외래키는 다른 테이블이 삭제가 되거나 속성이 수정되었을 때 시스템이 꼬이는 것을 미연에 방지 할 수 있어 사용 합니다.

외래키를 설정하는 것은 테이블을 생성 하는 창 하단에 Foreign Keys를 눌러 줍니다.

왼쪽은 부모 테이블에 대한 정보, 오른쪽은 자식 테이블에 대한 정보를 넣어줍니다.

![제목없음15](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C15.png)

이제 Apply를 눌러 테이블을 추가 해 주면 됩니다. 그러면 다음과 같이 해당 내용이 맞는지 확인하고 Apply를 하면 됩니다.

외래키 설정 시 주의 해야할 점은 아래와 같습니다.

1. 데이터 타입이 같은지
2. 메인키와 외래키 모두 NOT NULL 체크가 되어 있는지?
3. 참조하는 키(Reference Key)가 메인키 혹은 유니크 키로 되어있는지?
