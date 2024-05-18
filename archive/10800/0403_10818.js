// https://www.acmicpc.net/problem/10818
/*
최소, 최대

N개의 정수가 주어진다. 이때, 최솟값과 최댓값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
const num = Number(input[0]);
const arr = input[1].split(' ').map((val) => +val);
// console.log(num, arr);

// 문제 로직
let min = arr[0];
let max = arr[0];
for (i = 0; i < num; i++) {
  if (arr[i] < min) min = arr[i];
  if (arr[i] > max) max = arr[i];
}
console.log(min + ' ' + max);
