// ----
// 프로토타입
// ----
(() => {
    const user = {
        name: 'Lee'
    };
    console.dir(user); 
})();
(() => {
    const user = {
        name: 'Lee'
    };
    
    console.log('프로토타입 user.__proto__ === Object.prototype', user.__proto__ === Object.prototype); // true    
})();
// ----
// [[Prototype]]과 __proto__와 prototype과 constructor
// ----
(() => {
    function User(name) { // 생성자 함수
        this.name = name;
    }
    
    const user = new User('Lee'); // 생성자 함수로 생성한 개체
    
    console.log('User.prototype과 user.__proto__ 는 동일한 프로토타입 개체를 가리킵니다.', User.prototype === user.__proto__); 
    console.log('프로토타입 개체의 constructor는 생성자 함수입니다.', user.__proto__.constructor === User);    
})();
// ----
// 프로토타입 체인을 이용한 속성 참조
// ----
(() => {
    function User(name) {
        this.name = name;
    }
    User.prototype.addr = 'Seoul'; // 프로토타입에 addr 속성을 추가합니다.
    
    const user1 = new User('Kim');
    const user2 = new User('Lee');
    
    console.log('user1과 user2는 프로토타입이 같습니다.', user1.__proto__ === user2.__proto__); 
    
    // user1.name, user2.name은 addr 속성이 없으므로 User.prorotype.addr을 사용합니다.
    console.log('addr은 프로토타입의 속성입니다', user1.name === 'Kim' && user1.addr === 'Seoul'); 
    console.log('addr은 프로토타입의 속성입니다', user2.name === 'Lee' && user2.addr === 'Seoul');     

    // __proto__의 addr을 수정합니다. 
    // User.prototype.addr = 'Pusan'; 과 동일합니다.
    user1.__proto__.addr = 'Pusan'; 

    // user1, user2는 같은 __proto__를 공유하므로 Pusan 입니다.
    console.log('user1.addr은 Pusan 입니다', user1.addr === 'Pusan'); 
    console.log('user2.addr은 Pusan 입니다', user2.addr === 'Pusan');   

    user2.addr = 'Seoul'; // user2에 addr 속성을 추가합니다.
    console.log('user1.addr은 Pusan 입니다', user1.addr === 'Pusan');
    console.log('user2.addr은 Seoul 입니다', user2.addr === 'Seoul'); 
})();
(() => {
    String.prototype.add = function(a, b) {
        return a + b;
    }
    console.log('기본타입인 String에 add 함수를 추가했습니다. String.add(1, 2)', 'test'.add(1, 2)); // 3  
})();
// ----
// 프로토타입 변경
// ----
(() => {
    function User(name) {
        this.name = name;
    }
    User.prototype = { // 프로토타입을 다른 개체로 변경할 수도 있습니다.
        constructor: User, // 생성자 함수로 설정합니다.
        addr: 'Seoul'
    };
    
    const user1 = new User('Kim');
    const user2 = new User('Lee');
    
    // user1.name, user2.name은 addr 속성이 없으므로 User.prorotype.addr을 사용합니다.
    console.log('addr은 프로토타입의 속성입니다', user1.name === 'Kim' && user1.addr === 'Seoul'); 
    console.log('addr은 프로토타입의 속성입니다', user2.name === 'Lee' && user2.addr === 'Seoul'); 
    
    // prototype 값을 수정하면, 생성한 모든 개체에 반영됩니다.
    User.prototype.addr = 'Busan'; 
    console.log(user1.name === 'Kim' && user1.addr === 'Busan');
    console.log(user2.name === 'Lee' && user2.addr === 'Busan');     
})();
(() => {
    function User(name) {
        this.name = name;
    }
    User.prototype.getName = function() { // 프로토타입 개체에 1개만 선언합니다.
        return this.name;
    };
    
    const user1 = new User('Kim');
    const user2 = new User('Lee');
    
    console.log('프로토타입 메서드 호출', user1.getName()); // Kim
    console.log('프로토타입 메서드 호출', user2.getName()); // Lee    
})();
// ----
// 함수 호출 방식에 따른 this 변경
// ----
(() => {
    var name = 'Global'; // 전역 변수

    // #1. 일반 함수에서의 this
    function getName() {
        return this.name; // this는 전역 개체입니다. 
    }
    console.log('일반 함수에서 this는 전역 개체입니다', getName() === 'Global');  
    
    // #2. this를 다른 개체에 연결
    const obj = {
        name: 'Kim'
    };
    console.log('this를 다른 개체에 바인딩하여 사용할 수 있습니다', getName.call(obj) === 'Kim'); // getName 함수의 this를 obj에 바인딩합니다. 
    console.log('this를 다른 개체에 바인딩하여 사용할 수 있습니다', getName.apply(obj) === 'Kim'); // call()과 유사하며, 추가 인수로 배열을 사용합니다.
    const bindFunc = getName.bind(obj);
    console.log('this를 다른 개체에 바인딩하여 사용할 수 있습니다', bindFunc() === 'Kim');
    
    // #3. 개체 메서드에서의 this
    const user1 = {
        name: 'Lee',
        getName: function() {
            return this.name; // this는 user1입니다.
        }
    };
    console.log('개체 메서드에서 this는 user1입니다', user1.getName() === 'Lee'); 
    
    // #4. 생성자 함수의 this
    function User(name) {
        this.name = name;
        this.getName = function() {
            return this.name; // this는 생성자 함수가 리턴하는 개체입니다.
        };
    }
    const user2 = new User('Kim');
    console.log('생성자 함수의 this는 리턴하는 개체입니다', user2.getName() === 'Kim'); 
    
    // #5. 중첩 함수에서의 this
    const user3 = {
        name: 'Park',
        getNestName: function() {
            function f() {
                return this.name; // this는 전역 개체입니다. 
            }
            return f();
        },
        getName: function() {
            var that = this; // 클로저를 활용하여 that으로 저장해 둡니다.
            function f() {
                return that.name; // that은 바깥 함수의 this입니다.
            }
            return f();
        }
    };
    
    console.log('중첩 함수에서 this는 전역 개체입니다', user3.getNestName() === 'Global'); 
    console.log('that을 사용할 수 있습니다', user3.getName() === 'Park'); 
    
    // #6 화살표 함수의 this
    const user4 = {
        name: 'Park',
        getArrowName: () => { // 메서드를 화살표 함수로 선언했습니다.
            return this.name; // this는 전역 개체입니다. 
        },        
        getNestName: function() {
            function f() {
                return this.name; // this는 전역 개체입니다. 
            }
            return f();
        },
        getArrowNestName: function() {
            const arrow = () => {
                return this.name; // 화살표 함수에서는 this가 없어 상위 환경에서 찾습니다.
            }
            return arrow();
        },
    }
    console.log('메서드를 화살표 함수로 선언했습니다. this는 상위 환경인 전역 개체입니다', user4.getArrowName() === 'Global');
    console.log('중첩 함수에서의 this는 전역 개체입니다', user4.getNestName() === 'Global'); 
    console.log('화살표 함수에서의 this는 상위 환경에서 찾습니다', user4.getArrowNestName() === 'Park');
    
    // #7. prototype에서의 this
    function PrototypeUser(name) {
        this.name = name;
    }
    PrototypeUser.prototype.getName = function() {
        return this.name; // 해당 메서드를 호출한 개체입니다.
    }
    var user5 = new PrototypeUser('Kim');
    var user6 = new PrototypeUser('Lee');
    
    console.log('프로토타입 메서드에서 this는 user5입니다', user5.getName() === 'Kim'); // this는 user5입니다.
    console.log('프로토타입 메서드에서 this는 user6입니다', user6.getName() === 'Lee'); // this는 user6입니다.    
})();
