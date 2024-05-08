// https://www.acmicpc.net/problem/9086
/*
문자열

문자열을 입력으로 주면 문자열의 첫 글자와 마지막 글자를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);
const n = +input[0];

//문제 로직

// for (i = 1; i <= n; i++) {
//   const start = input[i][0];
//   const end = input[i][input[i].length - 1];
//   console.log(start + end);
// }

input.shift();
input.forEach((i) => {
  console.log(i[0] + i[i.length - 1]);
});

/**
 * 배열 함수 shift() : 배열의 첫번째 요소 제거
 */
