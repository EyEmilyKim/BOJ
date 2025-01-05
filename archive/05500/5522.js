// https://www.acmicpc.net/problem/5522
/*
카드 게임

JOI군은 카드 게임을 하고 있다. 이 카드 게임은 5회의 게임으로 진행되며, 그 총점으로 승부를 하는 게임이다.

JOI군의 각 게임의 득점을 나타내는 정수가 주어졌을 때, JOI군의 총점을 구하는 프로그램을 작성하라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(input);

// 문제 로직
let sum = 0;
for (let point of input) {
  sum += point;
}
console.log(sum);
