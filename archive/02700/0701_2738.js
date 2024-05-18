// https://www.acmicpc.net/problem/2738
/*
행렬 덧셈

N*M크기의 두 행렬 A와 B가 주어졌을 때, 두 행렬을 더하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input
  .shift()
  .split(' ')
  .map((val) => +val);
// console.log(N, M, input);

//문제 로직
let SUM = [];
for (let n = 0; n < N; n++) {
  SUM.push(new Array(M).fill(0));
}
// console.log(sum);
for (let n = 0; n < N; n++) {
  const A = input[n].split(' ').map((val) => +val);
  const B = input[n + N].split(' ').map((val) => +val);
  // console.log('A', A);
  // console.log('B', B);
  for (let m = 0; m < M; m++) {
    SUM[n][m] = A[m] + B[m];
  }
}
// console.log(sum);
SUM.forEach((i) => console.log(i.join(' ')));
