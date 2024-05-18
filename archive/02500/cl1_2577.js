// https://www.acmicpc.net/problem/2577
/*
숫자의 개수

세 개의 자연수 A, B, C가 주어질 때 A × B × C를 계산한 결과에 0부터 9까지 각각의 숫자가 몇 번씩 쓰였는지를 구하는 프로그램을 작성하시오.

예를 들어 A = 150, B = 266, C = 427 이라면 A × B × C = 150 × 266 × 427 = 17037300 이 되고, 계산한 결과 17037300 에는 0이 3번, 1이 1번, 3이 2번, 7이 2번 쓰였다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => +i);
// console.log(input);

// 문제 로직
const target = input
  .reduce((a, b) => a * b)
  .toString()
  .split('')
  .map((i) => +i);
// console.log(target);
let str = '';
for (let i = 0; i <= 9; i++) {
  let cnt = 0;
  target.forEach((item) => {
    if (item === i) cnt++;
  });
  str += cnt + '\n';
}
console.log(str.trim());
