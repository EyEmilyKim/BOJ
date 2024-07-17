// https://www.acmicpc.net/problem/5525
/*
IOIOI

N+1개의 I와 N개의 O로 이루어져 있으면, I와 O이 교대로 나오는 문자열을 PN이라고 한다.

- P1 IOI
- P2 IOIOI
- P3 IOIOIOI
- PN IOIOI...OI (O가 N개)
I와 O로만 이루어진 문자열 S와 정수 N이 주어졌을 때, S안에 PN이 몇 군데 포함되어 있는지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = [input[0], input[1]].map(Number);
const S = input[2];
// console.log(N, M, S);

// 문제 로직

// Pn 문자열 구하기
let P = '';
for (let i = 0; i < N; i++) P += 'IO';
P += 'I';
// console.log(P);

// S 순회하며 Pn 개수 찾기
const arrS = Array.from(S);
let flag = false;
let count = 1;
let result = 0;
for (let i = 0; i < M; i++) {
  if (!flag && arrS[i] === 'I') {
    flag = true;
    continue;
  }
  if (flag) {
    if (arrS[i] !== arrS[i - 1]) count++;
    else {
      if (count >= P.length) result += Math.floor((count - P.length) / 2) + 1;
      count = 1;
      if (arrS[i] === 'O') flag = false;
    }
  }
}
if (count >= P.length) result += Math.floor((count - P.length) / 2) + 1;
console.log(result);

/**
S를 순회하면서
1. flag가 False일 때 'I'가 오면 flag = True로 바꾼다.
2. flag가 True일 때 이전 인덱스 값과 다른 값이 오면 count를 증가시킨다.
3. flag가 True일 때 이전 인덱스 값과 동일한 값이 오면 : 
 - 이전 인덱스 값까지의 IOIO... 구간에 속한 PN의 개수를 result에 더한다.
 - count를 1로 초기화한다.
 - 만약 현재 값이 'O'이면 flag = False로 바꾼다.
 (현재 값이 'I'면 현재 위치부터 다시 IOIO...구간 시작이므로 flag는 그대로 True)

단, flag가 True인 상태에서 IOIO...구간이 끝까지 진행되면 
result에 PN의 개수를 더하는 과정이 실행되지 않을 수 있다.
따라서 마지막에 result에 더해주는 코드를 한 번 더 실행한다.

*/
