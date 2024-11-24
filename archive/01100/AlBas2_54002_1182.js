// https://www.acmicpc.net/problem/1182
/*
부분수열의 합

N개의 정수로 이루어진 수열이 있을 때, 크기가 양수인 부분수열 중에서 그 수열의 원소를 다 더한 값이 S가 되는 경우의 수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, S], num] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(N, S, num);

// 문제 로직
/**
1. 정수 N개를 가지고 모든 부분 수열을 구한다 (DFS. 백트래킹)
2. 원소들의 합이 S가 되는 부분수열 개수를 출력한다.
 */
let cnt = 0;
const pick = [];

function dfs(idx) {
  if (idx === N) {
    const sum = pick.reduce((r, v) => r + v, 0);
    if (sum === S) cnt++;
    return;
  }
  pick.push(num[idx]); // idx번째 선택
  dfs(idx + 1);
  pick.pop(); // idx번째 선택 안함
  dfs(idx + 1);
}

dfs(0);
if (S === 0) cnt--; // 아무 원소도 선택하지 않았을 때도 sum=0 성립되므로 -1 보정

console.log(cnt);
