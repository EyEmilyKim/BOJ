// https://www.acmicpc.net/problem/2443
/*
별 찍기 - 6

첫째 줄에는 별 2×N-1개, 둘째 줄에는 별 2×N-3개, ..., N번째 줄에는 별 1개를 찍는 문제

별은 가운데를 기준으로 대칭이어야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
const result = [];
let star = 2 * N - 1;
for (let i = 1; i <= N; i++) {
  let row = '';
  for (let b = 0; b < i - 1; b++) row += ' ';
  for (let s = 1; s <= star; s++) row += '*';
  star -= 2;
  result.push(row);
}
console.log(result.join('\n'));
