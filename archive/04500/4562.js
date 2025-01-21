// https://www.acmicpc.net/problem/4562
/*
No Brainer

Zombies love to eat brains. Yum.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [[n], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(n, data);

// 문제 로직
const result = [];
for (const [eat, need] of data) {
  result.push(eat >= need ? 'MMM BRAINS' : 'NO BRAINS');
}
console.log(result.join('\n'));
