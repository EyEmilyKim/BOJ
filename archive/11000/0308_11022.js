// https://www.acmicpc.net/problem/11022
/*
A+B - 8

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : '/example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
const num = +input[0];
// console.log(num);
// console.log(input);

// 문제 로직
let result = '';
for (i = 1; i <= num; i++) {
  const [A, B] = input[i].split(' ').map((val) => +val);
  if (i == num) result += `Case #${i}: ${A} + ${B} = ${A + B}`;
  else result += `Case #${i}: ${A} + ${B} = ${A + B}\n`;
}
console.log(result);

/**
 * 제출 때 마다 input값 경로 수정 귀찮아서 변수 값 지정시 OS 분기 줌 !
process.platform === "linux" ? "/dev/stdin" : "/input.txt";
 */
