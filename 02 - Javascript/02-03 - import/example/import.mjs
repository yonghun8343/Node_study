// 1. 변수에 있는 익명함수 만을 import할 때
import a from "./export.mjs";
console.log(a(1, 2));

// 2. 여러 변수들이 설정된 파일에서 해당 변수들을 export할 때
import { apikey, port, user } from "./export.mjs";
console.log(apikey);
console.log(port);
console.log(user);

// 3. 함수 하나만을 기본 값으로 export할 때
import sum3 from "./export.mjs";

console.log(sum3(1, 2));

// 4. 여러 함수를 export 할 때
import { sum4, minus } from "./export.mjs";

console.log(sum4(1, 2));
console.log(minus(2, 1));

import * as f from "./export.mjs";

console.log(f.sum4(1, 2));
console.log(f.minus(2, 1));
