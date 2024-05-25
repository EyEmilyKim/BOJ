// https://www.acmicpc.net/problem/1676
/*
팩토리얼 0의 개수

N!에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때까지 0의 개수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = BigInt(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직
let facto = 1n;
for (let i = input; i > 1n; i--) {
  facto *= i;
}
// console.log(facto);
const revFacto = Array.from(String(facto)).reverse();
// console.log(revFacto);
let cnt = 0;
for (let i = 0; i < revFacto.length; i++) {
  if (revFacto[i] === '0') cnt++;
  else break;
}
console.log(cnt);

/**
 * 입력값 N 범위가 0 <= N <=500 이므로 BigInt 처리 필요함 !
 => 그냥 int 로 하면 500 입력시 Infinity 가 되어 문자열 처리가 안통함.
 */
