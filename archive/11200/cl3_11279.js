// https://www.acmicpc.net/problem/11279
/*
최대 힙

널리 잘 알려진 자료구조 중 최대 힙이 있다. 최대 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

배열에 자연수 x를 넣는다.
배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const [N, ...nums] = input;
// console.log(N, nums);

// 문제 로직

// 최대 힙 구현
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(value);
  }

  remove() {
    if (this.heap.length === 1) return this.heap.pop();
    else if (this.heap.length > 1) {
      const value = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(value);
      return value;
    }
  }

  swapValue(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  bubbleUp(value) {
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);
    while (this.heap[parIdx] && this.heap[curIdx] > this.heap[parIdx]) {
      this.swapValue(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }

  bubbleDown(value) {
    let curIdx = 0;
    let leftIdx = curIdx * 2 + 1;
    let rightIdx = curIdx * 2 + 2;
    while (
      (this.heap[leftIdx] && this.heap[leftIdx] > this.heap[curIdx]) ||
      (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[curIdx])
    ) {
      let biggerIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[biggerIdx]) biggerIdx = rightIdx;
      this.swapValue(curIdx, biggerIdx);
      curIdx = biggerIdx;
      leftIdx = curIdx * 2 + 1;
      rightIdx = curIdx * 2 + 2;
    }
  }
}

// 작업 수행
const heap = new MaxHeap();
const result = [];
for (let n of nums) {
  if (n) heap.insert(n);
  else result.push(heap.remove() || 0);
}
console.log(result.join('\n'));
