// https://www.acmicpc.net/problem/12851
/*
숨바꼭질 2

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 그리고, 가장 빠른 시간으로 찾는 방법이 몇 가지 인지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, K] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(N, K);

// 문제 로직
/**
 * 큐를 이용한 BFS.
 * 해당 위치에 도달한 경우의 수 누적하며 목적지까지 찾아가기.
 */

// 큐 구현
class Node {
  constructor(val) {
    this.item = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);
    if (this.head == null) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }
}

// 동생 찾을 때까지 계속 이동하는 함수
function findingBro(start, end) {
  const max = 100000;
  const visited = new Array(max + 1).fill(0); // 각 지점들 방문여부 겸 몇초 만에 왔는지
  const cnt = new Array(max + 1).fill(0); // 각 지점들 몇 가지 루트로 도달했는지

  // 만약 처음부터 같은 위치에 있으면 0초만에 발견, 1가지 끝.
  if (start === end) return [0, 1];

  // 그 외 보통의 경우 계속 찾아다니기
  const queue = new Queue(); // 수색 도중 거치는 지점들 저장할 큐
  queue.push(start); // 시작 지점 넣어주고
  cnt[start] = 1; // 시작 지점 도달 루트 일단 1가지

  while (queue.length) {
    const cur = queue.pop();
    const next = [cur + 1, cur - 1, cur * 2].filter((v) => 0 <= v && v <= max);
    next.forEach((v) => {
      if (!visited[v]) {
        // 한번도 온 적 없던 위치라면
        queue.push(v); // 수색 지점 큐에 추가
        visited[v] = visited[cur] + 1; // 몇초 만에 왔는지 저장
        cnt[v] += cnt[cur]; // 도달 루트 추가
      } else if (visited[v] == visited[cur] + 1) {
        // 처음 온 건 아니지만 또 도달했다면
        cnt[v] += cnt[cur]; // 도달 루트 추가
      }
    });
  }
  return [visited[end], cnt[end]];
}

// 작업 수행
const result = findingBro(N, K);
console.log(result.join('\n'));
