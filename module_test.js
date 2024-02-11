import * as M from './myModule.js';
// ----
// 모듈
// ----
(() => {
    M.publicFunc();
    console.log('myModule.js의 plus 함수 입니다', M.plus(1, 2) === 3);
    console.log('myModule.js의 minus 함수 입니다', M.minus(1, 2) === -1);
})();
