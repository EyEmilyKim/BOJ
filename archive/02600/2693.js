// https://www.acmicpc.net/problem/2693
/*
N번째 큰 수

배열 A가 주어졌을 때, N번째 큰 값을 출력하는 프로그램을 작성하시오.

배열 A의 크기는 항상 10이고, 자연수만 가지고 있다. N은 항상 3이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [[T], ...tc] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(T, tc);

// 문제 로직
const N = 3;
const result = [];
for (const t of tc) {
  t.sort((a, b) => b - a); // 큰 수부터 내림차순
  result.push(t[N - 1]);
}
console.log(result.join('\n'));
