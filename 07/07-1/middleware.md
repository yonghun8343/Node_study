# MiddleWare

Express에서 미들웨어란 request객체와 response객체 그리고 어플리케이션의 요청-응답 사이클 둥에 미들웨어 함수의 기능을 수행 하는 것을 의미합니다.

즉 요청이 들어오고 난 다음 특정 함수가 동작하여 우리가 보기 쉬운 형태로 바꾸어 준다거나 응답을 줄 때 로그를 쉽게 남겨주는 등 중간 목적에 맞게 처리할 수 있는 함수 또는 기능을 의미 합니다.

express에서 app.use(미들웨어)이 부분이 미들웨어가 들어갈 수 있고, express에서 제공하는 특정 기능이 될 수 있습니다.

아래는 express의 설정이나 관련 코드가 있는 app.js의 일부 입니다.

```javascript
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
```

여기에서 우리는 미들웨어로 logger, express에서 제공하는 join, urlencoded, static 그리고 cookieParser, router를 사용 하는 것을 알 수 있습니다.

- 쿠키를 사용 할 경우에는 cookieParser를 통해서 req에서 쿠키값을 쉽게 볼 수 있도록 해 줄 것입니다.
- logger를 통해 development환경을 기준으로 로그를 남기는 것을 볼 수 있고
- express.json()으로 데이터가 json이 왔을 때 string에서 json으로 자동으로 변환 해 주는 것을 알 수 있습니다.
- urlencoded를 통해 자동으로 시스템에 맞는 인코딩을 제공 해 줍니다.
- routes를 통해 각 주소 별 역할에 맞게 url을 나누어 사용 할 수 있습니다.

여기서 우리가 다음 장에서 중점으로 볼 것은 할 loggin, routes, body parser를 보려 합니다.
