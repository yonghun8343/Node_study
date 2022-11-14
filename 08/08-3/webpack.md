# Webpack

Webpack은 번들링 모듈로 불립니다.

번들링이라는 것은 한군데 묶는다! 라는 것 정도로 이해 해 주시면 좋습니다.

번들링을 진행 하면서 es6를 es5로 변환 시키면서 묶어 주는 역할도 같이 하고 있으며, js파일의 용량을 줄여주는 등 여러가지 부가적인 기능을 제공하고 있어 많은 사람들에게 사용 되고, React와 Vue의 경우에는 Webpack이 자동으로 내장되어 있습니다.

express의 경우에는 html작업도 하고, 서버 작업을 동시에 병행합니다. 그러므로 어떤데는 es5를 사용하고, 어떤데는 es6를 사용하는 불편함이 발생 할 수 있으며, 배포 단계에서 막상 es6를 넣어 코드를 수정해야하는 경우가 발생 할 수 있습니다. 그러므로 html작업까지 es6로 작업 후 es5로 바꿔 주는 역할을 webpack이 수행 합니다.

그렇다면 우리가 연습용 새로운 프로젝트를 생성하여 webpack을 설정 해 보겠습니다.

기존에 만드셨던 폴더나 새로운 폴더와 상관 없이 express-generator로 생성한 폴더에서 시작 해 주시면 됩니다.

필수 웹팩 패키지를 설치 합니다.

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
```

각각의 모듈에 대한 설명으로 webpack은 webpack에 대한 기본 모듈입니다.
webpack-cli는 명령어를 통해서 webpack에 대한 설정을 추가 할 수 있습니다. npx를 이용하여 실행 시킬 수 있으며, npx는 패키지 내의 node module을 실행 할 수 있는 명령어 입니다.
webpack-dev-server는 개발 환경을 위한 서버 입니다.

webpack은 여러 파일을 하나로 합쳐주는 역할을 한다고 했습니다.

이제 Babel을 이용해서 파일을 하나로 합쳐 보려 합니다.

우선 babel의 모듈을 받기 위해서 아래의 명령어를 실행 해 주세요.

```javascript
npm install -D babel-loader @babel/core @babel/preset-env
```

babel-loader는 실질적으로 webpack의 module에 설정되어 @babel/core와 @babel/preset-env를 적용 할 수 있습니다.

그렇다면 이제 모든 준비가 끝났으니 webpack에 대한 설정을 시작 해 봅시다.

우선 프로젝트의 최 상위 폴더(.env가 있는 폴더의 위치)에 webpack.config.js를 만들어 줍니다.

이후 아래의 내용을 넣어 주세요.

webpack에 대한 설명은 [링크](https://webpack.js.org/concepts/)를 참고 해 주세요.

```javascript
const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "public", "javascripts", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

위에서 부터 하나씩 설명을 하자면

| 종류   | 설명                                                                                                                                                                                                                                                                                                                     |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entry  | webpack을 실행시킬 파일에 대한 경로를 지정 합니다. 파일 명을 키값으로, 파일의 위치가 밸류 값으로 들어갑니다.                                                                                                                                                                                                             |
| Output | webpack으로 번들링 시킨 파일에 대한 결과 값이 저장 되는 위치를 지정합니다. 현재는 public안에 dist로 지정 해 두었으며 [name]은 entry에서 가지고 온 키 값으로 이름을 넣는 설정 입니다.                                                                                                                                     |
| module | 모듈은 webpack을 진행하면서 필요한 모듈과 같이 번들링을 시키기 위해서 사용 됩니다. 우선 rules에서 파일의 유형에 대한 설정을 해 줍니다. 지금은 ".js"로 끝나는 js파일은 모두 모듈을 포함해 번들링 하라고 지정 하였습니다. exclude는 모듈의 위치 입니다. use는 어떤 모듈을 사용 할지에 대한 설명이며 예제를 참고 해 주세요. |

이제 webpack을 통해서 node에서 작성한 코드와 같은 es6를 이용하여 작업을 할 수 있습니다.
