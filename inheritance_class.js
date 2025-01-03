// ----
// 자바스크립트에서 상속이 필요한가?
// ----
(() => {
    const Rectangle = (() => {  
        function Rectangle(l, t, w, h) { 
            this.left = l;
            this.top = t;
            this.width = w;
            this.height = h;   
        }
        Rectangle.prototype.draw = function() { // 메서드는 프로토타입에 선언합니다.
            console.log('Rectangle을 그립니다.', this.left, this.top, this.width, this.height);
        }; 
        
        return Rectangle; 
    })();
    const Ellipse = (() => {  
        function Ellipse(l, t, w, h) { 
            this.left = l;
            this.top = t;
            this.width = w;
            this.height = h;   
        }
        Ellipse.prototype.draw = function() { // 메서드는 프로토타입에 선언합니다.
            console.log('Ellipse을 그립니다.', this.left, this.top, this.width, this.height);
        }; 
        
        return Ellipse; 
    })();
    
    // #1. 배열에 아무 타입이나 들어가니 굳이 Shape으로 추상화할 필요가 없습니다.
    let shapes = [new Rectangle(1, 2, 3, 4), new Ellipse(10, 20, 30, 40)];
    shapes.forEach(
        // #2. 그냥 draw를 호출하면 됩니다. 인터페이스로 만들 필요가 없습니다.
        (shape) => shape.draw()
    );
})();
// ----
// 프로토타입을 이용한 상속
// ----
(() => {
    const Base = (() => {  
        function Base(baseProperty) { // #1
            this.baseProperty = baseProperty;   
        }
        Base.prototype.baseMethod = function() { 
            console.log('baseMethod 입니다', this.baseProperty);
        }; 
        
        return Base; 
    })();
    
    const Derived = (() => {  
        function Derived(baseProperty, derivedProperty) {
            Base.call(this, baseProperty); // #1. Base 생성자 함수를 호출합니다. 리턴하려는 this개체를 Base()함수 내의 this로 바인딩합니다.(Base 속성을 this에 추가합니다.)
            this.derivedProperty = derivedProperty;   
        }
    
        Object.setPrototypeOf(Derived.prototype, Base.prototype); // #2. Base.prototype의 속성들을 복제합니다.
    
        Derived.prototype.derivedMethod = function() { 
            console.log('derivedMethod 입니다', this.derivedProperty);
        }; 
        return Derived;
    })();
    
    const base = new Base('base');
    base.baseMethod(); // baseMethod 입니다 base
    
    const derived = new Derived('base from derived', 'derived'); 
    
    console.log('Base.prototype을 복제했지만, constructor는 Derived입니다', derived.__proto__.constructor === Derived);
    console.log('Derived.prototype.__proto__ === Base.prototype입니다', Derived.prototype.__proto__ === Base.prototype);
    console.log('derived는 Derived로부터 생성되었습니다', derived instanceof Derived);
    console.log('derived는 Base로부터 생성되었습니다', derived instanceof Base);
    
    derived.baseMethod(); // baseMethod 입니다 base from derived
    derived.derivedMethod(); // derivedMethod 입니다 derived    

    const OverridingDerived = (() => {  
        function OverridingDerived(baseProperty, derivedProperty) {
            Base.call(this, baseProperty); 
            this.derivedProperty = derivedProperty;   
        }
        Object.setPrototypeOf(Derived.prototype, Base.prototype);
        OverridingDerived.prototype.baseMethod = function() { // baseMethod를 오버라이딩 합니다.
            console.log('Overriding 입니다', this.baseProperty);
        }; 
        return OverridingDerived;
    })();
    const overridingDerived = new OverridingDerived('base from derived', 'derived'); 
    overridingDerived.baseMethod(); // Overriding 입니다 base from derived    
})();
// ----
// 클래스를 이용한 상속
// ----
(() => {
    class Base { // 클래스는 관습적으로 Pascal 표기를 사용합니다.
        constructor(baseProperty) { // #1. 생성자 함수
            this.baseProperty = baseProperty;
        } 
        baseMethod() { // #2. 메서드는 알아서 프로토타입에 선언됩니다.
            console.log('baseMethod 입니다', this.baseProperty);
        } 
    };
    class Derived extends Base { // #3. 상속입니다. 아마도 내부적으로 setPrototypeOf()를 하겠죠.
        constructor(baseProperty, derivedProperty) { 
            super(baseProperty); // #4. 상위 생성자 함수를 호출합니다. 아마도, Base.call()을 호출하겠죠.
            this.derivedProperty = derivedProperty;
        }
        derivedMethod() { // #5. Derived에 메서드를 추가합니다.
            console.log('derivedMethod 입니다', this.derivedProperty);   
        }
    };
    
    const base = new Base('base'); // #6. 생성자 함수처럼 new 로 생성합니다.
    base.baseMethod(); // baseMethod 입니다 base
    console.log('baseMethod는 프로토타입에 선언됩니다.', base.baseMethod === base.__proto__.baseMethod); // #2. 메서드는 알아서 프로토타입에 선언됩니다.
    
    const derived = new Derived('base from derived', 'derived'); 
    
    console.log('Base.prototype을 복제했지만, constructor는 Derived입니다', derived.__proto__.constructor === Derived);
    console.log('derived는 Derived로부터 생성되었습니다', derived instanceof Derived);
    console.log('derived는 Base로부터 생성되었습니다', derived instanceof Base);

    derived.baseMethod(); // baseMethod 입니다 base from derived
    derived.derivedMethod(); // derivedMethod 입니다 derived    
})();
// ----
// 클래스 getter/setter/static
// ----
(() => {
    class MyClass { 
        constructor(data) { 
            this.data = data;
        } 
        get xVal() { // getter
            return this.data.x;
        }
        set xVal(x) { // setter
            this.data.x = x;
        }
    
        get yVal() {
            return this.data.y;
        }
        set yVal(y) {
            this.data.y = y;
        }
    
        static staticMethod() {
            return '정적 함수 입니다';
        }
    };
    const data = { x: 1, y: 2 };
    const myClass = new MyClass(data);
    console.log('getter를 이용하여 속성처럼 데이터를 참조할 수 있습니다', myClass.xVal === 1 && myClass.yVal === 2);
    
    myClass.xVal = 10;
    myClass.yVal = 20;
    console.log('setter를 이용하여 속성처럼 데이터를 수정할 수 있습니다', myClass.xVal === 10 && myClass.yVal === 20);
    
    console.log(MyClass.staticMethod()); // 정적 함수 입니다    
})();
// ----
// protected, private
// ----
(() => {
    class Base {
        _protectedVal = 0; // _는 관습적일 뿐, 실제 접근 통제를 하지 못합니다.
        get val() {
            return this._protectedVal;
        } 
        set val(val) {
            this._protectedVal = val;
        }
    };
    class Derived extends Base {
        inc() {
            this._protectedVal += 1;
        }
    };

    const data = new Derived();
    data._protectedVal = 10; // 접근이 가능합니다.
    data.inc();
    console.log('protected는 지원하지 않습니다.', data.val === 11);
})();
(() => {
    class Base {
        #privateVal = 0; // #은 자기 자신 외에는 접근할 수 없습니다.
        get val() {
            return this.#privateVal;
        } 
        set val(val) {
            this.#privateVal = val;
        }
    };
    class Derived extends Base {
        inc() {
            // this.#privateVal += 1; // (X) 자식 클래스에서도 접근할 수 없습니다.
            this.val += 1;
        }
    };

    const data = new Derived();
    // data.#privateVal = 10; // (X) 외부에서 접근할 수 없습니다.
    data.inc();
    console.log('getter, setter로만 접근할 수 있습니다.', data.val === 1);
})();
// ----
// 클래스 MixIn
// ----
(() => {
    class Data {
        constructor(a, b) { 
            this.a = a;
            this.b = b;
        } 
    };

    const BasicOperationMixIn = {
        plus: function() { // this를 사용하므로 화살표 함수를 사용하지 않습니다.
            return this.a + this.b;
        },
        minus: function() {
            return this.a - this.b;
        },
        multiply: function() {
            return this.a * this.b;
        },
        divide: function() {
            return this.a / this.b;
        } 
    };

    const data1 = new Data(1, 2);
    // data1.plus(); // (X) plus 메서드가 없으므로 오류

    Object.assign(data1, BasicOperationMixIn); // data1 개체에 사칙 연산 추가
    console.log('개체에 MixIn', data1.plus() === 1 + 2);

    const data2 = new Data(3, 4);
    // data2.plus(); // (X) data1에만 사칙연산을 추가 했으므로 data2는 plus 메서드가 없으므로 오류
    Object.assign(Data.prototype, BasicOperationMixIn); // 프로토타입 개체에 사칙 연산 추가
    console.log('프로타입에 MixIn', data2.plus() === 3 + 4);
    
    console.log('프로타입에 MixIn했으므로, 이후로 생성되는 모든 개체에 적용됨', (new Data(5, 6)).plus() === 5 + 6);  
})();   


