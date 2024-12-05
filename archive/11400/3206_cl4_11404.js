// https://www.acmicpc.net/problem/11404
/*
플로이드

n(2 ≤ n ≤ 100)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1 ≤ m ≤ 100,000)개의 버스가 있다. 각 버스는 한 번 사용할 때 필요한 비용이 있다.

모든 도시의 쌍 (A, B)에 대해서 도시 A에서 B로 가는데 필요한 비용의 최솟값을 구하는 프로그램을 작성하시오.

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
// console.log(N, M, data);

// 문제 로직
/**
 * 플로이드-워셜 : 모든 정점에서 정점까지의 최단거리 구하는 알고리즘
 * - 비용 배열 INF 로 초기화
 * - 간선의 비용 대입
 * - 경유해서 비용 줄어들 경우 갱신 (3중 for문)
 *
 * (다익스트라 : 한 점에서 모든 점까지의 최단거리 구할 때 사용)
 */

// 모든 정점 to 모든 정점 비용 배열 초기화
const INF = Number.MAX_SAFE_INTEGER;
const dist = Array.from(Array(N + 1), () => Array(N + 1).fill(INF));
for (let i = 1; i <= N; i++) dist[i][i] = 0;

// 주어진 간선 데이터 입력
for (const [from, to, cost] of data) {
  dist[from][to] = Math.min(dist[from][to], cost);
}

// 직행 비용과 경유 비용 비교, 최소값 갱신
// k: 경유지, f: 출발지, t: 도착지
for (let k = 1; k <= N; k++) {
  for (let f = 1; f <= N; f++) {
    for (let t = 1; t <= N; t++) {
      dist[f][t] = Math.min(dist[f][t], dist[f][k] + dist[k][t]);
    }
  }
}

// 결과 출력
const result = [];
for (let f = 1; f <= N; f++) {
  let output = '';
  for (let t = 1; t <= N; t++) {
    output += dist[f][t] === INF ? '0 ' : dist[f][t] + ' ';
  }
  result.push(output.trim());
}
console.log(result.join('\n'));
