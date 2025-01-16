// https://www.acmicpc.net/problem/2440
/*
별 찍기 - 3

예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const n = +require('fs').readFileSync(path).toString().trim();
// console.log(n);

// 문제 로직
const result = [];
for (let i = n; i > 0; i--) {
  result.push('*'.repeat(i));
}
console.log(result.join('\n'));
