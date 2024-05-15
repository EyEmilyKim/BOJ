// https://www.acmicpc.net/problem/15964
/*
이상한 기호

효진이는 A＠B = (A+B)×(A-B)으로 정의내리기로 했다.
정수 A, B가 주어지면 A＠B를 계산하는 프로그램을 만들어주자!

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [A, B] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((i) => +i);
// console.log(A, B);

// 문제 로직
const at = (A + B) * (A - B);
console.log(at);
