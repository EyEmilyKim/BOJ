// https://www.acmicpc.net/problem/11931
/*
수 정렬하기 4

N개의 수가 주어졌을 때, 이를 내림차순으로 정렬하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const n = input.shift();
// console.log(n, input);

// 문제 로직
input.sort((a, b) => b - a);
console.log(input.join('\n'));
