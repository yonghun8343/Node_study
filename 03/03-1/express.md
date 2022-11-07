# Express

## Express란

express는 노드를 위한 웹 프레임워크로 웹 서버와 API 개발을 위해 설계 되었다.

---

## npm

npm은 node package manager이다. 노드에서 사용하는 패키지 즉 모듈들에 대해서 쉽게 찾을 수 있고 설치가 가능 하도록 지원 해 주는 프로그램이다.

기본적인 명령어는 다음과 같다.

```bash
npm <명령어> <옵션>

명령어
install     alias i
uninstall   alias r
```

간단한 예는 아래와 같다.

```bash
npm i express-generator -g (-g는 전역으로 설치를 하라는 것이다.)
npm i express (작업 프로젝트 레벨에서 express 설치)
npm i eslint --dev (개발 환경에서만 사용)

npm r express-generator -g (전역에 있는 express-generator를 삭제)
npm r express (작업 프로젝트 레벨에서 express 삭제)
npm r eslint --dev (개발 환경에서 삭제)
```

---

## express-generator

express-generator는 초기 express를 세팅하기 위해 만들어야 할 폴더트리, 기본적인 코드들을 자동으로 만들어 주는 모듈이다.

아래의 명령을 통해서 express-generator를 설치 해 보자

```bash
npm i -g express-generator
```

-g 옵션으로 설치를 하였을 때 해당 폴더 뿐만 아니라 다른 폴더에서도 커맨드 라인 명령을 통해서 모듈을 사용 할 수 있게 된다.

설치가 완료되었다면 터미널에서 express를 입력 해 보자

```bash
express --no-view
npm i
```

우리는 현재 폴더에 설치를 할 예정이기 때문에 별도로 폴더에 대한 옵션을 주지 않아 정말로 해당 폴더에 설치 할 것인지 물어본다. 이 때 y를 눌러주면 bin, public, routes폴더와 app.js, package.json이 생성이 된다.

각각의 폴더 및 파일에 대한 설명은 다음과 같다.

| 종류         | 설명                                                                                                                |
| :----------- | :------------------------------------------------------------------------------------------------------------------ |
| bin          | node의 http와 관련한 설정 내용을 담고 있다.                                                                         |
| public       | 서버를 통해 파일을 불러 올 수 있는 경로를 따로 잡아 두어 해당 폴더 내에서는 어떤 파일이든 자유롭게 불러 올 수 있다. |
| routes       | 요청에 대한 처리를 해당 폴더 내의 파일에서 할 수 있다.                                                              |
| app.js       | 초기 express에 대한 설정에 대한 내용을 담고 있다.                                                                   |
| package.json | 해당 프로젝트에 대한 설정 및 내용을 담고 있다.                                                                      |

## 자동 명령어 만들기

package.jon은 해당 프로젝트에 대한 설정 및 내용을 담고 있는데 express-generator를 통해 생성한 package.json에는 다음과 같은 내용이 있다.

```json
"scripts": {
  "start": "node ./bin/www"
},
```

package.json에 script부분은 내가 원하는 명령어를 저장 할 수 있는데, 여기서는 원래 express-generator를 통해서 만든 서버는 "node ./bin/www"를 커맨드라인에 입력해야지 서버가 구동이 된다. 하지만 매번 이렇게 입력하기 번거로워 특정 명령어만 입력하면 실행 시키고 싶다면 위의 스크립트 처럼 만들면 된다.

스크립트를 동작하는 방법은 다음과 같다.

```bash
npm run <명령어>

ex) npm run start
```

이제 package.json에 있는 명령어로 서버를 실행 시키고, public에 있는 파일들은 별도의 코딩 없이도 부를 수 있게 되었다.
