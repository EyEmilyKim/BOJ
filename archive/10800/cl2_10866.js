// https://www.acmicpc.net/problem/10866
/*
덱

정수를 저장하는 덱(Deque)를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여덟 가지이다.

- push_front X: 정수 X를 덱의 앞에 넣는다.
- push_back X: 정수 X를 덱의 뒤에 넣는다.
- pop_front: 덱의 가장 앞에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- pop_back: 덱의 가장 뒤에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- size: 덱에 들어있는 정수의 개수를 출력한다.
- empty: 덱이 비어있으면 1을, 아니면 0을 출력한다.
- front: 덱의 가장 앞에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- back: 덱의 가장 뒤에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const commands = input;
// console.log(N, commands);

// 문제 로직

// 큐 구현
class Node {
  constructor(v) {
    this.val = v;
    this.next = null;
    this.prev = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push_front(i) {
    const newNode = new Node(i);
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }
  push_back(i) {
    const newNode = new Node(i);
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  pop_front() {
    if (!this.length) return -1;
    else {
      const tmp = this.head;
      this.head = this.head.next;
      this.length--;
      return tmp.val;
    }
  }
  pop_back() {
    if (!this.length) return -1;
    else {
      const tmp = this.tail;
      this.tail = this.tail.prev;
      this.length--;
      return tmp.val;
    }
  }
  size() {
    return this.length;
  }
  empty() {
    if (!this.length) return 1;
    else return 0;
  }
  front() {
    if (!this.length) return -1;
    else return this.head.val;
  }
  back() {
    if (!this.length) return -1;
    else return this.tail.val;
  }
}

// 작업 수행
const deque = new LinkedList();
const result = [];
commands.forEach((i) => {
  switch (i.split('_')[0]) {
    case 'push':
      if (i.split('_')[1].slice(0, 4) === 'back') {
        deque.push_back(i.split(' ')[1]);
      } else {
        deque.push_front(i.split(' ')[1]);
      }
      break;
    case 'pop':
      if (i.split('_')[1].slice(0, 4) === 'back') {
        result.push(deque.pop_back(i.split(' ')[1]));
      } else {
        result.push(deque.pop_front(i.split(' ')[1]));
      }
      break;
    case 'size':
      result.push(deque.size());
      break;
    case 'empty':
      result.push(deque.empty());
      break;
    case 'front':
      result.push(deque.front());
      break;
    case 'back':
      result.push(deque.back());
      break;
  }
});
console.log(result.join('\n'));
