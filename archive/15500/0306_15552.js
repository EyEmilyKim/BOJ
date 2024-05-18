// https://www.acmicpc.net/problem/15552
/*
빠른 A+B

시간 제한	: 1 초 (Java 8: 1.5 초, Java 8 (OpenJDK): 1.5 초)
메모리 제한	: 512 MB

입력>
첫 줄에 테스트케이스의 개수 T가 주어진다. T는 최대 1,000,000이다. 다음 T줄에는 각각 두 정수 A와 B가 주어진다. A와 B는 1 이상, 1,000 이하이다.

출력>
각 테스트케이스마다 A+B를 한 줄에 하나씩 순서대로 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split(/\r?\n/);
const num = +input[0];
// console.log(num);
// console.log(input);

// 문제 로직
let result = '';
for (i = 1; i <= num; i++) {
  const [A, B] = input[i].split(' ').map((val) => +val);
  if (i == num) result += A + B;
  else result += A + B + '\n';
}
console.log(result);

/**
 * 매 번 console.log로 출력하면 시간초과를 받고,
 * 하나의 문자열에 결과값과 개행문자를 저장해서 마지막에 출력했을 때 1508ms 받아 통과.
 * 마지막 줄 끝에 '\n' 유무룰 가리는 조건문 없어도 통과는 됐음. (1540ms)
 */
