// https://www.acmicpc.net/problem/5597
/*
과제 안 내신 분..?

X대학 M교수님은 프로그래밍 수업을 맡고 있다. 교실엔 학생이 30명이 있는데, 학생 명부엔 각 학생별로 1번부터 30번까지 출석번호가 붙어 있다.

교수님이 내준 특별과제를 28명이 제출했는데, 그 중에서 제출 안 한 학생 2명의 출석번호를 구하는 프로그램을 작성하시오.

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
let result = [];
for (i = 1; i <= 30; i++) {
  if (!input.includes(i)) result.push(i);
}
// console.log(result);
result.forEach((i) => console.log(i));
