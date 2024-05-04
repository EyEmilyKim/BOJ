// https://www.acmicpc.net/problem/10951
/*
A+B - 4
두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
// console.log(input);

// 문제 로직
for (i = 0; i < input.length; i++) {
  const [A, B] = input[i].split(' ').map((val) => +val);
  console.log(A + B);
}
