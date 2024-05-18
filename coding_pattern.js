// ----
// 코딩 패턴 - 즉시 실행 함수를 이용한 모듈화
// ----
(() => {
    const Module = (() => { // 즉시 실행 함수입니다.
        const privateFunc = (a, b) => { // 외부에서 접근할 방법이 없습니다.
            return a + b;
        };
        const publicFunc = (a, b) => { // 외부에서 접근할 수 있도록 리턴합니다.
            return privateFunc(a, b);
        }; 
    
        // public 함수 선언들로 구성된 개체를 리턴합니다.
        return {
            publicFunc: publicFunc // 함수가 리턴되므로 함수 실행 환경이 소멸되지 않고 유지됩니다.
        };
    })();
    
    console.log('모듈의 public 함수 호출', Module.publicFunc(1, 2)); // 3
    //Module.privateFunc(a, b); // (X) 오류 발생. 접근할 수 없습니다.    
})();
// ----
// 코딩 패턴 - 즉시 실행 함수를 이용한 개체 선언
// ----
(() => {
    const User = (() => { // 즉시 실행 함수입니다.
        function User(name) { // #1
            this.name = name;
        }
        User.prototype.getName = function() { // 메서드는 프로토타입에 선언합니다.
            return this.name;
        }; 
        
        return User; // #1. 생성자 함수를 리턴합니다.
    })();
    
    const user1 = new User('Kim');
    const user2 = new User('Lee');
    
    console.log('즉시 실행 함수를 이용한 개체 선언', user1.getName()); // Kim
    console.log('즉시 실행 함수를 이용한 개체 선언', user2.getName()); // Lee     
})();
// ----
// 코딩 패턴 - MixIn을 이용한 메서드 동적 추가
// ----
(() => {
    const user1 = {name: 'Kim'};
    const user2 = {name: 'Lee'};
    
    const getNameMixIn = (obj) => {
        obj.getName = function() {
            return this.name;
        };
    }; 
    
    // user1, user2에 getName 메서드를 만들어 줍니다.
    getNameMixIn(user1); 
    getNameMixIn(user2);
    
    console.log('MixIn으로 추가된 메서드', user1.getName()); // Kim
    console.log('MixIn으로 추가된 메서드', user2.getName()); // Lee   
})();
(() => {
    const user1 = {name: 'Kim'};
    const user2 = {name: 'Lee'};
    
    const MixInModule = (() => {
        const getNameMixIn = (obj) => {
            obj.getName = function() {
                return this.name;
            };
        };
        const printNameMixIn = (obj) => {
            obj.printName = function() {
                console.log(this.name);
            };
        };
    
        // MixIn 함수 선언들로 구성된 개체를 리턴합니다.
        return {
            getNameMixIn: getNameMixIn,
            printNameMixIn: printNameMixIn,
        };
    })();       
    
    // user1, user2에 추가할 메서드들을 MixInModule에서 선택적으로 결합합니다.
    MixInModule.getNameMixIn(user1); 
    MixInModule.printNameMixIn(user2);
    
    console.log('MixInModule에서 추가된 메서드', user1.getName()); // Kim
    user2.printName(); // Lee 출력    
})();
// ----
// 코딩 패턴 - 정적 함수
// ----
(() => {
    const User = (() => { 
        function User(name) { 
            this.name = name;
        }
        User.prototype.getName = function() { 
            return this.name;
        }; 
    
        User.staticFunc = (msg) => { // 생성자 함수의 속성 메서드 입니다.
            console.log(msg);
        };
        
        return User; 
    })();
    
    const user1 = new User('Kim');
    const user2 = new User('Lee');
    
    console.log('개체의 메서드', user1.getName()); // Kim
    console.log('개체의 메서드', user2.getName()); // Lee
    User.staticFunc('생성자 함수의 속성 메서드입니다. 정적 함수와 유사합니다.');    
})();
// ----
// 코딩 패턴 - 클로저를 이용한 캡슐화
// ----
(() => {
    function Counter() {
        let count = 0; // 외부에서 접근 할 수 없는 변수입니다. 마치 private와 유사합니다.
    
        this.inc = () => {
            return ++count;
        };
        this.dec = () => {
            return --count;
        };
    };
    
    const counter = new Counter();
    
    console.log('counter', counter.inc()); // 1
    console.log('counter', counter.dec()); // 0    
})();
