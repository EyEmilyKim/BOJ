// https://www.acmicpc.net/problem/14425
/*
문자열 집합

총 N개의 문자열로 이루어진 집합 S가 주어진다.

입력으로 주어지는 M개의 문자열 중에서 집합 S에 포함되어 있는 것이 총 몇 개인지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
const S = new Set(input.slice(0, N));
const test = input.slice(N);
// console.log(N, M, 'S', S, 'test', test);

// 문제 로직
let cnt = 0;
test.forEach((i) => {
  if (S.has(i)) cnt++;
});
console.log(cnt);
