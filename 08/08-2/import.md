# Import

우리가 지금까지 es5에서 변수에 모듈을 저장하여 사용 해 왔습니다.

하지만 이렇게 될 경우에는 모듈을 사용 하는 것과 사용자가 선언한 변수와의 차별점이 없어 코드에서 쉽게 이를 혼용하게 되었는데요.

그러다 보니 객체에서 사용 하는 것인지, 모듈에서 사용하는것인지 그리고 다른 코드에서 이를 사용 하는것이 구분이 힘들어지기 시작했습니다. 즉 가독성이 많이 떨어진다는 뜻입니다.

그래서 이를 구분하기 위해서 import가 es6부터 도입이 되었습니다.

## import 사용법

기존의 require 사용법은 아래와 같습니다.

```javascript
const module1 = require("module");
const { module2, module3 } = require("module");
```

하지만 이제부터는 import와 from이라는 키워드를 이용하여 가독성을 높여 주려 합니다.

```javascript
import module1 from "module";
import { module2, module3 } from "module";
```

보통은 위의 예제 중 두번째 줄의 코드로 import를 해 옵니다.

그리고 import 뿐만 아니라 export도 편리 해 졌는데요.

export는 예제를 통해서 보려고 합니다.

export.js

```javascript
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
```

import.js

```javascript
// 1. 변수에 있는 익명함수 만을 import할 때
import a from "./export";
console.log(a(1, 2));

// 2. 여러 변수들이 설정된 파일에서 해당 변수들을 export할 때
import { apikey, port, user } from "./export";
console.log(apiKey);
console.log(port);
console.log(user);

// 3. 함수 하나만을 기본 값으로 export할 때
import sum3 from "./export";

console.log(sum3(1, 2));

// 4. 여러 함수를 export 할 때
import func from "./export";

console.log(func.sum4(1, 2));
console.log(func.minus(2, 1));

import { sum4, minus } from "./export";

console.log(sum4(1, 2));
console.log(minus(2, 1));

import * as f from "./export";

console.log(f.sum4(1, 2));
console.log(f.minus(2, 1));
```

import와 export의 경우에는 현재 일반 js파일로 작성 하였을 때 에는 node에서도 지원 하지 않습니다.

하지만 해당 파일이 모듈입니다. 라는 것을 표현하기 위해 mjs라고 확장자를 설정하게 되면 실행이 잘 되는 것을 보실 수 있습니다.

하지만 우리가 매번 HTML에 적용 할 때에 mjs파일을 넣을 수도 없고 이를 자동으로 es6에서 es5로 변환 시켜 주는 툴이 있을까요?

네 있습니다. 다음 장 08-3에서 자동으로 이를 변환시켜주는 툴에 대해서 알아 보려합니다.
