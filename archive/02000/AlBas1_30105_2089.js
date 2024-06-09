// https://www.acmicpc.net/problem/2089
/*
-2진수

-2진법은 부호 없는 2진수로 표현이 된다. 2진법에서는 20, 21, 22, 23이 표현 되지만 -2진법에서는 (-2)0 = 1, (-2)1 = -2, (-2)2 = 4, (-2)3 = -8을 표현한다. 10진수로 1부터 표현하자면 1, 110, 111, 100, 101, 11010, 11011, 11000, 11001 등이다.

10진법의 수를 입력 받아서 -2진수를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직
/**
 * -2진법 변환
 1. -2 로 나눈 몫이 0 될 때까지 나머지값 구하며 계속 나눠감
 2. 나머지를 0 또는 1 로 만들기 위해 나눠떨어지지 않을 때 보정
  예 : 13/-2 = -6.5 => 몫 -6, 나머지 1 로 보정
  console.log(13 / -2); // -6.5
  console.log(13 % -2); // 1
  예 : -13/-2 = 6.5 => 몫 7, 나머지 1 로 보정 (-13 - (-14))
  console.log(-13 / -2); // 6.5 
  console.log(-13 % -2); // -1 
 3. 나머지값 역순으로 이어 붙이기 
 4. (잊지 말 것!) 입력값 0 이면 0
  
// console.log(Math.ceil(-6.5)); // -6
// console.log(Math.ceil(6.5)); // 7
 */

let num = input;
let remainder;
let arr = []; // 나머지 값 저장할 배열
// console.log('num', num);
if (num !== 0) {
  while (num / -2 !== 0) {
    remainder = num % -2;
    if (remainder !== 0) {
      num = Math.ceil(num / -2);
      remainder = 1;
    } else {
      num = num / -2;
      remainder = 0; // 0 || -0 => 0 으로 저장
    }
    arr.push(remainder);
    // console.log('num', num, 'remainder', remainder);
  }
}
console.log(input === 0 ? 0 : arr.reverse().join(''));
