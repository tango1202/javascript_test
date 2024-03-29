// ----
// 변수
// ----
(() => {
    var x; // #1. 선언
    x = 1; // 선언 후 할당
    var y = 2; // #2. 선언과 동시에 할당
    var x = 3; // #3. 선언된 것을 다시 재선언
    x = 'Hello'; // #4. 타입을 바꿔서 할당
    z = 4; // #5. 선언하지 않고 사용. 전역 개체의 변수로 선언됨
    
    console.log("변수 테스트", x + (y + z)); // Hello6 (문자열과 2 + 4의 결과가 더해짐)   
})();
// ----
// 변수 호이스팅
// ----
(() => {
    console.log('변수 호이스팅', myHoistingVar); // undefined. hoisting되어 상단에 선언되고 값을 지정하지 않아 undefined 입니다.
    var myHoistingVar = 100;
    console.log('변수 호이스팅', myHoistingVar); // 100
})();
// ----
// 변수 유효 범위
// ----
(() => {
    var val = 1;
    function myFunc() {
        var val= 10; // #1.
        {
            var val = 20; // #2. 새롭게 생성되지 않고 함수 유효 범위의 val을 사용합니다.
        }
    
        return val; 
    }
    console.log('변수 유효 범위', myFunc() === 20); // true
    console.log('변수 유효 범위', val); // 1
})();
// ----
// let과 const
// ----
(() => {
    function myFunc() {
        let val= 10; // #1.
        {
            let val = 20; // #2. // 블록에서만 유효합니다.
        }

        return val; // #1 을 사용합니다.
    }
    console.log('let', myFunc() === 10); // true
})();
(() => {
    let val = 10;
    // let val = 20; // (X) 오류 발생
})();
(() => {
    // console.log(val); // (X) 오류 발생
    let val = 0;
})();
(() => {
    // const val; // (X) 오류 발생. 선언과 동시에 초기화해야 합니다.
    const val = 0; 
    const obj1 = {x: 1, y: 2};
    const obj2 = {x: 10, y: 20};
    // obj1 = obj2; // (X) 오류 발생. const에 값을 할당할 수는 없습니다.
    obj1.x = obj2.x;
    obj1.y = obj2.y;
    console.log('const 개체의 속성은 수정할 수 있습니다.', obj1.x === obj2.x, obj1.y === obj2.y);
})();
// ----
// 타입과 리터럴
// ----
(() => {
    const num1 = 10.5; // #1. 실수
    let num2 = 10; // #1. 정수
    num2 = 0x0a; // 16진수
    num2 = 0o10; // 8진수
    num2 = 0b101; // 2진수
    console.log('타입과 리터럴 테스트 : 3 / 2', 3 / 2); // #1. 1.5. 정수끼리 나눴을때 실수가 나올 수 있습니다.

    const b1 = true; // #2. bool
    const b2 = false;
    
    const str1 = "Hello"; // #3. 문자열
    const str2 = 'Kim';
    const str3 = `Hello ${str2}`; // ${variable}을 이용하여 변수값과 합성하여 출력 
    console.log('타입과 리터럴 테스트 : 백틱 합성', str3); //. Hello Kim
 
    console.log('이스케이프 문자를 이용한 개행 : ', '첫번째 줄\n두번째줄');
    console.log('백틱 문자열에서의 개행 : ', `첫번째 줄
두번째줄`);   
    console.log('문자열 기호는 ""과 \'\'입니다.');

    const a = null; // #4. 값이 없음
    let b; // #5. undefined. 값이 할당되지 않아 자바스크립트에서 초기화 한 값
    
    const obj = {name: 'Lee', number: '123-4567'}; // #6. 개체
    console.log('타입과 리터럴 테스트 : 개체 표시', obj); // Object. 트리를 확장하여 내부 속성값을 확인할 수 있음
    
    const arr = [1, 'Kim', 3]; // #7. 배열
    console.log('타입과 리터럴 테스트 : 배열 표시', arr); // Array(3). 트리를 확장하여 내부 요소를 확인할 수 있음
    
    const data = 'a,b,c~d';
    const result = data.split(/,|~/); // #8. 정규 표현식을 이용하여 구분자 , ~ 로 분리
    for (let i = 0; i < result.length; ++i) {
        console.log('타입과 리터럴 테스트 : 배열 요소 표시', result[i]); // a b c d
    }
})();
// ----
// bigInt
// ----
(() => {
    let bigInt = 1234567890123456789012345678901234567890n;
    bigInt += 1n;
    
    console.log('bigInt : ', bigInt);
})();

// ----
// 연산자
// ----
(() => {
    function add(a, b) {
        return a + b;
    }
    
    console.log('add(1, 2) 는 3', add(1, 2)); // 3
    console.log("add('1', 2) 는 '12'", add('1', 2)); // '12'. 문자열을 더하다 보니 2도 문자열로 만들고 더함
    console.log("add(+'1', 2) 는 3", add(+'1', 2)); // 3. '1'을 숫자로 바꾸고 더함
})();
(() => {
    console.log("1 == '1' 는 true", 1 === '1'); // true
    console.log("1 === '1' 는 false", 1 === '1'); // false
})();
(() => {
    let undefinedVal;
    console.log('undefinedVal === undefined는 true', undefinedVal === undefined); // true
    console.log('undefinedVal === null은 false', undefinedVal === null); // false
    console.log('undefinedVal == null은 true가 되버립니다.', undefinedVal == null); // true. undefined인데, true 입니다.    

    let nan = NaN;
    console.log('nan === NaN', (nan === NaN) === false); // NaN 이지만, === 으로 비교하면 false 입니다.
    console.log('isNaN(nan)', isNaN(nan) === true); // isNaN()으로 검사해야 합니다.
})();
// ----
// 형변환
// ----
(() => {
    console.log('null 형변환', Number(null) === 0, (!!null) === false, String(null) === 'null');
    console.log('undefined 형변환', isNaN(Number(undefined)), (!!undefined) === false, String(undefined) === 'undefined');
    console.log("문자열 '0' 형변환", Number('0') === 0, (!!'0') === true, String('0') === '0');
    console.log("숫자 0 형변환", Number(0) === 0, (!!0) === false, String(0) === '0');
    console.log("NaN 형변환", isNaN(Number(NaN)), (!!NaN) === false, String(NaN) === 'NaN');

    console.log("Number('1') === 1", Number('1') === 1); // true. Number(), String()등을 이용하여 명시적으로 형변환 할 수 있습니다. 

    const val = 10;
    console.log('val === 10', val === 10); // true
    console.log("val.toString() === '10'", val.toString() === '10'); // true. 문자열로 바꿉니다.
    
    console.log("parseInt('1', 10) === 1", parseInt('1', 10) === 1); // true. 정수로 바꿉니다.
    console.log("parseFloat('1.5') === 1.5", parseFloat('1.5') === 1.5); // true. 실수로 바꿉니다.    
})();
// ----
// nullish
// ----
(() => {
    function getColor1(obj) {
        if (obj.color !== null && obj.color !== undefined) {
            return obj.color;
        }
        else {
            return obj.parent.color;
        }
    }
    function getColor2(obj) {
        return (obj.color !== null && obj.color !== undefined) ? obj.color : obj.parent.color;
    }
    function getColor3(obj) {
        return obj.color || obj.parent.color; // (X) 오동작. obj.color가 true로 형변환 되면, obj.color를 사용하고, 그렇지 않으면, obj.parent.color를 사용합니다. obj.color === 0 이면, obj.parent.color를 사용합니다.
    }   

    function getColor4(obj) {
        return obj.color ?? obj.parent.color; 
    }   

    const parent = {
        color: 0xFF0000,
    }
    const nullObj = {
        parent: parent,
        color: null // null 입니다. parent 색상을 사용해야 합니다.
    };
    const blackObj = {
        parent: parent,
        color: 0x000000 // 색상값이 있습니다. 자신의 색상을 이용해야 합니다.
    };

    console.log('parent의 color를 사용합니다.', getColor1(nullObj) === 0xFF0000, getColor2(nullObj) === 0xFF0000, getColor3(nullObj) === 0xFF0000);
    console.log('자기 자신의 color를 사용합니다.', 
        getColor1(blackObj) === 0x000000,
        getColor2(blackObj) === 0x000000, 
        getColor3(blackObj) === 0xFF0000 // getColor3()가 parent.color를 사용합니다.
    );
    console.log('자기 자신의 color를 사용합니다.', 
        getColor1(blackObj) === 0x000000, 
        getColor2(blackObj) === 0x000000, 
        getColor4(blackObj) === 0x000000
    ); 
})();
// ----
// 함수
// ----
(() => {
    // #1. 함수 선언
    function add(a, b) {
        return a + b;
    }

    // #2. 함수 표현식
    const addFunc = function(a, b) {
        return a + b;
    };

    console.log('add(1, 2)', add(1, 2)); // 3
    console.log('addFunc(1, 2)', addFunc(1, 2)); // 3

    // #3. 변수 대입후 호출
    const addVar1 = add;
    const addVar2 = addFunc;
    console.log('addVar1(1, 2)', addVar1(1, 2)); // 3
    console.log('addVar2(1, 2)', addVar2(1, 2)); // 3
})();
// ----
// 즉시 실행 함수를 이용한 유효 범위 한정
// ----
(() => {
    console.log('즉시 실행 함수', 
        ( // 함수 선언부를 괄호로 감쌉니다.
            function(a, b) {
                return a + b;
            }
        )(1, 2)
    ); // 3
})();
(function() {
    const myApp = {};
    console.log('전역 개체 최소화', myApp); // myApp은 즉시 실행되고 소멸됩니다.
})();

// ----
// 함수 호이스팅
// ----
(() => {
    console.log("함수 호이스팅", myHoisting(1, 2)); // 3. 함수 선언 전에 사용할 수 있습니다.

    function myHoisting(a, b) {
        return a + b;
    }    
})();
(() => {
    // console.log("함수 표현식 호이스팅", myHoisting(1, 2)); // (X) 오류 발생. 함수 표현식은 변수 호이스팅을 합니다. 따라서 undefined 입니다.

    const myHoisting = function(a, b) {
        return a + b;
    }  
})();

// ----
// 문자열로부터 함수 생성
// ----
(() => {
    const myAdd = new Function('a', 'b','return a + b'); // 임의의 문자열로 함수를 생성합니다.
    console.log('문자열로부터 함수 생성', myAdd(1, 2)); // 3    
})();
(() => {
    function add(a, b) {
        return a + b;
    }
    add.data = 'Lee'; // 개체처럼 함수도 속성을 갖습니다.
    console.log("함수 속성", add.data);    
})();
// ----
// 중첩 함수
// ----
(() => {
    function outer(a, b) {
        function nestFunc(param1, param2) {
            return param1 + param2; // 상위 함수의 변수에 접근 가능합니다.
        }
    
        return nestFunc(1, 2);
    }
    console.log('중첩 함수', outer(1, 2)); // 3    
})();
// ----
// 중첩 함수
// ----
(() => {
    const counter = (function() { // #1. 함수를 즉시 실행합니다. 중첩된 함수인 #3함수를 리턴합니다.
        var count = 0; // #2. 함수의 지역 변수입니다. 외부에서 직접 접근할 수 없습니다.
        return function() { // #3. 중첩된 함수입니다.
            return ++count; // #4. count 변수는 #2입니다. #3 함수가 참조하므로 #1함수가 소멸되더라도 #2는 소멸되지 않습니다.
        };
    })();
    
    // #5. #1 함수는 소멸되었지만, #3 함수를 counter에 전달받아 사용합니다. 
    // 이에 따라 #2 변수는 소멸되지 않고 사용됩니다. 
    console.log('클로저와 정보 은닉 : ', counter()); // 1
    console.log('클로저와 정보 은닉 : ', counter()); // 2
    console.log('클로저와 정보 은닉 : ', counter()); // 3    
})();
// ----
// 화살표 함수
// ----
(() => {
    const add = function (a, b) {
        return a + b;
    };
    console.log('일반 함수', add(1, 2)); // 3    
})();
(() => {
    const add = (a, b) => {
        return a + b;
    };
    console.log('화살표 함수', add(1, 2)); // 3    
})();
(() => {
    const add = (a, b) => a + b;
    console.log('화살표 함수', add(1, 2)); // 3    
})();

// ----
// 기본값 인자
// ----
(() => {
    function add(a = 1, b = 2) {
        return a + b;
    }
    console.log('인수를 전달하면, 전달한 값을 사용합니다', add(10, 20) === 30);
    console.log('인수가 없으면, 기본값을 사용합니다', add() === 3);
})();
// ----
// 나머지 인자
// ----
(() => {
    function f(...params) {
        console.log('...params는 배열입니다', Array.isArray(params));
        params.forEach((param) => console.log('param은 배열 요소입니다', param));
    }
    f(1, 2, 3);
})();

(() => {
    function sum(first, ...rest) {
        return first + ((rest.length === 1) ? rest[0] : sum(...rest)); // ...rest는 배열을 다시 분리하여 나열합니다. spread 참고
    }
    
    console.log('나머지 인자를 재귀적으로 호출합니다', sum(1, 2, 3) === 1 + 2 + 3);    
})();
// ----
// alert(),  confirm(), prompt()
// ----
(() => {
    alert('안녕하세요.'); // 메시지를 표시합니다.

    const result1 = confirm('제목입니다.', '메시지 입니다.');
    alert(result1); // 확인시 true, 취소시 false 입니다.
    
    const result2 = prompt('제목입니다.', '내용을 입력하세요.'); // input을 통해 내용을 입력받습니다.
    alert(result2); // 확인 클릭시 입력받은 내용입니다. 취소시 null 입니다.
})();  
// ----
// 개체
// ----
(() => {
    const empty = {}; // 빈 개체

    // 리터럴 방식 개체 생성
    const user1 = {
        name: 'Lee',
        number: '123-4567',
        getName: function() { // #1. 함수를 사용할 수 있으며 메서드라고 합니다.
            return this.name; // #2. this는 자기 자신을 나타냅니다.
        }
    };
    // alert(user1); // #3. object Object
    console.log(user1); // #3. Object. 트리를 확장하여 내부 속성값을 확인할 수 있습니다.{name: 'Lee', number: '123-4567', getName: f}
    
    console.log('개체 메서드 호출 user1.getName()', user1.getName()); // Lee
    
    // #4. new Object 방식 
    const user2 = new Object();
    user2.name = 'Lee';
    user2.getName = function() {
        return this.name;
    }; 
    console.log('개체 메서드 호출 user2.getName()', user2.getName()); // Lee    
})();
// 개체 속성 접근
(() => {
    const user = {
        name: 'Lee',
        'addr': 'Seoul', // 속성명을 문자열로 선언할 수 있습니다.
        1 : '1',
        2 : '2',
        'my number': '123-4567' // 속성명에 공백 문자등 일반적으로 사용할 수 없는 문자가 있으면 문자열로만 선언할 수 있습니다.
    };
    console.log("개체 속성 접근 user.name === 'Lee'", user.name === 'Lee'); // 마침표로 속성값에 접근합니다.
    console.log("개체 속성 접근 user.addr === 'Seoul'", user.addr === 'Seoul'); 
    console.log("개체 속성 접근 user[1] === '1'", user[1] === '1'); // 속성명이 숫자이면 배열처럼 접근할 수 있습니다.
    console.log("개체 속성 접근 user[2] === '2'", user[2] === '2'); 
    console.log("개체 속성 접근 user['my number'] === '123-4567'", user['my number'] === '123-4567'); // 일반적으로 사용할 수 없는 속성명이면, [] 로 접근할 수 있습니다.     
})();
// 개체 속성 추가/삭제
(() => {
    const user = {};
    user.name = 'Lee'; // name 속성이 없으면 추가합니다.
    console.log("속성 추가 user.name === 'Lee'", user.name === 'Lee'); // name 속성이 추가되었습니다.
    
    delete user.name;
    console.log("속성 삭제 후 user.name === undefined", user.name === undefined); // name 속성이 삭제되었습니다.    
})();
// 속성 나열
(() => {
    const user = {
        name: 'Lee',
        'addr': 'Seoul', 
        1 : '1',
        2 : '2',
        'my number': '123-4567' 
    };
    
    for (let prop in user) { // prop은 속성명, user[prop]은 속성값
        console.log('속성명 :' + prop , '속성값 :' + user[prop]);
    }    
})();
(() => {
    const arr = ['one', 'two', 'three'];
    arr.extraData = "추가 정보 입니다."; // 속성을 추가합니다.
    for (let prop in arr) { // 배열 요소와 추가 속성이 나열됩니다.
        console.log('속성명 :' + prop , '속성값 :' + arr[prop]);
    }    
})();
// ----
// 개체 복제/동결
// ----
(() => {
    const user1 = {name: 'Lee'};
    const user2 = user1;
    user2.name = 'Kim';
    console.log("동일 개체를 참조합니다 user1.name === 'Kim'", user1.name === 'Kim'); // true. user2를 수정했지만, user1도 수정되었습니다.
})();
(() => {
    const user1 = {
        name: 'Lee',
        detail: {
            addr: 'Seoul'
        }
    };
    const user2 = Object.assign({}, user1); // 복제합니다.
    user2.name = 'Kim';
    user2.detail.addr = 'Busan';
    
    console.log("개체 복제 user1.name === 'Lee'", user1.name === 'Lee'); // true. user2를 수정했지만, user1은 수정되지 않습니다.
    console.log("개체 복제 user2.name === 'Kim'", user2.name === 'Kim');
    
    console.log("하위 개체는 여전히 참조 user1.detail.addr === 'Busan'", user1.detail.addr === 'Busan'); // true. 하위 개체는 얕은 복사됩니다.
    console.log("하위 개체는 여전히 참조 user2.detail.addr === 'Busan'", user2.detail.addr === 'Busan');    
})();
(() => {
    const user1 = {
        name: 'Lee',
        detail: {
            addr: 'Seoul'
        }
    };
    const user2 = JSON.parse(JSON.stringify(user1)); // 하위 개체의 속성까지 복제합니다.
    user2.name = 'Kim';
    user2.detail.addr = 'Busan';
    
    console.log("개체 복제 user1.name === 'Lee'", user1.name === 'Lee'); 
    console.log("개체 복제 user2.name === 'Kim'", user2.name === 'Kim');
    
    console.log("하위 개체도 복제 user1.detail.addr === 'Seoul'", user1.detail.addr === 'Seoul'); // 하위 개체도 복제됩니다.
    console.log("하위 개체도 복제 user2.detail.addr === 'Busan'", user2.detail.addr === 'Busan');    
})();


(() => {
    function User(name) { // 생성자 함수
        this.name = name;
    }
    const user1 = new User('Lee'); 
    const user2 = Object.assign(Object.create(User.prototype), user1); // 동일한 prototype을 사용할 수 있도록 Object.create()를 이용합니다.
    const user3 = {...user1};

    console.log('생성자 함수 User로 생성했습니다.', user1 instanceof User);
    console.log('create()와 assign()으로 복제했습니다.', user2 instanceof User);
    console.log('spread로 개체 속성을 복제한 개체입니다.', user3 instanceof User === false);
})();
// ----
// JSON
// ----
(() => {
    const obj = {
        x: 10,
        y: 20,
        value: '문자열',
        datas: [1, 2, 3]
    };
    
    const str = JSON.stringify(obj);
    console.log('JSON으로 만든 문자열', str === '{"x":10,"y":20,"value":"문자열","datas":[1,2,3]}');  
    
    const result = JSON.parse(str);
    console.log('JSON 문자열로부터 개체 생성', result.x === 10 && result.y === 20 && result.value === '문자열' && result.datas[0] === 1 && result.datas[1] === 2 && result.datas[2] === 3);
})();
// ----
// 개체의 생성자 함수
// ----
(() => {
    const user1 = {
        name: 'Kim',
        number: '123-4567',
        getName: function() {return this.name;} // 메서드 선언 코드가 중복됩니다.
    };
    const user2 = {
        name: 'Lee',
        number: '111-2222',
        getName: function() {return this.name;} // 메서드 선언 코드가 중복됩니다.
    };    
})();
(() => {
    function User(name, number) { // #1. 일반 함수와 구분하기 위해 Pascal 표기법을 사용합니다.
        this.name = name; // #2. this는 생성될 개체입니다.
        this.number = number;
        this.getName = function() {
            return this.name;
        };
        // 암시적으로 this 개체를 리턴합니다.
    }
    
    const user1 = new User('Kim', '123-4567'); // #3. new로 함수를 호출합니다.
    const user2 = new User('Lee','111-2222');
    
    console.log('user1.getName()', user1.getName()); // Kim
    console.log('user2.getName()', user2.getName()); // Lee    
})();
(() => {
    function User(name) { 
        this.name = name; 
    }
    const user = User('Kim'); 
    
    console.log('리턴값이 없으므로 user는 undefined 입니다', user === undefined); // #1
    console.log('this는 전역 개체이므로 전역 개체에 name을 저장합니다.', name === 'Kim'); // #2    
})();
// ----
// 속성 축약 표현
// ----
(() => {
    const x = 10;
    const y = 20;
    const obj = {
        x: x, 
        y: y
    };    
})();
(() => {
    const x = 10;
    const y = 20;
    const obj = {
        x, // x: x 와 동일합니다.
        y // y: y 와 동일합니다.
    };
    console.log('속성 축약 표현', obj.x === 10 && obj.y === 20);    
})();
// ----
// 속성명 동적 생성
// ----
(() => {
    const index = 10;
    const obj = {
        [`myData-${index + 1}`]: 1 // 속성명을 myData-11로 만듭니다.
    };
    console.log('속성명 동적 생성', obj['myData-11'] === 1);    
})();
// ----
// 메서드 축약 표현
// ----
(() => {
    const obj1 = {
        myMethod: function() {
        },
    };
    const obj2 = {
        myMethod() { // 축약해서 표현합니다.
        },
    };    
})();
// ----
// 배열
// ----
(() => {
    const empty = []; // #1. 빈 배열입니다.
    const arr = [1, 'Kim', 2]; // #2. 타입이 다르더라도 배열로 사용할 수 있습니다.
    for (let i = 0; i < arr.length; ++i) { // #3. length 로 길이를 구할 수 있습니다.
        console.log('배열 요소', arr[i]); // 1 Kim 2 출력
    }  
    
    for (let i = 0; i < arr.length; ++i) { 
        arr[i] = i * 10; // #4
    }
    console.log('수정된 배열값', arr[0] === 0 && arr[1] === 10 && arr[2] === 20);  

    const multiArr = [[1, 2, 3], [10, 20, 30]]; // #5
    console.log('다차원 배열', 
        multiArr[0][0] === 1 && multiArr[0][1] === 2 && multiArr[0][2] === 3,
        multiArr[1][0] === 10 && multiArr[1][1] === 20 && multiArr[1][2] === 30
    );      
})();
(() => {
    const arr = new Array(2); // 요소가 2개인 배열을 생성합니다.
    console.log("Array()로 생성할 수 있습니다", arr.length === 2);    
})();
// 배열 요소 추가/삭제
(() => {
    const arr = []; // 빈 배열입니다.
    arr[3] = 30; // #1. 3번 인덱스 요소가 없다면 요소를 추가하고, 30을 대입합니다. 
    console.log('배열의 3번 인덱스 요소만 추가했지만, 0, 1, 2도 없어서 추가되었습니다', arr.length === 4); // #1-1
    console.log('값을 대입받지 않은 요소는 undefined입니다', arr[0] === undefined); // #1-2
    
    delete arr[3]; // #2. 3번 인덱스 요소를 삭제합니다.
    console.log('3번 인덱스를 delete 했지만 크기는 4입니다', arr.length === 4);
    console.log('3번 인덱스는 delete 되어 undefined입니다', arr[3] === undefined);    
})();
(() => {
    const arr = []; 
    const length = arr.push(100); 
    console.log('배열의 끝에 추가합니다', arr.length === 1 && arr[0] === 100, arr.length === length);
    
    arr[arr.length] = 200; // push() 보다 성능이 좋습니다.
    console.log('배열의 끝에 추가합니다', arr.length === 2 && arr[1] === 200);
    
    const removed = arr.pop();
    console.log('배열의 마지막 요소를 제거합니다.', arr.length === 1 && removed == 200);
})();
(() => {
    const arr = [0, 1, 2, 3]; 
    const length = arr.unshift(100); 
    console.log('uhshift로 추가합니다.', arr.length === 5 && arr[0] === 100, arr.length === length);
    const removed = arr.shift(); 
    console.log('uhshift로 제거합니다.', arr.length === 4 && arr[0] === 0 && removed === 100);
})();
(() => {
    const arr = [0, 1, 2, 3]; 
    let removed = arr.splice(1, 2); // 1번 index부터 2개 요소를 지웁니다. 
    console.log('splice로 제거합니다.', arr.length === 2 && arr[0] === 0 && arr[1] === 3, removed[0] === 1 && removed[1] === 2);
    removed = arr.splice(1, 0, 10, 20); // 1번 index 부터 0개 요소를 지운뒤 10, 20을 추가한 배열을 리턴합니다.
    console.log('splice로 추가합니다.', arr.length === 4 && arr[0] === 0 && arr[1] === 10 && arr[2] === 20 && arr[3] === 3, removed.length === 0);
})();
(() => {
    const arr = [0, 1, 2, 3]; 
    const filtered = arr.filter((data) => data < 2); // 요소값이 2보다 작은 것만 필터링합니다. 즉, 2이상인 것은 삭제합니다.
    console.log('filter로 2보다 작은 것만 필터링합니다.', filtered.length === 2 && filtered[0] === 0 && filtered[1] === 1);
})();
// 배열 요소 나열
(() => {
    const arr = [1, 2, 3];
    for (let i = 0; i < arr.length; ++i) {
        console.log('for문으로 요소 나열', arr[i]);
    }
    for (const item of arr) {
        console.log('for of 로 요소 나열', item);    
    }
    for (let prop in arr) { // 배열 요소와 추가 속성이 나열됩니다. 성능일 떨어지니 사용하지 마세요.
        console.log('for in 으로 요소 나열', arr[prop]);
    }
    arr.forEach(
        (item) => console.log('forEach()로 요소 나열', item)
    );    
})();
// 배열 변형
(() => {
    const arr = [1, 2, 3];
    const result = arr.map((item) => item * 10);
    console.log('map으로 각 요소에 10을 곱함', result[0] === 10 && result[1] === 20 && result[2] === 30);  
})();
(() => {
    const datas = [{id: 10, value: 5}, {id: 11, value: 15}, {id: 12, value: 20}];
    const result = datas.filter((data) => data.value > 10).map((data) => data.id); 
    console.log('filter후 map을 적용', result[0] === 11 && result[1] === 12);
})();
// 배열 복제
(() => {
    const arr = [1, 2, 3];
    const other1 = arr;
    console.log('other1 = arr은 같은 배열 개체를 참조합니다', other1 === arr && other1 === arr);
    
    const other2 = Array.from(arr);
    console.log('other2 = Array.from(arr)은 값은 같지만 다른 배열 개체입니다', other2, other2 !== arr);
    
    const other3 = arr.slice();
    console.log('other2 = arr.slice()은 배열의 특정 부분을 잘라 복사합니다. 값은 같지만 다른 배열 개체입니다', other3, other3 !== arr);
    
    const other4 = [...arr];
    console.log('[...arr]은 arr 요소들로 새로운 배열을 만듭니다. 값은 같지만 다른 배열 개체입니다', other4, other4 !== arr);    
})();
// ----
// 유사 배열
// ----
(() => {
    const str = 'Kim';
    console.log('유사 배열', Array.isArray(str) === false); // true. 배열이 아닙니다.
    for (let i = 0; i < str.length; ++i) { 
        console.log('유사 배열 요소', str[i]); // K i m 출력
    }    
})();
// ----
// 문자열
// ----
(() => {
    const str = 'abcde';
    console.log('문자열 길이', str.length === 5);
    console.log('하위 문자열 탐색', str.indexOf('cde') === 2);
    console.log('하위 문자열 유무', str.includes('cde') === true);
    console.log('문자열 합성', str.concat('fg') === 'abcdefg', str === 'abcde');
    console.log('하위 문자열 지정한 위치까지 추출', str.slice(2, 5) === 'cde', str === 'abcde');
    console.log('하위 문자열 마지막까지 추출', str.slice(2) === 'cde', str === 'abcde');  
    console.log('하위 문자열 변경', str.replace('cde', 'CDE') === 'abCDE', str === 'abcde');  
    
    str.toUpperCase();
    console.log('대문자로 변경', str.toUpperCase() === 'ABCDE');
    str.toLowerCase();
    console.log('소문자로 변경', str.toLowerCase() === 'abcde');

    const datas = '홍길동, 성춘향, 이몽룡'; // 콤마 뒤에 공백 문자를 넣어 봤습니다.
    const result1 = datas.split(','); // 쉼표로 구분합니다.
    console.log(', 로 파싱', result1[0] === '홍길동' && result1[1] === ' 성춘향' && result1[2] === ' 이몽룡'); // #1. 데이터에 공백 문자가 남아 있습니다.

    const result2 = datas.split(/,| /); // 쉼표 또는 공백 문자로 구분합니다.
    console.log(', 또는 공백 문자로 파싱', result2[0] === '홍길동' && result2[1] === '' && result2[2] === '성춘향' && result2[3] === '' && result2[4] === '이몽룡'); // #2. 빈문자열이 추가되어 있습니다.

    const result3 = datas.split(/,| /).filter((data) => data != '');
    console.log('파싱 후 필터링', result3[0] === '홍길동' && result3[1] === '성춘향' && result3[2] === '이몽룡'); // #3
})();
// ----
// Spread
// ----
(() => {
    function f(a, b, c) {
        return a + b + c;
    }
    
    console.log('배열 [1, 2, 3]을 나열해서 전달합니다', f(...[1, 2, 3]) === 1 + 2 + 3);     
})();
(() => {
    const arr = [1, 2, 3];

    console.log('Spread를 이용한 배열 복제(slice)', [...arr]); // [1, 2, 3]
    arr.push(...[4, 5]);
    console.log('기존 배열과 다른 배열 합성한 새로운 배열 리턴(concat)', arr); // [1, 2, 3, 4, 5]
    console.log('기존 배열에 새로운 값들을 추가한 새로운 배열 리턴', [...arr, 6, 7]); // [1, 2, 3, 4, 5, 6, 7]
    console.log('기존 배열에 새로운 배열을 추가한 새로운 배열 리턴', [...arr, [6, 7]]); // [1, 2, 3, 4, 5, [6, 7]]    
})();
(() => {
    console.log('개체를 복제하지만, prototype은 복제되지 않습니다', {...{ x: 1, y: 2 } }); // { x: 1, y: 2 } 
    console.log('개체를 합성하여 새 개체를 생성합니다', { x: 1, y: 2, ...{ a: 3, b: 4 } }); // {x: 1, y: 2, a: 3, b: 4 }
    console.log('두 개체를 합성하여 새로운 개체를 생성합니다. 중복된 속성값은 덮어씁니다', { ...{ x: 1, y: 2 }, ...{ y: 100, z: 3 } }); // { x: 1, y: 100, z: 3 }
    console.log('속성을 추가한 새 개체를 생성합니다', { ...{ x: 1, y: 2 }, z: 3 }); // { x: 1, y: 2, z: 3 }
})();
// ----
// 구조 분해
// ----
(() => {
    const arr = [1, 2, 3];
    const [a, b, c] = arr;
    console.log('배열 구조 분해', a === 1 && b === 2 && c === 3);
    
    const [i, , k] = arr;
    console.log('배열은 순서대로 구조 분해됩니다. i, , k는 1번 인덱스를 건너뜁니다', i === 1 && k === 3);
    
    const obj = {
        x: 1,
        y: 2,
        z: 3
    };
    const {x, y} = obj; // obj에서 x, y만 추출합니다.
    console.log('개체 구조 분해', obj.x === 1 && obj.y === 2);
    
    const user = {
        name: 'Kim',
        info: {
            addr: 'Seoul',
            number: '123-4567'
        }
    };
    const {name, info: {addr}} = user; // 중첩 개체도 분해합니다.
    console.log('중첩 개체도 분해해서 읽습니다', name === 'Kim' && addr === 'Seoul');    
})();





