// https://www.acmicpc.net/problem/13023
/*
ABCDE

BOJ 알고리즘 캠프에는 총 N명이 참가하고 있다. 사람들은 0번부터 N-1번으로 번호가 매겨져 있고, 일부 사람들은 친구이다.

오늘은 다음과 같은 친구 관계를 가진 사람 A, B, C, D, E가 존재하는지 구해보려고 한다.

- A는 B와 친구다.
- B는 C와 친구다.
- C는 D와 친구다.
- D는 E와 친구다.
위와 같은 친구 관계가 존재하는지 안하는지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((row) => row.split(' ').map(Number));
const [N, M] = input.shift();
// console.log(N, M, input);

// 문제 로직
/**
 * 브루트 포스. DFS.
 * 모든 사람 순회하며 교우관계 5다리 이어지는지 DFS 확인.
 */

// 교우관계 데이터 입력
const graph = Array.from(new Array(N), () => []);
for (const i of input) {
  const [a, b] = i;
  graph[a].push(b);
  graph[b].push(a);
}

// 출발 노드부터 관계 5명 이어지면 flag=성공으로 바꾸는 함수
let flag = false;
let visited;
function dfs(cur, cnt) {
  if (cnt >= 5) {
    flag = true;
    return;
  }

  for (const next of graph[cur]) {
    if (visited[next]) continue;
    visited[next] = true;
    dfs(next, cnt + 1);
    visited[next] = false;

    if (flag) break;
  }
}

// 작업 수행
for (let i = 0; i < N; i++) {
  visited = Array(N).fill(false); // visited 초기화
  visited[i] = true;
  dfs(i, 1);

  if (flag) break;
}

console.log(flag ? 1 : 0);
