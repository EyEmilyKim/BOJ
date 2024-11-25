// https://www.acmicpc.net/problem/1504
/*
특정한 최단 경로

방향성이 없는 그래프가 주어진다. 세준이는 1번 정점에서 N번 정점으로 최단 거리로 이동하려고 한다. 또한 세준이는 두 가지 조건을 만족하면서 이동하는 특정한 최단 경로를 구하고 싶은데, 그것은 바로 임의로 주어진 두 정점은 반드시 통과해야 한다는 것이다.

세준이는 한번 이동했던 정점은 물론, 한번 이동했던 간선도 다시 이동할 수 있다. 하지만 반드시 최단 경로로 이동해야 한다는 사실에 주의하라. 1번 정점에서 N번 정점으로 이동할 때, 주어진 두 정점을 반드시 거치면서 최단 경로로 이동하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, E], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
const [v1, v2] = data.pop();
// console.log(N, E, data, v1, v2);

// 문제 로직
/**
* 최단 경로 + 주어진 두 정점 통과 필수.
* 다익스트라 알고리즘 : 주어진 기점에서 각 정점까지의 최단거리(비용) 구함 * 아래 2가지 경로 중 최단거리인 경우 선택
  1 - v1 - v2 - N 
  1 - v2 - v1 - N
=> 다익스트라 O(N*logN) * 3번 (1, v1, v2 출발)
*/

// 우선순위 큐 구현
class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  //prettier-ignore
  enqueue(el) { // el : [경로 누적합, 노드to]
    let elInserted = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i][0] > el[0]) {
        this.queue.splice(i, 0, el); // 낑겨넣기 (누적합 오름차순 되게)
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
const link = Array.from({ length: N + 1 }, () => new Array());
for (const [a, b, c] of data) {
  link[a].push([b, c]);
  link[b].push([a, c]);
}
// console.log(link);

// 주어진 기점에서 각 노드까지 최단경로 구하는 다익스트라 함수
function dijkstra(start) {
  const pq = new PriorityQueue();
  const dp = new Array(N + 1).fill(Infinity);
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
const dp1 = dijkstra(1);
const dpV1 = dijkstra(v1);
const dpV2 = dijkstra(v2);
// console.log('resStart', resStart);
// console.log('resV1', resV1);
// console.log('resV2', resV2);
// prettier-ignore
const result = Math.min(
  dp1[v1] + dpV1[v2] + dpV2[N], 
  dp1[v2] + dpV2[v1] + dpV1[N]
);
console.log(result === Infinity ? -1 : result);
