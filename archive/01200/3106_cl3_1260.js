// https://www.acmicpc.net/problem/1260
/*
DFS와 BFS

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M, V] = input.shift().split(' ').map(Number);
// console.log(N, M, V, input);

// 문제 로직

// 연결 정보 입력
const graph = Array.from(new Array(N + 1), () => []);
for (let i of input) {
  const [from, to] = i.split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}
// console.log('graph', graph);
for (let i = 1; i <= N; i++) graph[i].sort((a, b) => a - b);
// console.log('graph', graph);

// DFS
const visited_D = new Array(N + 1).fill(false);
const result_D = [];
function dfs(from) {
  if (visited_D[from]) return;
  visited_D[from] = true;
  result_D.push(from);
  for (let connected of graph[from]) {
    if (visited_D[connected]) continue;
    dfs(connected);
  }
}
dfs(V);

// BFS
const visited_B = new Array(N + 1).fill(false);
const result_B = [];
function bfs(from) {
  const queue = [from];
  while (queue.length) {
    let node = queue.shift();
    if (visited_B[node]) continue;
    visited_B[node] = true;
    result_B.push(node);
    graph[node].forEach((v) => queue.push(v));
  }
}
bfs(V);

// 출력
console.log(result_D.join(' '));
console.log(result_B.join(' '));
