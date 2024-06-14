// https://www.acmicpc.net/problem/10815
/*
숫자 카드

숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 가지고 있는지 아닌지를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const cards = input[1].split(' ').map(Number);
const M = +input[2];
const check = input[3].split(' ').map(Number);
// console.log(N, cards, M, check);

// 문제 로직
const set = new Set(cards);
// console.log(set);
const result = [];
check.forEach((i) => {
  result.push(set.has(i) ? 1 : 0);
});
console.log(result.join(' '));
