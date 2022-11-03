# JSON

json은 JavaScript Object Notation의 약자로 자바스크립트에서 객체를 쉽게 만들기 위한 문법으로 데이터를 구조화 할 때 사용하기 좋다.

사용법은 다음과 같다.

```javascript
const user = {
  name: "hun",
  phon: "010-1234-1234",
};

객체를 배열에 담을 수도 있다.
ex)
const user = [
  {
    name: "hun1",
    phon: "010-1234-1234",
  },
  {
    name: "hun2",
    phon: "010-1234-1234",
  },
  {
    name: "hun3",
    phon: "010-1234-1234",
  }
]

객체 안에 객체를 담을 수도 있다.
const user = {
  name: "hun",
  info: {
    height: 200,
    weight: 30
  },
  phon: "010-1234-1234"
}
```

호출 및 사용은 다음과 같다.

```
user.name, user.phone, user.info.height
```
