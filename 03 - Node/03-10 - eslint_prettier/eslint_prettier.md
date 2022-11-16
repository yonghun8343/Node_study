# eslint_prettier

## eslint

eslint는 코드의 퀄리티를 보장하도록 도와주는 도구 입니다.

linter라고 불리는 것은 A라는 사람과 B라는 사람의 코드 스타일을 일치 시켜 가독성을 높이고, 업무의 효율성을 높일 수 있도록 도와줍니다.

즉 일관성 있는 코드로 구현 할 수 있도록 가이드를 해 줍니다.

### eslint 세팅

우선 eslint를 사용하기 위해 설치를 해 줍니다.

```bash
npm i -g eslint
npm i -D eslint
```

현재 eslint의 버전에서는 npx eslint --init을 사용할 수 없기 때문에 global로 설치를 따로 해 줍니다.

eslint는 vscode에서 저장 했을 때를 캐치 할 수 있어야 하기 때문에 vscode의 extension으로 eslint를 설치 해 줍니다.

eslint는 lint를 하는 스타일이나 설정등을 하는 것을 .eslintrc파일을 참조하여 적용 시켜 줍니다.

프로젝트 레벨에 eslint가 설치되어 있지 않는다면 전역으로 참조해서 eslint를 적용합니다.

그러므로 각 프로젝트마다 .eslintrc파일이 필요합니다.

이제 eslintrc파일을 생성 해 봅시다.

```bash
eslint --init

> To check syntax, find problems, and enforce code style
> JavaScript modules (import/export)
> None of these
? Does your project use TypeScript? (y/N) N
>( ) Node
> Use a popular style guide
> Airbnb (https://github.com/airbnb/javascript
> JSON
? Would you like to install them now with npm? (Y/n) Y
```

이제 .eslintrc.json파일이 생성이 되었고 airbnb스타일로 코드를 작성 할 수 있게 가이드를 해 줍니다.

## prettier

prettier는 코드의 모양을 깔끔하게 혹은 통일되게 도와줍니다.

모양이라고 해서 eslint와 햇갈릴 수 있는데, 들여쓰기나 띄어쓰기 등에 대한 규칙을 통일하여 코드의 모양을 통일성 있게 도와줍니다.

eslint에서 설정한 스타일이 prettier에서 기본적으로 설정한 설정과 충돌이 일어납니다. 그러므로 prettier에서 추가적인 설정이 필요합니다.

prettier를 세팅하는 방법은 2가지가 있습니다.

1. 별도의 prettier 관련 플러그인을 npm으로 설치하지 않고, VSCODE의 extention으로 설치
2. prettier 플로그인을 직접 설치 후 eslintrc에 세팅

첫번째 방법은 제일 간편하지만 vscode에 해당 세팅이 저장되기 떄문에 작업 환경에 따라 설정이 바뀔 수 있습니다. 그러므로 일반적인 프로젝트 환경에서는 두번째 방법이 추천 됩니다.

우선 vscode의 extension에서 prettier를 설치 합니다.

prettier와 eslint에서의 규칙이 중복되는것을 막기 위해서 eslint-config-prettier를 설치 해 줍니다.

```bash
npm i -D eslint-config-prettier
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
```

그리고 기존에 설정했던 eslintrc파일에 해당 내용을 추가 해 줍니다.

```json
{
  "extends": ["some-other-config-you-use", "plugin:prettier/recommended"]
}
```

이제 eslint와 prettier 설정이 끝났습니다.

추후 프로젝트 시 아래의 내용을 추가해서 작업 하겠습니다.
