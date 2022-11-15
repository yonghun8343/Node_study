// 1. 변수에 있는 익명함수 만을 export할 때
export let sum = (a, b) => {
  return a + b;
};

// 2. 여러 변수들이 설정된 파일에서 해당 변수들을 export할 때
export let apikey = "123",
  port = "123",
  user = "root";

// 3. 함수 하나만을 기본 값으로 export할 때 (1번과 같다.)
function sum3(a, b) {
  return a + b;
}

export default sum3;

// 4. 여러 함수를 export 할 떄
function sum4(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

export { sum4, minus };
