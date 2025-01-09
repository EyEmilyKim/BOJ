// https://www.acmicpc.net/problem/2445
/*
별 찍기 - 8

예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
const result = [];
for (let i = N; i > 0; i--) {
  let side = '*'.repeat(N - i + 1);
  let middle = ' '.repeat(2 * (i - 1));
  result.push(side + middle + side);
}
for (let i = 1; i < N; i++) {
  let side = '*'.repeat(N - i);
  let middle = ' '.repeat(i * 2);
  result.push(side + middle + side);
}
console.log(result.join('\n'));
