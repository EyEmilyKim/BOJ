// https://www.acmicpc.net/problem/1967
/*
트리의 지름

트리(tree)는 사이클이 없는 무방향 그래프이다. 트리에서는 어떤 두 노드를 선택해도 둘 사이에 경로가 항상 하나만 존재하게 된다. 트리에서 어떤 두 노드를 선택해서 양쪽으로 쫙 당길 때, 가장 길게 늘어나는 경우가 있을 것이다. 이럴 때 트리의 모든 노드들은 이 두 노드를 지름의 끝 점으로 하는 원 안에 들어가게 된다.

...

이런 두 노드 사이의 경로의 길이를 트리의 지름이라고 한다. 정확히 정의하자면 트리에 존재하는 모든 경로들 중에서 가장 긴 것의 길이를 말한다.

입력으로 루트가 있는 트리를 가중치가 있는 간선들로 줄 때, 트리의 지름을 구해서 출력하는 프로그램을 작성하시오. 아래와 같은 트리가 주어진다면 트리의 지름은 45가 된다.

...

트리의 노드는 1부터 n까지 번호가 매겨져 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[n], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(n, data);

// 문제 로직
/**
 * DFS
1. 1번 루트 노드로부터 제일 먼 노드 X와 해당 노드까지의 거리를 구한다.
2. 노드 X로부터 가장 먼 노드 Y와 해당 노드까지의 거리를 구하여 누적한다.
 */

// 트리 연결관계 데이터 입력
let graph = Array.from(new Array(n + 1), () => []);
for (const [from, to, distance] of data) {
  graph[from].push([to, distance]);
  graph[to].push([from, distance]);
}

// 1번 루트 노드로부터 제일 먼 노드 X와 해당 노드까지의 거리 구하기
const visited = new Array(n + 1).fill(false);
let maxDistance = { node: 0, dist: 0 };
function dfs(node, dist) {
  visited[node] = true;
  if (maxDistance.dist < dist) {
    maxDistance = { node, dist };
    // console.log(maxDistance);
  }
  for (const [nextNode, nextDist] of graph[node]) {
    if (visited[nextNode]) continue;
    dfs(nextNode, dist + nextDist);
  }
}
dfs(1, 0);

// 노드 X로부터 가장 먼 노드 Y와 해당 노드까지의 거리를 구하여 누적하기
visited.fill(false);
dfs(maxDistance.node, 0);

// 최종 결과 출력
console.log(maxDistance.dist);
