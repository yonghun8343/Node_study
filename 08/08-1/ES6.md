# ES6

우리가 지금가지 간혈적으로 사용 해 왔던 let과 const, Arrow 함수 등은 이미 es6에서 추가가 된 것으로 Node에서는 es6를 어느정도 지원을 해 주기 때문에 서버를 구동시키는데에 있어 별도의 추가 작업 없이도 코드가 돌아가는데에 문제가 없었습니다.

하지만 문제는 브라우저에서 es6를 구동하게 되면 해당 문법이 어떤 것인지 모른다는것이 가장 큰 문제입니다.

그러므로 우리가 es6의 문법이 어떤 것이 있고 중요한 내용에 대해서 각각 알아보고, es6로 작성된 자바스크립트를 es5까지 지원하는 브라우저에 어떻게 적용 시키는지 알아보려 합니다.

## ES6 문법

### let과 const

let과 const는 이제 우리가 익숙 해 져 있습니다. 크롬의 경우에는 let과 const를 지원하기 때문에 에러가 발생하지 않지만, Internet Explorer의 경우에는 이미 지원이 완료되었기 때문에 에러가 발생합니다.

![제목없음18](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C18.png)

사용 방법은 기존 사용 해 주셨던 것과 동일 합니다.

```javascript
let a = 1;
const b = 2;
```

### 템플릿 리터럴

저희가 백틱(`) 으로 부르는 것 안에 문자와 "${}"를 이용하여 문자와 변수를 한번에 표현 하는 것 역시 es6에서 추가 된 것 입니다.

![제목없음19](./%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C19.png)

사용 방법은 기존 사용 해 주셨던 것과 동일 합니다.

```javascript
let a = 1;
console.log(`var는 ${a}입니다.`);
```

### 화살표 함수

화살표 함수 역시 es6부터 나왔습니다.

사용 방법은 기존 사용 해 주셨던 것과 동일합니다.

```javascript
const a = (a, b) => {
  return a + b;
};
a(1, 2);
```

### 비구조화 할당(구조 분해 할당)

비구조화 할당은 기존에 Array에 있거나 Object에 있는 값을 해체하고 개별 값을 변수에 새로 넣는 것을 의미 합니다.

```javascript
const arr = [1, 2, 3];
const obj = { first: "1", second: "2" };

const [one, two, three] = arr;
const { first, second } = obj;

console.log(one);
console.log(two);
console.log(three);
console.log(first);
console.log(second);
```

---

우리가 기존에 알고 있었던것 혹은 간단한 것은 여기까지 설명하고 es6에서 추가된 중요한 변화점에 대해서는 다음 장에서 Import, Promise, Await/Async에 대해서 설명 하겠습니다.
