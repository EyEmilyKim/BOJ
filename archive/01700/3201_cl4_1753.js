// https://www.acmicpc.net/problem/1753
/*
최단경로

방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[V, E], [K], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(V, E, K, data);

// 문제 로직
/**
 * 다익스트라 알고리즘 : 주어진 기점에서 각 정점까지의 최단거리(비용) 구함
 */

class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  enqueue(el) {
    // el:[경로 누적합, 노드to]
    let elInserted = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i][0] > el[0]) {
        this.queue.splice(i, 0, el); // 낑겨 넣기(누적합 오름차순 되게)
        elInserted = true;
        break;
      }
    }
    if (!elInserted) this.queue.push(el); // 맨 뒤에 넣기
  }
  dequeue() {
    if (!this.isEmpty()) return this.queue.shift();
  }
}

// 각 노드 연결관계 입력
const link = Array.from({ length: V + 1 }, () => new Array());
for (const [u, v, w] of data) {
  link[u].push([v, w]);
}
// console.log(link);

// 주어진 기점에서 각 노드까지 최단 경로 구하는 다익스트라 함수
function dijkstra(start) {
  const pq = new PriorityQueue();
  const dp = new Array(V + 1).fill(Infinity);
  dp[start] = 0;
  pq.enqueue([0, start]);
  while (!pq.isEmpty()) {
    const [pqW, pqV] = pq.dequeue();
    for (let [linkV, linkW] of link[pqV]) {
      const totalW = pqW + linkW;
      if (totalW < dp[linkV]) {
        dp[linkV] = totalW;
        pq.enqueue([totalW, linkV]);
      }
    }
  }
  return dp;
}

// 작업 수행
const dp = dijkstra(K);
// console.log(dp);
const result = [];
for (let i = 1; i <= V; i++) {
  result.push(dp[i] === Infinity ? 'INF' : dp[i]);
}
console.log(result.join('\n'));
