// https://www.acmicpc.net/problem/18258
/*
큐 2

정수를 저장하는 큐를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여섯 가지이다.

- push X: 정수 X를 큐에 넣는 연산이다.
- pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- size: 큐에 들어있는 정수의 개수를 출력한다.
- empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
- front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N], ...input] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' '));
// console.log(N, input);

// 문제 로직

// 큐 구현
class Node {
  next = null;
  prev = null;
  constructor(val) {
    this.value = val;
  }
}
class Queue {
  head = null;
  tail = null;
  length = 0;
  constructor() {}
  push(val) {
    const curNode = new Node(val);
    if (this.length === 0) {
      this.head = curNode;
      this.tail = curNode;
    } else {
      curNode.prev = this.tail;
      this.tail.next = curNode;
      this.tail = curNode;
    }
    this.length++;
  }

  pop() {
    if (this.length === 0) return -1;
    const top = this.head;
    this.head = this.head.next;
    this.length--;
    return top.value;
  }

  size() {
    return this.length;
  }

  empty() {
    return !this.length ? 1 : 0;
  }

  front() {
    if (!this.length) return -1;
    return this.head.value;
  }

  back() {
    if (!this.length) return -1;
    return this.tail.value;
  }
}

// 작업 수행
const queue = new Queue();
const result = [];
for (let i of input) {
  const [cmd, val] = i;
  switch (cmd) {
    case 'push':
      queue.push(+val);
      break;
    case 'pop':
      result.push(queue.pop());
      break;
    case 'size':
      result.push(queue.size());
      break;
    case 'empty':
      result.push(queue.empty());
      break;
    case 'front':
      result.push(queue.front());
      break;
    case 'back':
      result.push(queue.back());
      break;
  }
}
console.log(result.join('\n'));
