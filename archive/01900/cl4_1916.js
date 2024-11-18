// https://www.acmicpc.net/problem/1916
/*
최소비용 구하기

N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 M개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다. A번째 도시에서 B번째 도시까지 가는데 드는 최소비용을 출력하여라. 도시의 번호는 1부터 N까지이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[n], [m], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
const [a, b] = data.pop();
// console.log(n, m, data, a, b);

// 문제 로직
/**
 * 다익스트라 알고리즘
 * 참고) https://velog.io/@devkyoung2/%EB%8B%A4%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%9D%BC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
 */

// 각 노드 연결관계 입력
const lines = Array.from({ length: n + 1 }, () => []);
for (const [from, to, cost] of data) {
  lines[from].push([to, cost]);
}
// console.log('lines', lines);

// 방문할 노드 특정하기(방문하지 않은 노드 중 가장 비용이 낮은 노드)
function getNodeToVisit(cost, visited, cnt) {
  // console.log(`------\ngetNodeToVisit() called _ ${cnt}`);
  // console.log('cost', cost);
  // console.log('visited', visited);

  let minCost = Infinity;
  let minNode = -1;
  for (let i = 1; i <= n; i++) {
    if (!visited[i] && cost[i] < minCost) {
      minCost = cost[i];
      minNode = i;
      // console.log(`minCost: ${minCost}, minNode: ${minNode}`);
    }
  }
  return minNode;
}

// 다이크스트라 알고리즘으로 a -> b 가능한 루트 모두 탐색해 최소비용 구하기
function dijkstra(start, end) {
  const cost = new Array(n + 1).fill(Infinity);
  const visited = new Array(n + 1).fill(false);
  cost[start] = 0;

  for (let i = 1; i <= m; i++) {
    const curNode = getNodeToVisit(cost, visited, i); // 방문할 노드 특정하기
    if (curNode === -1) break; // 더 방문할 노드 없으면 반복 끝

    visited[curNode] = true;
    for (const [nextNode, costToNext] of lines[curNode]) {
      // 해당 노드 최소비용 갱신
      cost[nextNode] = Math.min(cost[nextNode], cost[curNode] + costToNext);
    }
  }

  // console.log('final minCost', cost);
  return cost[end];
}

// 작업 수행 및 출력
console.log(dijkstra(a, b));
