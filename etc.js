// ----
// 예외 발생과 탐지
// ----
(() => {
    const func = (obj) => {
        obj.print(); // (x) 예외 발생. print 메서드가 없습니다.
    };

    try {
        const myData = {};
        func(myData); // print 메서드가 없어서 예외를 발생시킵니다.
        console.log('func()을 실행했습니다.'); // #1
    }
    catch(e) {
        console.log('예외를 처리합니다.', e);
    }
})();
(() => {
    const add = (a, b) => {
        if (a < 0 || b < 0) {
            throw new RangeError('a또는 b는 0 이상이어야 합니다.');
        }
        return a + b;
    };

    try {
        add(-1, -1);
    }
    catch(e) {
        console.log('예외를 처리합니다.', e);
    }
})();

(() => {
    // 예외를 catch()할때 일관성있게 작성할 수 있으므로,
    // Error를 상속해서 만드는게 좋습니다. 
    class ResultError extends Error {}

    const add = (a, b) => {
        if (a < 0 || b < 0) {
            throw new RangeError('a또는 b는 0 이상이어야 합니다.');
        }

        const result = a + b;

        if (result > 10) {
            throw new ResultError('결과값 오류 입니다.');
        }
        return a + b;
    };

    try {
        add(1, 100);
    }
    catch(e) {
        if (e instanceof RangeError) {
            console.log('입력값이 잘못되었습니다.');
        }
        else if (e instanceof ResultError) {
            console.log('결과값이 잘못되었습니다.');
        }
        else {
            console.log('처리할 수 없는 예외는 전파합니다.', e);
            throw e; // 예외 전파
        }
    }
})();

(() => {
    const func = (error) => {
        if (error) {
            throw new Error();
        }
    };

    try {
        func(false); // 예외를 발생시키지 않으면, return 전에 finally가 호출됩니다.    
                     // 예외를 발생시키면 catch() 호출뒤 finally가 호출됩니다.
        return;  
    }
    catch(e) {
        console.log('catch하였습니다.', e);
    }
    finally {
        console.log('finally 입니다.');
    }

})();


