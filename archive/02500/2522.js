// https://www.acmicpc.net/problem/2522
/*
별 찍기 - 12

예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const n = +require('fs').readFileSync(path).toString().trim();
// console.log(n);

// 문제 로직
const result = [];
for (let i = 1; i <= n; i++) {
  result.push(' '.repeat(n - i) + '*'.repeat(i));
}
const resultRev = result.slice(0, -1).reverse();
console.log(result.join('\n'));
console.log(resultRev.join('\n'));
