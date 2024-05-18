// https://www.acmicpc.net/problem/2438
/*
별 찍기 - 1

첫째 줄에는 별 1개, 둘째 줄에는 별 2개, N번째 줄에는 별 N개를 찍는 문제

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString();
const num = +input;
// console.log(num);

// 문제 로직
let result = '';
for (i = 1; i <= num; i++) {
  let row = '';
  for (j = 1; j <= i; j++) {
    row += '*';
  }
  if (i == num) result += row;
  else result += row + '\n';
}
console.log(result);
