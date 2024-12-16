// https://www.acmicpc.net/problem/11779
/*
최소비용 구하기 2

n(1≤n≤1,000)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1≤m≤100,000)개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다. 그러면 A번째 도시에서 B번째 도시 까지 가는데 드는 최소비용과 경로를 출력하여라. 항상 시작점에서 도착점으로의 경로가 존재한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N], [M], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
const [A, B] = data.pop();
// console.log(N, M, data, A, B);

// 문제 로직
/**
 * 다익스트라.
 * 최단비용은 평소처럼 구하고, 추가로 최단 경로도 저장하기 위해 distance 배열을 2차원으로 생성
 */

// 버스 연결 정보 입력
const bus = Array.from({ length: N + 1 }, () => []);
for (let [s, e, c] of data) {
  bus[s].push([e, c]);
}

// 다익스트라 함수
function dijkstra(start, end) {
  const distance = Array.from({ length: N + 1 }, () => [Infinity, Array()]);
  const visited = Array(N + 1).fill(false);
  distance[start][0] = 0;
  distance[start][1].push(start);

  for (let i = 0; i < N; i++) {
    const cur = getMinNode(distance, visited);
    if (cur === -1) break;
    visited[cur] = true;

    for (const [v, c] of bus[cur]) {
      const dist = distance[cur][0] + c;

      if (dist < distance[v][0]) {
        distance[v][0] = dist;
        distance[v][1] = [...distance[cur][1], v];
      }
    }
  }

  return distance[end];
}

function getMinNode(distance, visited) {
  let minDistance = Infinity;
  let minNode = -1;
  for (let i = 1; i <= N; i++) {
    if (!visited[i] && distance[i][0] < minDistance) {
      minDistance = distance[i][0];
      minNode = i;
    }
  }
  return minNode;
}

// 작업 수행 및 결과 출력
const result = [];
const arr = dijkstra(A, B);
result.push(arr[0], arr[1].length, arr[1].join(' '));
console.log(result.join('\n'));
