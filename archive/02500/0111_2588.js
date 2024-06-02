// https://www.acmicpc.net/problem/2588
/*
곱셈

(세 자리 수) × (세 자리 수)는 다음과 같은 과정을 통하여 이루어진다.
...
(1)과 (2)위치에 들어갈 세 자리 자연수가 주어질 때 (3), (4), (5), (6)위치에 들어갈 값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
// console.log(input); // [ '472', '385' ]

// 문제 로직 - 방법 1 : 온전히 숫자로서 처리하기
const [A, B] = input.map((val) => +val);
// console.log('A', A, 'B', B);

// 두번째 숫자 각 자리로 쪼개기
// const b0 = (B % 10) / 1;
// const b1 = parseInt((B % 100) / 10);
// const b2 = parseInt((B % 1000) / 100);
// console.log('b0', b0, 'b1', b1, 'b2', b2);
const b = [];
for (let i = 0; i < 3; i++) {
  b[i] = parseInt((B % Math.pow(10, i + 1)) / Math.pow(10, i));
}
// console.log('b:', b);

// 쪼갠 각 숫자와 첫번째 숫자 곱하기 => (3),(4),(5) 결과값
const mid = [];
for (let i = 0; i < 3; i++) {
  mid[i] = b[i] * A;
  console.log(mid[i]);
}

// 최종 결과값 (6) 구하기
let result = 0;
for (let i = 0; i < 3; i++) {
  result += mid[i] * Math.pow(10, i);
}
console.log(result);

/**
 * 둘 다 소수점 버림 처리하는 parseInt() 와 Math.floor() 의 차이점
 * parseInt()
 - 문자열을 파싱하여 정수를 반환한다.
 - 소수점을 포함한 문자열을 입력으로 받으면 소수점 이하를 무시하고 정수 부분만 반환한다.
 - 문자열의 시작 부분에 숫자가 아닌 문자가 있으면 NaN을 반환한다.
 - 숫자가 아닌 문자열도 입력으로 받을 수 있다.
 => 두 번째 인수로 기수(radix)를 받아서, 해당 기수의 문자열을 10진법 정수로 변환할 수 있다. 단, 문자열이 유효하지 않거나 지정된 기수 범위에 맞지 않으면 NaN을 반환한다.
  console.log(parseInt("1010", 2)); // 2진수 (Binary) // 결과: 10
  console.log(parseInt("12", 8));   // 8진수 (Octal) // 결과: 10
  console.log(parseInt("A", 16));   // 16진수 (Hexadecimal) // 결과: 10

 * Math.floor()
 - 숫자를 입력받아 주어진 숫자보다 작거나 같은 가장 큰 정수를 반환한다.
 - 소수점 이하를 무조건 버림 처리한다.
 - 문자열 입력 시 자동으로 숫자로 변환되지 않는다. 숫자가 아닌 값을 입력하면 NaN을 반환한다.

 * 또한 parseInt 와 Math.floor 는 음수에 대해서 작동하는 방식이 다르다. 
  console.log(parseInt(-0)); // 0
  console.log(Math.floor(-0)); // -0
  console.log(parseInt(-4.2)); // -4
  console.log(Math.floor(-4.2)); // -5
 */

// 문제 로직 - 방법 2 : 문자열로서, 숫자 변환하여 처리하기

// 두번째 숫자 각 자리로 쪼개기
const b2 = [];
for (let i = 2; i >= 0; i--) {
  b2.push(input[1][i]);
}
// console.log('b2:', b2);

// 쪼갠 두번째 각 숫자와 첫번째 숫자 곱하기 => (3),(4),(5) 결과값
const mid2 = [];
for (let i = 0; i < 3; i++) {
  mid2.push(b2[i] * input[0]);
}
console.log(mid2.join('\n'));

// 최종 결과값 (6) 구하기
let result2 = 0;
for (let i = 0; i < 3; i++) {
  result2 += mid2[i] * Math.pow(10, i);
}
console.log(result2);

/**
 * 문자열로 담긴 숫자가 '+' 제외한 산술 연산자 만나면 피연산자를 자동으로 숫자로 변환해 처리한다.
 * 단, '+' 는 문자열 결합으로 처리되므로 명시적 숫자 변환 처리가 필요하다.
 */
