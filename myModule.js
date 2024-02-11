const privateFunc = function () {
    console.log('모듈에서 사용하는 privateFunc입니다');
};
  
const publicFunc = function () {
    privateFunc(); // 모듈에서만 사용하는 privateFunc을 호출합니다.
};

const plus = function (a, b) {
    return a + b;
};
const minus = function (a, b) {
    return a - b;
};
  
export { publicFunc, plus, minus }; // privateFunc은 내보내지 않았습니다.
  