// https://www.acmicpc.net/problem/2439
/*
별 찍기 - 2
오른쪽을 기준으로 정렬한 별(예제 참고)을 출력하시오.

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
  for (j = 1; j <= num - i; j++) row += ' ';
  for (j = 1; j <= i; j++) row += '*';
  if (i == num) result += row;
  else result += row + '\n';
}
console.log(result);
