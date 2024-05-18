// https://www.acmicpc.net/problem/2562
/*
최댓값

9개의 서로 다른 자연수가 주어질 때, 이들 중 최댓값을 찾고 그 최댓값이 몇 번째 수인지를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .split(/\r?\n/)
  .map((val) => +val);
// console.log(input);

// 문제 로직
let max = Math.max(...input);
console.log(max);
console.log(input.indexOf(max) + 1);

/**
 * 채점 기준이 좀 편협하다 -_-
아래 코드에서 nth 변수에 미리 idx+1 담아 출력하면 틀렸다 하고
순수 idx 를 받아놓은 다음 출력시 +1 을 주면 맞았다고 한다..

// 문제 로직 (틀렸습니다..)
let max = input[0];
let nth = 0;
input.forEach((i, idx) => {
  if (i > max) {
    max = i;
    nth = idx + 1;
  }
});
console.log(max);
console.log(nth);

// 문제 로직 (맞았습니다 !!)
let max = input[0];
let index = 0;
input.forEach((i, idx) => {
  if (i > max) {
    max = i;
    index = idx;
  }
});
console.log(max);
console.log(index+1);
 */
