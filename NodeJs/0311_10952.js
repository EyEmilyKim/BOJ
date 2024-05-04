// https://www.acmicpc.net/problem/10952
/*
A+B - 5
두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력>
입력은 여러 개의 테스트 케이스로 이루어져 있다.
각 테스트 케이스는 한 줄로 이루어져 있으며, 각 줄에 A와 B가 주어진다. (0 < A, B < 10)
입력의 마지막에는 0 두 개가 들어온다.

출력>
각 테스트 케이스마다 A+B를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
// console.log(input);

// 문제 로직
for (i = 0; i < input.length; i++) {
  const [A, B] = input[i].split(' ').map((val) => +val);
  if (A == 0) break;
  console.log(A + B);
}

/**
 * 아래처럼 코드 짜도 같은 결과가 나오는데 틀렸다고 나옴...
  문제에서는 제시된 A, B 값과 마지막 줄의 조건을 잘 이용해서 break 를 사용하길 기대한 것 같다.
 
// 문제 로직
for (i = 0; i < input.length - 1; i++) {
  const [A, B] = input[i].split(' ').map((val) => +val);
  console.log(A + B);
}

*/
