// 변수에 있는 익명함수 <<만 export할 때

// export let sum = (a, b) => {
//   return a + b;
// };

// 여러 변수들이 설정된 파일에서 해당 변수들을 export할 때
// export let apikey = "123",
//   port = "12",
//   user = "root";

// 함수 하나만을 기본 값으로 export할 때

// function sum2(a, b) {
//   return a + b;
// }

// export default sum2;

// 함수 여러개를 export할 때
function sum3(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

export { sum3, minus };
