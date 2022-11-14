# await_async

하지만 Promise의 단점이 있습니다. 바로 에러를 catch하기 어렵다는 것입니다.

그 이유는 catch하나만을 이용하요 catch를 하게되고 각각 reject에서 에러를 넣게 되지만, 순서가 있는 함수의 경우에는 역순으로 되돌리기는 순간 하나의 함수 역할을 벗어나기 때문입니다.

그래서 async/await은 단독으로 사용되며, try/catch로 묶어 따로따로 에러를 컨트롤 할 수 있다는 장점이 있습니다.

[링크](https://elvanov.com/2597)
