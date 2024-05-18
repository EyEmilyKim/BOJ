// https://www.acmicpc.net/problem/11021
/*
A+B - 7

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력>
첫째 줄에 테스트 케이스의 개수 T가 주어진다.
각 테스트 케이스는 한 줄로 이루어져 있으며, 각 줄에 A와 B가 주어진다. (0 < A, B < 10)

출력>
각 테스트 케이스마다 "Case #x: "를 출력한 다음, A+B를 출력한다. 테스트 케이스 번호는 1부터 시작한다.

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
  if (i == num) result += 'Case #' + i + ': ' + (A + B);
  else result += 'Case #' + i + ': ' + (A + B) + '\n';
}
console.log(result);
