// https://www.acmicpc.net/problem/4101
/*
크냐?

두 양의 정수가 주어졌을 때, 첫 번째 수가 두 번째 수보다 큰지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
// console.log(input);

// 문제 로직
const result = [];
input.forEach((i) => {
  const [a, b] = i.split(' ').map(Number);
  const bigger = a > b ? 'Yes' : 'No';
  result.push(bigger);
});
console.log(result.join('\n'));
