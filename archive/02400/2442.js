// https://www.acmicpc.net/problem/2442
/*
별 찍기 - 5

첫째 줄에는 별 1개, 둘째 줄에는 별 3개, ..., N번째 줄에는 별 2×N-1개를 찍는 문제

별은 가운데를 기준으로 대칭이어야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const n = +require('fs').readFileSync(path).toString().trim();
// console.log(n);

// 문제 로직
const result = [];
for (let i = 1; i <= n; i++) {
  let str = '';
  let blank = n - i;
  let star = 2 * i - 1;
  while (blank-- > 0) str += ' ';
  while (star-- > 0) str += '*';
  result.push(str);
}
console.log(result.join('\n'));
