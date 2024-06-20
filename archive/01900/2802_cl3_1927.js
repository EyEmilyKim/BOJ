// https://www.acmicpc.net/problem/1927
/*
최소 힙

널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

배열에 자연수 x를 넣는다.
배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = input.shift();
// console.log(input);

// 문제 로직
/**
 * 최소 힙 사용하는 문제
 * 힙 노드(이진 트리) 간 관계성 :
  - 왼쪽 자식 idx = 부모idx*2+1
  - 오른쪽 자식 idx = 부모idx*2+2
  - 부모 idx = Math.floor((자식idx-1)/2)
*/

// 최소 힙 구현
class MinHeap {
  constructor() {
    this.heap = [];
    // console.log(this.heap);
  }
  // 값 넣기
  insert(value) {
    this.heap.push(value); // 힙 맨 끝에 노드 추가하고
    this.bubbleUp(value); // 위로 heapify
  }
  // 최소값 꺼내기
  remove() {
    if (this.heap.length === 1) return this.heap.pop(); // 노드 하나 남았으면 꺼내고 끝
    else if (this.heap.length > 1) {
      const value = this.heap[0]; // 최소값(맨 위 노드 값) 저장
      this.heap[0] = this.heap.pop(); // 힙 맨끝 노드 맨위로 옮기고
      this.bubbleDown(value); // 아래로 heapify
      return value; // 최소값 반환
    }
  }
  // 두 노드 값 교환
  swapValue(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  // 위로 heapify
  bubbleUp(value) {
    let curIdx = this.heap.length - 1; // 새로 추가한 노드 idx
    let parIdx = Math.floor((curIdx - 1) / 2); // 부모 노드 idx
    while (this.heap[parIdx] && this.heap[curIdx] < this.heap[parIdx]) {
      // 부모 노드 존재하고 새 노드 값이 부모 노드 값보다 크면
      this.swapValue(curIdx, parIdx); // 두 노드 값 교체
      curIdx = parIdx; // heaplify 진행 위한 타겟 idx 조정
      parIdx = Math.floor((curIdx - 1) / 2); // 새 부모 노드 idx
    }
    // console.log('insert', value, this.heap);
  }
  // 아래로 heapify
  bubbleDown(value) {
    let curIdx = 0; // 옮겨온 노드 idx
    let leftIdx = curIdx * 2 + 1; // 왼쪽 자식 idx
    let rightIdx = curIdx * 2 + 2; // 오른쪽 자식 idx
    while (
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[curIdx]) ||
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[curIdx])
      // 좌 or 우 자식이 있고 현재 노드보다 작다면
    ) {
      let smallerIdx = leftIdx; // 일단 왼쪽 자식 작다 가정하고
      if (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[smallerIdx])
        // 오른쪽 자식 있고 왼쪽 자식보다 작다면
        smallerIdx = rightIdx; // 오른쪽 자식으로 타겟 변경
      this.swapValue(curIdx, smallerIdx); // 두 노드 값 교체
      curIdx = smallerIdx; // heaplify 진행 위한 타겟 idx 조정
      leftIdx = curIdx * 2 + 1; // 새 왼쪽 자식 idx
      rightIdx = curIdx * 2 + 2; // 새 오른쪽 자식 idx
    }
    // console.log('remove', value, this.heap);
  }
}

// 작업 수행
const heap = new MinHeap();
const result = [];
input.forEach((i) => {
  const val = Number(i);
  if (val) heap.insert(val); // 자연수 주어지면 힙 배열에 추가
  else result.push(heap.remove() || 0); // 0 들어오면 최소값 출력 (값 없으면 0)
});
console.log(result.join('\n'));
