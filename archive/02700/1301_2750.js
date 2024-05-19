// https://www.acmicpc.net/problem/2750
/*
수 정렬하기

N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const N = input.shift();
// console.log(N, input);

// 문제 로직
input.sort((a, b) => a - b);
// console.log(input);
const result = input.join('\n');
console.log(result.trim());
