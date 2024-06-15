// https://www.acmicpc.net/problem/2606
/*
바이러스

신종 바이러스인 웜 바이러스는 네트워크를 통해 전파된다. 한 컴퓨터가 웜 바이러스에 걸리면 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 된다.

예를 들어 7대의 컴퓨터가 <그림 1>과 같이 네트워크 상에서 연결되어 있다고 하자. 1번 컴퓨터가 웜 바이러스에 걸리면 웜 바이러스는 2번과 5번 컴퓨터를 거쳐 3번과 6번 컴퓨터까지 전파되어 2, 3, 5, 6 네 대의 컴퓨터는 웜 바이러스에 걸리게 된다. 하지만 4번과 7번 컴퓨터는 1번 컴퓨터와 네트워크상에서 연결되어 있지 않기 때문에 영향을 받지 않는다.
...

어느 날 1번 컴퓨터가 웜 바이러스에 걸렸다. 컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const P = +input.shift();
const pairs = input.map((i) => i.split(' ').map(Number));
// console.log(N, P, pairs);

// 문제 로직 - dfs

// 연결된 네트워크 입력 - 예) graph[1] : 컴1과 연결된 컴들
const graph = Array.from(new Array(N + 1), () => []);
pairs.forEach((i) => {
  const [a, b] = [...i];
  graph[a].push(b);
  graph[b].push(a);
});
// console.log(graph);

// 감염된 노드 from과 연결된 컴 방문하면서 감염처리하는 dfs함수
const visited = Array.from(Array(N + 1), () => 0);
visited[1] = true; // 컴1은 감염원
let infected = 0; // 감염원 컴1로부터 감염된 컴 수
function dfs(from) {
  for (let connected of graph[from]) {
    if (visited[connected]) continue;
    visited[connected] = true;
    infected++;
    dfs(connected);
  }
}
dfs(1); // 1을 감염원으로 dfs 시작

console.log(infected); // 감염 수 출력

// 문제 로직 - 틀린 방법 : 연결고리를 늦게 알면 카운트 제대로 안됨
const connected = new Set([1]); // 1번 컴퓨터와 연결된 컴퓨터 저장할 Set
// console.log(connected);
pairs.forEach((i) => {
  const [from, to] = [...i];
  if (connected.has(from)) {
    connected.add(to);
  }
  // console.log(from, to, connected);
});
const result = connected.size - 1; // 1번 컴을 제외한 새로 감염된 컴 수
console.log(result);

/**
 * 맞은 풀이 : 그래프 탐색 dfs
 * 틀린 풀이 : 그냥 순회로는 연결고리를 늦게 알게 되는 경우 제대로 처리/카운트 할 수 없음
 */
