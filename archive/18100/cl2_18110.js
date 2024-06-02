// https://www.acmicpc.net/problem/18110
/*
solved.ac

solved.ac는 Sogang ICPC Team 학회원들의 알고리즘 공부에 도움을 주고자 만든 서비스이다. 지금은 서강대뿐만 아니라 수많은 사람들이 solved.ac의 도움을 받아 알고리즘 공부를 하고 있다.

ICPC Team은 백준 온라인 저지에서 문제풀이를 연습하는데, 백준 온라인 저지의 문제들에는 난이도 표기가 없어서, 지금까지는 다양한 문제를 풀어 보고 싶더라도 난이도를 가늠하기 어려워 무슨 문제를 풀어야 할지 판단하기 곤란했기 때문에 solved.ac가 만들어졌다. solved.ac가 생긴 이후 전국에서 200명 이상의 기여자 분들께서 소중한 난이도 의견을 공유해 주셨고, 지금은 약 7,000문제에 난이도 표기가 붙게 되었다.

어떤 문제의 난이도는 그 문제를 푼 사람들이 제출한 난이도 의견을 바탕으로 결정한다. 난이도 의견은 그 사용자가 생각한 난이도를 의미하는 정수 하나로 주어진다. solved.ac가 사용자들의 의견을 바탕으로 난이도를 결정하는 방식은 다음과 같다.

아직 아무 의견이 없다면 문제의 난이도는 0으로 결정한다.
의견이 하나 이상 있다면, 문제의 난이도는 모든 사람의 난이도 의견의 30% 절사평균으로 결정한다.
절사평균이란 극단적인 값들이 평균을 왜곡하는 것을 막기 위해 가장 큰 값들과 가장 작은 값들을 제외하고 평균을 내는 것을 말한다. 30% 절사평균의 경우 위에서 15%, 아래에서 15%를 각각 제외하고 평균을 계산한다. 따라서 20명이 투표했다면, 가장 높은 난이도에 투표한 3명과 가장 낮은 난이도에 투표한 3명의 투표는 평균 계산에 반영하지 않는다는 것이다.

제외되는 사람의 수는 위, 아래에서 각각 반올림한다. 25명이 투표한 경우 위, 아래에서 각각 3.75명을 제외해야 하는데, 이 경우 반올림해 4명씩을 제외한다.

마지막으로, 계산된 평균도 정수로 반올림된다. 절사평균이 16.7이었다면 최종 난이도는 17이 된다.

사용자들이 어떤 문제에 제출한 난이도 의견 목록이 주어질 때, solved.ac가 결정한 문제의 난이도를 계산하는 프로그램을 작성하시오.

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
const N = input.shift();
// console.log(N, input);

// 문제 로직 - 방법 1 : 시간초과...
// 상,하위 15% 절사하기
const arr = input.sort((a, b) => a - b).slice(); // 난이도 오름차순 정렬
const drop1 = Math.round(N * 0.15); // 배열 앞,뒤로 절사할 개수
// console.log(drop1);
for (let i = 0; i < drop1; i++) {
  arr.shift();
  arr.pop();
}
// console.log(arr);
// 평균 구하기
let sum1 = 0;
let avg1 = 0;
if (N === 0) {
  // input 이 0일 때는 난이도 0으로 출력
  avg1 = 0;
} else if (arr.length > 0) {
  // 일반 케이스의 절사 평균
  sum1 = arr.reduce((a, b) => a + b);
  avg1 = Math.round(sum1 / arr.length);
} else {
  // 절사 후 배열이 빈 배열이 될 때는 절사하지 않은 원배열 평균
  sum1 = input.reduce((a, b) => a + b);
  avg1 = Math.round(sum1 / input.length);
}
console.log(avg1);

/** 
 * 난이도 평가자가 0명일 때는 input 배열 자체가 비어있으므로 reduce() 에서 오류가 난다. 문제에서 제시한 대로 결과값 0 으로 출력.
 * 절사 후 빈 배열이 됐을 때, reduce() 와 (0/0) 연산에서 오류날 수 있으므로
 그 경우는 절사하지 않고 평균을 내는 것으로 조건 분기를 줘서 처리했다.
 */

// 문제 로직 - 방법 2 : 시간 절약 Ver
// 상,하위 절사할 개수
let drop = 0;
if (input.length > 2) {
  // 절사 후 배열이 비어버리지 않도록 길이가 2초과 일때만 절사하기
  drop = Math.round(input.length * 0.15);
}
// console.log('drop', drop);

// 절사 평균 구하기
input.sort((a, b) => a - b);
let avg = 0; // 평가자가 0명이면 결과값 0
if (N > 0) {
  let sum = 0;
  for (let i = drop; i < N - drop; i++) {
    sum += input[i];
  }
  avg = Math.round(sum / (N - drop * 2));
}
console.log(avg);
