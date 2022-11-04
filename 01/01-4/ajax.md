# AJAX

AJAX(Asynchronous javascript And XML)는 비동기적 웹 서비스를 개발하기 위한 기법입니다.

보통 AJAX요청은 jQuery나 axios와 같은 라이브러리를 사용하면 편리합니다. 하지만 이 수업에서는 jQuery나 axios를 사용하지 않았기 때문에 AJAX요청을 자바스크립트가 기본적으로 제공하는 방식을 사용합니다.

```javascript
GET요청을 보낼 때
<script>
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() { // 요청에 대한 콜백
    if(xhr.readyState === xhr.DONE) { // 요청이 완료되면
      if(xhr.status === 200 || xhr.status === 201) {
        console.log(xhr.responseText) // 서버에서 보내주는 값
      } else {
        console.error(xhr.responseText)
      }
    }
  }
  xhr.open("GET", "https://google.com"); // 메소드와 주소 설정
  xhr.send(); // 요청 전송
</script>

// onreadystatechange 대신 onload와 onerror로 성공과 실패를 구별해도 괜찮습니다.

<script>
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if(xhr.status === 200 || xhr.status === 201) {
        console.log(xhr.responseText) // 서버에서 보내주는 값
      }
  }
  xhr.onerror = function() {
    console.error(xhr.responseText)
  }
  xhr.open("GET", "https://google.com"); // 메소드와 주소 설정
  xhr.send(); // 요청 전송
</script>


POST요청을 보낼 때

다음은 서버로 데이터를 같이 보내는 POST 요청입니다. 데이터로는 JSON 데이터를 보냅니다.

<script>
  let xhr = new XMLHttpRequest();
  let data = {
    name: "hun",
    phon: "010-1234-1234"
  }
  xhr.onreadystatechange = function() {
    if(xhr.readyState === xhr.DONE) {
      if(xhr.status === 200 || xhr.status = 201) {
        console.log(xhr.responseText);
      } else {
        console.error(xhr.responseText);
      }
    }
  }
  xhr.open("POST", "https://google.com")
  xhr.setRequestHeader("Content-Type", "application/json");// 콘텐츠 타입을 json으로 설정
  xhr.send(JSON.stringify(data)); // 데이터를 포함하여 전송
</script>
```
