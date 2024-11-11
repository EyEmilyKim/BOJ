// https://www.acmicpc.net/problem/1167
/*
트리의 지름

트리의 지름이란, 트리에서 임의의 두 점 사이의 거리 중 가장 긴 것을 말한다. 트리의 지름을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[v], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(v, data);

// 문제 로직
/**
 * DFS
1. 일단 1번 루트에서 가장 먼 노드 X를 찾고
2. 노드 X로부터 가장 먼 노드 Y까지의 거리 구하기
 */

// 각 노드 연결관계 데이터 입력
const tree = Array.from({ length: v + 1 }, () => []);
for (const [node, ...rel] of data) {
  for (let i = 0; i < rel.length - 1; i += 2) {
    tree[node].push([rel[i], rel[i + 1]]);
  }
}
// console.log(tree);

// 1번 루트 노드에서 가장 먼 노드 X 찾기
let visited = new Array(v + 1).fill(false);
let maxDistance = { node: 0, dist: Number.MIN_SAFE_INTEGER };
function dfs(node, dist) {
  visited[node] = true;
  if (maxDistance.dist < dist) maxDistance = { node, dist };
  for (let [nextNode, nextDist] of tree[node]) {
    if (visited[nextNode]) continue;
    dfs(nextNode, dist + nextDist);
  }
}
dfs(1, 0);

// 노드 X에서 가장 먼 노드 Y까지의 거리 구하기
maxDistance.dist = Number.MIN_SAFE_INTEGER; // 초기화
visited.fill(false); // 초기화
dfs(maxDistance.node, 0);

// 최종 결과 출력
console.log(maxDistance.dist);
