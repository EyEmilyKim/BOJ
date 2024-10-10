// https://www.acmicpc.net/problem/7662
/*
이중 우선순위 큐

이중 우선순위 큐(dual priority queue)는 전형적인 우선순위 큐처럼 데이터를 삽입, 삭제할 수 있는 자료 구조이다. 전형적인 큐와의 차이점은 데이터를 삭제할 때 연산(operation) 명령에 따라 우선순위가 가장 높은 데이터 또는 가장 낮은 데이터 중 하나를 삭제하는 점이다. 이중 우선순위 큐를 위해선 두 가지 연산이 사용되는데, 하나는 데이터를 삽입하는 연산이고 다른 하나는 데이터를 삭제하는 연산이다. 데이터를 삭제하는 연산은 또 두 가지로 구분되는데 하나는 우선순위가 가장 높은 것을 삭제하기 위한 것이고 다른 하나는 우선순위가 가장 낮은 것을 삭제하기 위한 것이다.

정수만 저장하는 이중 우선순위 큐 Q가 있다고 가정하자. Q에 저장된 각 정수의 값 자체를 우선순위라고 간주하자.

Q에 적용될 일련의 연산이 주어질 때 이를 처리한 후 최종적으로 Q에 저장된 데이터 중 최댓값과 최솟값을 출력하는 프로그램을 작성하라.


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.platform === 'linux' ? process.stdin : fs.createReadStream('./example.txt'),
  output: process.stdout,
  terminal: false,
});

// 문제 로직
/**
 * 최대, 최소 우선순위 큐를 각각 만들어서 2개를 1개의 큐처럼 돌리기.
 * 둘 중 한쪽에서 삭제된 데이터는 다른 쪽에서도 감지할 수 있도록 처리해서 두 큐의 출력 싱크 맞춰줌.
 * => 같은 값이 여러 번 들어올 수 있으므로 boolean 값이 아닌 cnt 값으로 저장
 * 최대, 최소 우선순위 큐 구현은 하나의 공통 로직 코드에 대소 비교 함수를 매개변수로 전달하여 동적으로 활용.

 * 그냥 fs 로 처리하면 메모리 초과...
 */

// 우선 순위 큐 구현
class PriorityQue {
  constructor(compareFunc) {
    this.heap = [];
    this.compareFunc = compareFunc;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
  clear() {
    this.heap = [];
  }

  insert(item) {
    this.heap.push(item);
    this.heapifyUp();
  }
  heapifyUp() {
    let curIdx = this.heap.length - 1;
    const curItem = this.heap[curIdx];
    while (curIdx > 0) {
      const parIdx = Math.floor((curIdx - 1) / 2);
      const parItem = this.heap[parIdx];
      if (this.compareFunc(parItem, curItem)) break;
      this.heap[curIdx] = parItem;
      curIdx = parIdx;
    }
    this.heap[curIdx] = curItem;
  }

  getTop() {
    return this.heap[0];
  }
  pop() {
    const lastIdx = this.heap.length - 1;
    this.heap[0] = this.heap[lastIdx];
    this.heap.pop();

    if (this.heap.length > 0) {
      this.heapifyDown();
    }
  }
  heapifyDown() {
    let curIdx = 0;
    const curItem = this.heap[curIdx];

    while (curIdx < this.heap.length) {
      let leftIdx = curIdx * 2 + 1;
      let rightIdx = curIdx * 2 + 2;

      if (leftIdx >= this.heap.length) break; // 자식 노드 없으면 pass

      const leftItem = this.heap[leftIdx];
      const rightItem = rightIdx < this.heap.length ? this.heap[rightIdx] : null;

      const targetIdx =
        rightItem !== null && this.compareFunc(rightItem, leftItem) ? rightIdx : leftIdx;
      const targetItem = this.heap[targetIdx];

      if (this.compareFunc(curItem, targetItem)) break;

      this.heap[curIdx] = targetItem;
      curIdx = targetIdx;
    }
    this.heap[curIdx] = curItem;
  }
}

// I, D 연산 처리하는 함수
function operate(cmd, val, [maxHeap, minHeap, valid]) {
  if (cmd === 'I') {
    // 두 힙에 모두 넣어줌
    maxHeap.insert(val);
    minHeap.insert(val);
    // 두 힙 출력값 싱크 위해 데이터 유효 카운트 저장
    if (valid.has(val)) valid.set(val, valid.get(val) + 1);
    else valid.set(val, 1);
  } else if (cmd === 'D') {
    if (val === 1) {
      // 최대값 제거
      while (!maxHeap.isEmpty()) {
        const item = maxHeap.getTop();
        maxHeap.pop();

        // 다른 힙에 의해 이미 삭제된 값 아닌지 확인 -> 유효값이면 삭제 반영
        if (valid.get(item) > 0) {
          valid.set(item, valid.get(item) - 1);
          break;
        }
      }
    } else if (val === -1) {
      // 최소값 제거
      while (!minHeap.isEmpty()) {
        const item = minHeap.getTop();
        minHeap.pop();

        // 다른 힙에 의해 이미 삭제된 값 아닌지 확인 -> 유효값이면 삭제 반영
        if (valid.get(item) > 0) {
          valid.set(item, valid.get(item) - 1);
          break;
        }
      }
    }
  }
}

// 작업 수행
let index = 0; // input 데이터에 접근할 idx
let testEnd = 0; // 각 테스트 케이스 끝나는 라인
maxHeap = new PriorityQue((a, b) => a > b);
minHeap = new PriorityQue((a, b) => a < b);
const valid = new Map(); // 두 힙의 출력 싱크를 맞추기 위한 데이터

const result = []; // 테스트 케이스별 최종 결과

rl.on('line', (line) => {
  if (index === 0) {
    const T = +line; // 테스트 케이스 총 개수
    index++;
    return;
  }

  if (index > testEnd) {
    // 새로운 테스트 케이스 만나면 객체 초기화
    testEnd = +line + index++;
    maxHeap.clear();
    minHeap.clear();
    valid.clear();
    return;
  }

  // 주어진 연산 처리
  const [cmd, val] = line.split(' ');
  operate(cmd, Number(val), [maxHeap, minHeap, valid]);
  // console.log(index, 'cmd', cmd, 'val', +val);
  // console.log('maxheap', maxHeap.heap.join(' '));
  // console.log('minheap', minHeap.heap.join(' '));
  // console.log('valid', valid);

  // 마지막 연산을 마쳤다면 큐에 남은 최대값, 최소값 출력
  if (index === testEnd) {
    // 최상위에 남아있는 무효값 다 덜어내기
    while (!maxHeap.isEmpty() && valid.get(maxHeap.getTop()) === 0) {
      maxHeap.pop();
    }
    while (!minHeap.isEmpty() && valid.get(minHeap.getTop()) === 0) {
      minHeap.pop();
    }
    // 유효값 최종 결과에 저장
    if (maxHeap.isEmpty() && minHeap.isEmpty()) {
      result.push('EMPTY');
    } else {
      result.push(`${maxHeap.getTop()} ${minHeap.getTop()}`);
    }
    // console.log('------------------------------');
  }

  index++;
});

rl.on('close', () => {
  // 최종 결과 출력
  console.log(result.join('\n'));
});
