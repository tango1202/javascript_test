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
