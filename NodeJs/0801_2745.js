// https://www.acmicpc.net/problem/2745
/*
진법 변환

B진법 수 N이 주어진다. 이 수를 10진법으로 바꿔 출력하는 프로그램을 작성하시오.

10진법을 넘어가는 진법은 숫자로 표시할 수 없는 자리가 있다. 이런 경우에는 다음과 같이 알파벳 대문자를 사용한다.

A: 10, B: 11, ..., F: 15, ..., Y: 34, Z: 35

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, B] = require('fs').readFileSync(path).toString().trim().split(' ');
// console.log(N, B);

//문제 로직 - 방법 1.
const num = parseInt(N, Number(B));
console.log(num);

/**
 * parseInt() 함수
 : 인자로 변환하고자 하는 숫자(혹은 문자)와 그 값을 표현하고 있는 진법을 전ㄷ라하여 10진수로 변환.
 */

//문제 로직 - 방법 2 : 각각의 자리를 N진법으로 계산하여 합산
// const apb = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// const num = [];
// for (let i = 0; i < 26; i++) num.push(10 + i);

// const len = N.length;
// let sum = 0;
// for (let n = 0; n < len; n++) {
//   const digit = B ** n;
//   if (!isNaN(N[len - 1 - n])) sum += digit * N[len - 1 - n]; // 숫자라면
//   else sum += digit * num[apb.indexOf(N[len - 1 - n])]; // 숫자가 아니라면
// }
// console.log(sum);
