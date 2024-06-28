// https://www.acmicpc.net/problem/11724
/*
연결 요소의 개수

방향 없는 그래프가 주어졌을 때, 연결 요소 (Connected Component)의 개수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
const nodes = input.map((i) => i.split(' ').map(Number));
// console.log(N, M, nodes);

// 문제 로직 - 방법 1 : 재귀함수 이용한 DFS
/**
 * 그래프 탐색
 * 2606번 "바이러스" 문제 참고
 */

// 연결된 네트워크 입력 - 예) graph[i] : 노드 i 와 연결된 노드들의 배열
const graph = Array.from(new Array(N + 1), () => []);
nodes.forEach(([a, b]) => {
  graph[a].push(b);
  graph[b].push(a);
});
// console.log(graph);

// 연결영역 순회하며 방문처리 하는 DFS 함수
const visited = new Array(N + 1).fill(false);
function dfs(start) {
  for (let connected of graph[start]) {
    if (!visited[connected]) {
      visited[connected] = true;
      dfs(connected);
    }
  }
}

// 모든 노드 순회하며 dfs 돌리기
let network = 0; // 새로운 연결요소 개수
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    // console.log('new starting node', i);
    dfs(i);
    network++;
  }
}
console.log(network); // 연결요소 수 출력

// 문제 로직 - 방법 2 : Queue 를 이용한 BFS

// 연결된 네트워크 입력 - 예) graph[i] : 노드 i 와 연결된 노드들의 배열
const graph2 = Array.from(new Array(N + 1), () => []);
nodes.forEach(([a, b]) => {
  graph2[a].push(b);
  graph2[b].push(a);
});
// console.log(graph);

// 연결영역 순회하며 방문처리 하는 BFS 함수
const visited2 = new Array(N + 1).fill(0);
function bfs(start) {
  const queue = [start]; // 새로 도달한 노드 저장할 큐
  let head = 0; // 느린 shift() 대신 queue 요소에 접근할 idx
  while (head < queue.length) {
    const cur = queue[head++];
    for (let connected of graph2[cur]) {
      if (!visited2[connected]) {
        visited2[connected] = 1;
        queue.push(connected);
      }
    }
  }
}

// 모든 노드 순회하며 bfs 돌리기
let network2 = 0; // 새로운 연결요소 개수
for (let i = 1; i <= N; i++) {
  if (!visited2[i]) {
    // console.log('new starting node', i);
    bfs(i);
    network2++;
    // console.log(i, visited);
  }
}
console.log(network2); // 연결요소 수 출력
