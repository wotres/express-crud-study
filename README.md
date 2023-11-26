# sample express-crud

# 실행
## client
* $ cd client
* $ npm ci
* $ npm start

## server
* $ cd server
* $ npm ci
* $ npm start

# client 설치 관련 memo
## package.json 생성
* $ npm init -y
## tsconfig.json 생성
* $ npx tsc --init
## typescript 컴파일하여 javascript로 변환
* $ npm install typescript --save-dev
* $ npx tsc app.ts   
## web 서버 실행하는법
* $ npm install http-server --save-dev
* $ npx http-server -p 8080
## 바로 웹이 화면에 나오도록 open
* $ npm install open --save-dev
## 위 컴파일 및 웹 실행 한번에 실행 script
```
"scripts": {
    "start": "tsc app.ts && http-server -p 8080 && open http://localhost:8080"
}
```

# server 설치 관련 memo
## package.json 생성
* $ npm init -y
## tsconfig.json 생성
* $ npx tsc --init
## typescript package 설치
* $ npm install @types/express @types/body-parser @types/morgan @types/cors --save-dev
* $ npm install ts-node --save-dev
## server 실행
```
"scripts": {
    "start": "ts-node server.ts",
}
```

# etc
* npx는 패키지를 일시적으로 실행하고 필요할 때만 사용하는 것
    * ex) npx tsc app.ts
* npm을 사용하여 패키지를 설치하고 프로젝트의 종속성을 관리
    * npm install package-name
* TypeScript 컴파일러(tsc)를 사용하여 TypeScript 파일을 JavaScript 파일로 변환
    * 컴파일된 JavaScript 파일은 Node.js에서 실행
    * tsc app.ts
* <script src="app.js"></script>
    * 브라우저가 이 스크립트를 만나면 즉시 다운로드하고 파싱
    * 이 스크립트가 다운로드 및 실행될 때까지 페이지의 나머지 부분은 렌더링되지 않음 => 동기적으로 실행
* <script type="module" src="script.js"></script>
    * ES6(ES2015) 이상의 자바스크립트 모듈을 로드하기 위한 방법
    * 모듈은 비동기적으로 로드되며, 로딩이 완료된 후에 실행 => 비동기적으로 실행
    * 모듈은 import 및 export 키워드를 사용하여 코드를 구성하고 다른 모듈에서 재사용
* ts-node
    * 일반적으로 Node.js는 JavaScript 파일만 직접 실행할 수 있지만, "ts-node"를 사용하면 TypeScript 파일(.ts)을 직접 실행
* typescript
    * TypeScript 컴파일러(tsc)를 제공 => TypeScript 파일을 JavaScript로 변환
* app.use(morgan('dev')) 사용
    * 로그가 아래와 같이 생성
    * GET /items 200 0.538 ms - 115
    * 115는 응답 본문의 크기를 바이트 단위로 나타낸것
    * [HTTP 요청 메서드 (GET, POST 등)] [요청 URL] [응답 상태 코드 (예: 200, 404)] [요청 처리 시간] [응답 본문의 크기]
* document.getElementById('createItem')!.addEventListener
    * !는 null이 아님을 확신할 때 사용
    * non-null assertion operator
* 옵셔널 체이닝 (Optional Chaining)
    * const value = object?.property;
        * object가 null이나 undefined이면 value는 undefined가 됨
            => object.property를 시도하면서 발생할 수 있는 타입 에러를 방지    
* 널 병합 연산자 (Nullish Coalescing Operator)
    * const value = object?.property ?? 'default';
    * undefined일 경우에만 오른쪽 피연산자를 반환('default')
* 미들웨어는 요청과 응답 사이에서 특정 작업을 수행하는 함수
    * bodyParser.json() 미들웨어는 요청 본문을 파싱하여 req.body 객체로 만듦
* 객체 스프레드 문법(...) => 기존 객체의 속성을 새 객체로 "펼쳐" 복사
    * items[itemIndex] = { ...items[itemIndex], ...req.body, id: items[itemIndex].id };
        * items[itemIndex]의 모든 속성을 복사한 후 req.body의 모든 속성을 복사하여 오버라이딩
        * id 속성은 items[itemIndex]의 id 속성으로 설정
* 얕은 복사 (Shallow Copy)
    * 객체의 속성을 복사할 때, 속성의 값이 객체인 경우 해당 객체의 참조만 복사
    * 원본 객체 또는 복사된 객체의 중첩된 객체를 수정하면, 그 변경이 다른 객체에도 영향을 미침
    * 스프레드 문법 { ...object }, Object.assign({}, object)
        * 
        ```
        const original = { a: 1, b: { c: 2 } };
        const copy = Object.assign({}, original);

        copy.a = 3; // copy의 a 속성을 변경
        console.log(original.a); // original의 a 속성은 변경되지 않음: 1

        copy.b.c = 4; // copy의 중첩된 객체의 속성을 변경
        console.log(original.b.c); // original의 중첩된 객체의 속성도 변경됨: 4
        ```
* 깊은 복사 (Deep Copy)
    * 객체의 속성을 복사할 때, 속성의 값이 객체인 경우 해당 객체를 재귀적으로 복사
    * 원본 객체 또는 복사된 객체의 중첩된 객체를 수정해도 다른 객체에 영향을 미치지 않음
    * JSON.parse(JSON.stringify(object))
* CORS(Cross-Origin Resource Sharing) 정책
    * CORS는 웹 페이지가 다른 도메인의 리소스를 요청할 수 있도록 허용하는 보안 메커니즘
* @types/ 패키지들은 TypeScript 개발 환경에서 해당 JavaScript 라이브러리들의 타입 정의를 제공
    * 그러나 이것은 실제 라이브러리의 기능성을 포함하지 않음 => 즉, @types/cors는 cors 모듈의 타입 정보만을 제공하며, cors 모듈 자체는 제공하지않아 설치해야함