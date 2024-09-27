// https://www.acmicpc.net/problem/10974
/*
모든 순열

N이 주어졌을 때, 1부터 N까지의 수로 이루어진 순열을 사전순으로 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString();
// console.log(N);

// 문제 로직
/**
 * 백트래킹
 */

const numSet = [];
const visited = new Array(N + 1).fill(false);
const result = [];

function dfs(cnt) {
  if (cnt === N) {
    result.push(numSet.join(' '));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    numSet.push(i);
    dfs(cnt + 1);
    numSet.pop();
    visited[i] = false;
  }
}

dfs(0);
console.log(result.join('\n'));
