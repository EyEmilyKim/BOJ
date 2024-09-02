// https://www.acmicpc.net/problem/11286
/*
절댓값 힙

절댓값 힙은 다음과 같은 연산을 지원하는 자료구조이다.

배열에 정수 x (x ≠ 0)를 넣는다.
배열에서 절댓값이 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다. 절댓값이 가장 작은 값이 여러개일 때는, 가장 작은 수를 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const [N, ...nums] = input;
// console.log(N, nums);

// 문제 로직

// 최소 절대값 힙 구현
class AbsoluteMinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0 ? true : false;
  }
  swapValue(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  insert(v) {
    this.heap.push(v);
    this.bubbleUp();
  } // [절대값, 원래값] 으로 값 저장

  bubbleUp() {
    let curIdx = this.heap.length - 1;
    const cur = this.heap[curIdx];

    while (curIdx > 0) {
      const parIdx = Math.floor((curIdx - 1) / 2);
      let par = this.heap[parIdx];

      if (cur[0] > par[0] || (cur[0] === par[0] && cur[1] > par[1])) break;
      this.swapValue(parIdx, curIdx);
      curIdx = parIdx;
    }
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop()[1];
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min[1];
  }

  bubbleDown(idx) {
    const length = this.heap.length;
    const cur = this.heap[idx];

    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let left, right;
      let smallestIdx = null;

      if (leftIdx < length) {
        left = this.heap[leftIdx];
        if (left[0] < cur[0] || (left[0] === cur[0] && left[1] < cur[1])) smallestIdx = leftIdx;
      }

      if (rightIdx < length) {
        right = this.heap[rightIdx];
        if (smallestIdx === null) {
          if (right[0] < cur[0] || (right[0] === cur[0] && right[1] < cur[1]))
            smallestIdx = rightIdx;
        } else {
          if (right[0] < left[0] || (right[0] === left[0] && right[1] < left[1]))
            smallestIdx = rightIdx;
        }
      }

      if (smallestIdx === null) break;
      this.swapValue(idx, smallestIdx);
      idx = smallestIdx;
    }
  }
}

// 작업 수행
const result = [];
const heap = new AbsoluteMinHeap();
for (let num of nums) {
  if (num === 0) {
    if (heap.isEmpty()) result.push(0);
    else result.push(heap.extractMin());
  } else heap.insert([Math.abs(num), num]);
}
// 출력
console.log(result.join('\n'));
