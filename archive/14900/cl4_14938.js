// https://www.acmicpc.net/problem/14938
/*
서강그라운드

예은이는 요즘 가장 인기가 있는 게임 서강그라운드를 즐기고 있다. 서강그라운드는 여러 지역중 하나의 지역에 낙하산을 타고 낙하하여, 그 지역에 떨어져 있는 아이템들을 이용해 서바이벌을 하는 게임이다. 서강그라운드에서 1등을 하면 보상으로 치킨을 주는데, 예은이는 단 한번도 치킨을 먹을 수가 없었다. 자신이 치킨을 못 먹는 이유는 실력 때문이 아니라 아이템 운이 없어서라고 생각한 예은이는 낙하산에서 떨어질 때 각 지역에 아이템 들이 몇 개 있는지 알려주는 프로그램을 개발을 하였지만 어디로 낙하해야 자신의 수색 범위 내에서 가장 많은 아이템을 얻을 수 있는지 알 수 없었다.

각 지역은 일정한 길이 l (1 ≤ l ≤ 15)의 길로 다른 지역과 연결되어 있고 이 길은 양방향 통행이 가능하다. 예은이는 낙하한 지역을 중심으로 거리가 수색 범위 m (1 ≤ m ≤ 15) 이내의 모든 지역의 아이템을 습득 가능하다고 할 때, 예은이가 얻을 수 있는 아이템의 최대 개수를 알려주자.
...

주어진 필드가 위의 그림과 같고, 예은이의 수색범위가 4라고 하자. ( 원 밖의 숫자는 지역 번호, 안의 숫자는 아이템 수, 선 위의 숫자는 거리를 의미한다) 예은이가 2번 지역에 떨어지게 되면 1번,2번(자기 지역), 3번, 5번 지역에 도달할 수 있다. (4번 지역의 경우 가는 거리가 3 + 5 = 8 > 4(수색범위) 이므로 4번 지역의 아이템을 얻을 수 없다.) 이렇게 되면 예은이는 23개의 아이템을 얻을 수 있고, 이는 위의 필드에서 예은이가 얻을 수 있는 아이템의 최대 개수이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, M, R], [...item], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, M, R, item, data);

// 문제 로직
/**
 * 다익스트라 (최소힙 활용). 양방향 간선
 */

// 다익스트라에 필요한 최소힙 구현
class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp();
    // console.log('push: ', val, '/', this.heap);
  }
  _bubbleUp() {
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[curIdx].cost < this.heap[parIdx].cost) {
      this._swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return;
    if (this.heap.length === 1) return this.heap.pop();
    const elToReturn = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    // console.log('--> pop: ', elToReturn);
    return elToReturn;
  }
  _bubbleDown() {
    let curIdx = 0;
    let leftIdx = curIdx * 2 + 1;
    let rightIdx = curIdx * 2 + 2;
    while (
      (this.heap[leftIdx] && this.heap[leftIdx].cost < this.heap[curIdx].cost) ||
      (this.heap[rightIdx] && this.heap[rightIdx].cost < this.heap[curIdx].cost)
    ) {
      let smallerIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[rightIdx].cost < this.heap[smallerIdx].cost) {
        smallerIdx = rightIdx;
      }
      this._swap(curIdx, smallerIdx);
      curIdx = smallerIdx;
      leftIdx = curIdx * 2 + 1;
      rightIdx = curIdx * 2 + 2;
    }
  }
}

// 다익스트라 함수
function dijkstra(start) {
  const heap = new MinHeap();
  heap.push({ node: start, cost: 0 });
  const dist = Array.from({ length: N + 1 }, () => Infinity);
  dist[start] = 0;
  while (!heap.isEmpty()) {
    const { node: cur, cost: curCost } = heap.pop();
    for (const [from, to, cost] of data) {
      const nextCost = cost + curCost;
      if (from === cur && nextCost < dist[to]) {
        dist[to] = nextCost;
        heap.push({ node: to, cost: nextCost });
      } else if (to === cur && nextCost < dist[from]) {
        dist[from] = nextCost;
        heap.push({ node: from, cost: nextCost });
      }
    }
  }
  return dist;
}

// 착륙지점 바꿔가며 모을 수 있는 아이템 수 시뮬 후 최대값 출력
const result = [];
for (let i = 1; i <= N; i++) {
  // console.log('=== start : ', i, '=========');
  const dist = dijkstra(i);
  let sum = 0;
  for (let j = 0; j < N; j++) {
    if (dist[j + 1] <= M) sum += item[j];
  }
  result.push(sum);
}
// console.log(result);
console.log(Math.max(...result));
