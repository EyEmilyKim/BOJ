// https://www.acmicpc.net/problem/10807
/*
총 N개의 정수가 주어졌을 때, 정수 v가 몇 개인지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
const num = +input[0];
const arr = input[1].split(' ').map((val) => +val);
const target = input[2];
// console.log(num, '\n' + arr, '\n' + target);

// 문제 로직
let cnt = 0;
for (i = 0; i < num; i++) {
  if (arr[i] == target) cnt++;
}
console.log(cnt);
