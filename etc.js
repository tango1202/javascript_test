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

// ----
// Promise
// ----
// (() => {
//     new Promise((resolve, reject) => { // #1
//         console.log('#2. 비동기 작업을 시작합니다.'); // #2
//         setTimeout(() => {
//             console.log('#4. 1초뒤에 작업을 시작합니다.'); // #4
//             resolve('오래 걸리는 작업의 결과값입니다.'); 
//         }, 1000);
//     }).then( // #5
//         (result) => console.log('#5. Promise가 실행된 결과 입니다.', result), // #5-1
//         (result) => console.log('#5. Promise가 실행 거절되었습니다.', result)
//     ).finally( // #6
//        () => console.log('#6. Promise finally가 호출 되었습니다.') // #6-1
//     );
//     console.log('#3. 1초뒤에 Promise가 호출됩니다.'); // #3
// })();
//  (() => {
//     new Promise((resolve, reject) => { 
//         setTimeout(() => {
//             reject('오래 걸리는 작업을 거절했습니다.'); // #1
//         }, 1000);
//     }).then(
//         (result) => console.log('#5. Promise가 실행된 결과 입니다.', result), 
//         (result) => console.log('#5. Promise가 실행 거절되었습니다.', result) // #5-2
//     ).finally(
//        () => console.log('Promise finally가 호출 되었습니다.') 
//     );
//     console.log('1초뒤에 Promise가 호출됩니다.'); 
//  })();

// ----
// Promise 체이닝
// ----
// (() => {
//     new Promise((resolve, reject) => { // #1
//         setTimeout(() => {
//             resolve('Promise 1 '); 
//         }, 1000);
//     }).then((result) => {
//         return new Promise((resolve, reject)=> { // #2
//             setTimeout(() => {
//                 resolve(result + 'Promise 2 '); 
//             }, 1000);  
//         });
//     }).then((result) => {
//         return new Promise((resolve, reject)=> { // #3
//             setTimeout(() => {
//                 resolve(result + 'Promise 3 '); 
//             }, 1000);  
//         });
//     }).then((result) => { // #4
//         console.log('1, 2, 3의 결과가 합쳐져서 출력됩니다.', result === 'Promise 1 Promise 2 Promise 3 '); 
//     }).finally(
//         () => console.log('Promise 체이닝의 finally가 호출 되었습니다.') // #5
//     )
//     console.log('1초뒤에 Promise 체이닝이 호출됩니다.'); 
// })();

// ----
// Promise catch
// ----
// (() => {
//     new Promise((resolve, reject) => {
//         throw new Error('Promise 에서 예외를 발생했습니다.'); // #1
//     }).then(
//         (result) => console.log('Promise가 실행된 결과 입니다.', result),
//         (e) => console.log('Promise가 실행 거절되었습니다.', e) // #2
//     ).catch(
//         (e) => console.log('catch가 호출되지 않고 reject가 호출됩니다.', e) // #3
//     ).finally(
//         () => console.log('예외를 발생하는 Promise finally가 호출 되었습니다.') 
//     );
// })();
// (() => {
//     new Promise((resolve, reject) => {
//         throw new Error('Promise 에서 예외를 발생했습니다.'); // #1
//     }).then(
//         (result) => console.log('Promise가 실행된 결과 입니다.', result),
//     ).catch(
//         (e) => console.log('reject가 없으므로 catch가 호출됩니다.', e) // #3
//     ).finally(
//         () => console.log('예외를 발생하는 Promise finally가 호출 되었습니다.') 
//     );
// })();

// (() => {
//     new Promise((resolve, reject) => {
//         reject(new Error('Promise 에서 예외를 발생시키고 거절했습니다.')); // #1
//     }).then(
//         (result) => console.log('Promise가 실행된 결과 입니다.', str),
//     ).catch(
//         (e) => console.log('명시적으로 reject()를 호출했더라도 reject가 없으므로 catch가 호출됩니다.', e) // #2
//     ).finally(
//         () => console.log('예외를 발생하는 Promise finally가 호출 되었습니다.')
//     );
// })();

// (() => {
//     new Promise((resolve, reject) => {
//         resolve('Promise 1 '); // #1
//     }).then((result) => {
//         return new Promise((resolve, reject)=> {
//             resolve(result + 'Promise 2 '); // #2
//         });
//     }).then((result) => {
//         return new Promise((resolve, reject)=> {
//             throw new Error(result); // #3. #1 + #2 의 결과값을 예외로 전파합니다.
//         }).catch((e) => { 
//             throw e; // #4. #3의 예외를 전파합니다.
//         });
//     }).then((result) => {
//         console.log(result);  // #5. #3에서 예외가 발생해서 호출되지 않습니다.
//     }).catch((e)=> { // #6. #4를 캐치합니다.
//         console.log('#4를 catch합니다.', e) 
//     }).finally(
//         () => console.log('#7. Promise 체이닝의 finally가 호출 되었습니다.') // #8
//     )
// })();
// ----
// async
// ----
// (() => {
//     new Promise((resolve, reject) => {
//         resolve('Promise 결과값입니다.'); 
//     }).then(
//         (result) => console.log('Promise가 실행된 결과 입니다.', result)
//     );
// })(); 


// (() => {
//     const func = async ()=> {
//         return 'Promise 결과값입니다.'; 
//     };
    
//     func().then(
//         (result) => console.log('Promise가 실행된 결과 입니다.', result)
//     );
// })(); 

// (() => {
//     (async ()=> {
//         return 'Promise 결과값입니다.'; 
//     })().then(
//         (result) => console.log('Promise가 실행된 결과 입니다.', result)
//     );
// })(); 

// ----
// await
// ----
(() => {
    console.log('async 호출전입니다.'); // #1
    (async ()=> { // #3. await는 aync 함수 내에서만 사용 가능합니다.
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Promise 결과값입니다.'); // #4
            }, 1000);
        });
        const result = await promise; // #5. promise가 실행될때 까지 기다립니다.
        console.log('Promise가 실행된 결과 입니다.', result); // #6. 이전에는 then()에서 작성했습니다.
    
    })();
    console.log('async 호출후입니다.'); // #2
})(); 
