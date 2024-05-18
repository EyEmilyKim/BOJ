// https://www.acmicpc.net/problem/10950
/*
A+B - 3

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.
첫째 줄에 테스트 케이스의 개수 T가 주어진다.
각 테스트 케이스는 한 줄로 이루어져 있으며, 각 줄에 A와 B가 주어진다. (0 < A, B < 10)

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split(/\r?\n/);
// console.log(input);

// 문제 로직
const n = +input[0];
// console.log(n);
for (i = 1; i <= n; i++) {
  // console.log(input[i]);
  const [A, B] = input[i].split(' ').map((val) => +val);
  // console.log(A, B);
  console.log(A + B);
}

/**
 * 1. 윈도우에서는 개행문자열 '\n' 이지만 유닉스에서는 '\r\n'
* 2. 앞의 '\r'을 선택적으로 지정하는(있을 땐 포함, 없으면 말고) 정규표현식 : /\r?\n/ 또는 /\r*\n/
두 표현식의 차이)
? - 0회 또는 1회 포함 (없거나, 1개 있거나)
* - 0회 또는 1회 이상 포함 (없거나, 1개 있거나, 여러개 있거나)
 */
