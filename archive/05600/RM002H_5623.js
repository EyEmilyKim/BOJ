// https://www.acmicpc.net/problem/5623
/*
수열의 합

양의 정수 N개로 이루어진 수열 A가 있다. 상근이는 수열 A의 모든 두 수의 합을 알고 있다. 이때, 수열 A를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직
/**
 * A의 각항 합을 담은 2차원 배열 S 이용한 연립방정식 !

 * "입력으로 주어지는 S에 해당하는 수열 A는 항상 유일하다." 를
 "유일한 답이 도출될 수 있는 수열 A만 입력으로 주어진다" 로 해석.
 => N=2 인 수열은 연립방정식이 성립되지 않아 대부분의 경우 해를 구할 수 없지만
  유일하게 S가 ['0 2','2 0']일 때만 유일한 A [1, 1]가 도출 가능하다. 
  (A는 모두 양의 정수)
*/

// 수열 A의 각항 합을 담은 2차원 배열 S 구하기
const S = Array.from(new Array(N), () => new Array(N).fill(0));
// console.log(S);
input.forEach((val, idxR) => {
  const row = val.split(' ').map(Number);
  row.forEach((v, idxC) => {
    S[idxR][idxC] = v;
  });
});
// console.log(S);

// 수열 A 구하기
let A = new Array(N);
if (N === 2) A = [1, 1];
else {
  /** 연립방정식
  A[0]+A[1] = S[0][1]
  A[0]+A[2] = S[0][2]
  A[1]+A[2] = S[1][2]
  */
  A[0] = (S[0][1] + S[0][2] - S[1][2]) / 2;
  for (let i = 1; i < N; i++) {
    A[i] = S[0][i] - A[0];
  }
}
console.log(A.join(' '));
