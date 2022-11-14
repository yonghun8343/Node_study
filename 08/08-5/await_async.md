# await_async

await_async에 대해서 자세히 알고 싶다면 [링크](https://springfall.cc/post/7)를 참고 해 주세요.

하지만 Promise의 단점이 있습니다. 바로 에러를 catch하기 어렵다는 것입니다.

그 이유는 catch하나만을 이용하요 catch를 하게되고 각각 reject에서 에러를 넣게 되지만, 순서가 있는 함수의 경우에는 역순으로 되돌리기는 순간 하나의 함수 역할을 벗어나기 때문입니다.

그래서 async/await은 단독으로 사용되며, try/catch로 묶어 따로따로 에러를 컨트롤 할 수 있다는 장점이 있습니다.

Promise로 감쌋던 코드에서 아래의 순서처럼 바꾸어 보겠습니다.

1. 함수 앞에 `async`를 붙힙니다.
2. `new Promise`를 없애줍니다.
3. `resolve(value);`부분을 `return value;`로 변경합니다.
4. `reject(error)`부분을 `throw new Error()`로 수정합니다.

이전 장에서 진행했던 sum함수를 async로 바꾸어 보겠습니다.

```javascript
async function sum(a, b) {
  return a + b;
}
```

async의 결과값은 `Promise를 반환`하기 때문에 이전의 코드와 동일하게 동작 합니다.

await_async의 한계는 존재합니다. 기존 es5때 부터 존재하던 코드들은 Promise를 반환하지 않기 때문에 직접 이를 Promise로 반환하도록 별도로 만들어 주어야합니다.

```javascript
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));
```

하지만 만들기만 하면 코드를 직관적으로 구현 할 수 있습니다.

```javascript
// await을 통해 1초 기다리는 것을 동기로 수행
async function sum(a, b) {
  await wait(1000);
  return a + b;
}
```

특히나 await async는 DB작업에서 많이 사용이 됩니다.

우리가 DB에서 "mariadb/callback"을 사용 했었으나 Promise용 함수도 따로 있습니다. [링크](https://github.com/mariadb-corporation/mariadb-connector-nodejs/blob/master/documentation/promise-api.md)를 참고해 주세요

만약 어느 함수에서 아래와 같은 순서로 시작하면 async, await은 필수 입니다.

1. 아이디가 중복 되는지 검사
2. 비밀번호 암호화
3. 아이디 비밀번호 저장
4. 응답

데이터베이스에 값을 넣고 암호화 하는 동안을 javascript에서는 await, async가 없으면 바로 응답을 하기 때문에 꼭 넣어 주어야합니다.
