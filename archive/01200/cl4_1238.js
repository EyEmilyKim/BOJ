// https://www.acmicpc.net/problem/1238
/*
파티

N개의 숫자로 구분된 각각의 마을에 한 명의 학생이 살고 있다.

어느 날 이 N명의 학생이 X (1 ≤ X ≤ N)번 마을에 모여서 파티를 벌이기로 했다. 이 마을 사이에는 총 M개의 단방향 도로들이 있고 i번째 길을 지나는데 Ti(1 ≤ Ti ≤ 100)의 시간을 소비한다.

각각의 학생들은 파티에 참석하기 위해 걸어가서 다시 그들의 마을로 돌아와야 한다. 하지만 이 학생들은 워낙 게을러서 최단 시간에 오고 가기를 원한다.

이 도로들은 단방향이기 때문에 아마 그들이 오고 가는 길이 다를지도 모른다. N명의 학생들 중 오고 가는데 가장 많은 시간을 소비하는 학생은 누구일지 구하여라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, M, X], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, M, X, data);

// 문제 로직
/**
 * 갔다 오는 비용 = 각 도시 to X도시 가는 비용 + X도시 to 각 도시 오는 비용

 * 다익스트라 : 기점에서 각 노드까지의 최소 비용 구함. "One to All"
참고) https://velog.io/@devkyoung2/%EB%8B%A4%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%9D%BC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98
=> 출발 노드를 기준으로 비용이 적은 노드를 선택하고, 
그 노드를 거쳐 다른 노드로 가는 경로를 최소 비용으로 업데이트함
- 1. dp 배열 생성, to 출발노드(자기자신) = 0, to 그외 모든 노드 = INF 로 초기화.
- 2. 미방문 노드 중 비용이 가장 낮은 노드부터 선택하여(A) 처리,
  -  A 의 각 인접 노드 X 들에 대해
  -  dp[X] : WegithOfX = min(curWeightOfA + weigthAtoX, curWeightOfX) 갱신
- 3. dp 모든 노드 갱신한 결과가 기점 to 각 노트 최소 비용

  * "All(N) to One(X)" 을 구할 때 
단순하게 one(N) to All * N회 후 dp[X] 구하면 비효율!
=> 간선 방향을 뒤집은 그래프로 one(X) to All 1회로 구할 수 있다.
간선 방향을 뒤집고 1개의 도착점에서 N개의 출발점으로의 각각의 최단거리를 구하면 
간선 방향이 정방향일 때 각 출발점에서 1개의 도착점으로 가는 최단거리와 같다. 
(from -> to 그래프와 to -> from 그래프는 구조적 대칭성을 갖기 때문)
 */

// 우선순위 큐 구현
class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  enqueue(el) {
    // el: [to, weight]

    let elInserted = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i][1] > el[1]) {
        this.queue.splice(i, 0, el); // 끼워넣기(weight 오름차순 되도록)
        elInserted = true;
        break;
      }
    }
    if (!elInserted) this.queue.push(el); // 맨 뒤에 넣기
    // console.log('enqueue', el);
    // console.log(this.queue);
  }
  dequeue() {
    if (!this.isEmpty()) return this.queue.shift();
  }
}

// 마을 간 간선 데이터 입력하기 => origin & reversed
const linkOrg = Array.from({ length: N + 1 }, () => new Array());
const linkRev = Array.from({ length: N + 1 }, () => new Array());
for (const [from, to, weight] of data) {
  linkOrg[from].push([to, weight]);
  linkRev[to].push([from, weight]);
}
// console.log('linkOrg', linkOrg);
// console.log('linkRev', linkRev);

// 기준점 to 각 노드 최소 비용 구하는 다익스트라 함수
function dijkstra(start, link) {
  const pq = new PriorityQueue();
  const visited = new Array(N + 1).fill(false);
  const dp = new Array(N + 1).fill(Infinity);
  dp[start] = 0;
  pq.enqueue([start, 0]);

  while (!pq.isEmpty()) {
    const [pqV, pqW] = pq.dequeue(); // 비용 적은 노드부터 꺼내서 처리
    if (visited[pqV]) continue; // 이미 처리된 노드 pass
    visited[pqV] = true;

    for (let [linkV, linkW] of link[pqV]) {
      const totalW = pqW + linkW;
      if (totalW < dp[linkV]) {
        dp[linkV] = totalW;
        pq.enqueue([linkV, totalW]);
        // console.log(linkV, dp.map((v) => (v === Infinity ? 'inf' : v)).join(' '));
        // console.log(pq);
      }
    }
  }
  return dp;
}

// 각 노드 to X 갔다 오는 비용 구하기
const going = dijkstra(X, linkRev); // All to One(X)
const backing = dijkstra(X, linkOrg); // One(X) to All
const total = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  total[i] = going[i] + backing[i];
}
// console.log('going', going);
// console.log('backing', backing);
// console.log('total', total);

// 결과 출력
console.log(Math.max(...total));
