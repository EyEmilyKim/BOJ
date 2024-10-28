// https://www.acmicpc.net/problem/11725
/*
트리의 부모 찾기

루트 없는 트리가 주어진다. 이때, 트리의 루트를 1이라고 정했을 때, 각 노드의 부모를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, data);

// 문제 로직

// 데이터 입력
const graph = Array.from({ length: N + 1 }, () => []); // 각 노드에 연결된 노드 저장
data.forEach((el) => {
  const [from, to] = el;
  graph[from].push(to);
  graph[to].push(from);
});
// console.log(graph);

// 기점 노드부터 연결관계 재귀적으로 찾아가며 각 노드의 부모 노드 구하는 DFS 함수
const parentNodes = new Array(N + 1).fill(null);
const checked = new Array(N + 1).fill(false);

function dfsSearchForParent(curNode) {
  if (checked[curNode]) return;

  checked[curNode] = true;
  graph[curNode].forEach((child) => {
    if (!checked[child]) parentNodes[child] = curNode;
    dfsSearchForParent(child);
  });
}

// 루트 노드 1 부터 보무 노드 찾기
dfsSearchForParent(1);
// console.log(parentNodes);

// 결과 출력
console.log(parentNodes.slice(2).join('\n'));
