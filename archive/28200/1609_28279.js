// https://www.acmicpc.net/problem/28279
/*
덱 2

정수를 저장하는 덱을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여덟 가지이다.

1 X: 정수 X를 덱의 앞에 넣는다. (1 ≤ X ≤ 100,000)
2 X: 정수 X를 덱의 뒤에 넣는다. (1 ≤ X ≤ 100,000)
3: 덱에 정수가 있다면 맨 앞의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
4: 덱에 정수가 있다면 맨 뒤의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
5: 덱에 들어있는 정수의 개수를 출력한다.
6: 덱이 비어있으면 1, 아니면 0을 출력한다.
7: 덱에 정수가 있다면 맨 앞의 정수를 출력한다. 없다면 -1을 대신 출력한다.
8: 덱에 정수가 있다면 맨 뒤의 정수를 출력한다. 없다면 -1을 대신 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N], ...input] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, input);

// 문제 로직

// 덱 구현
class Node {
  next = null;
  prev = null;
  constructor(v) {
    this.value = v;
  }
}

class Deque {
  head = null;
  tail = null;
  size = 0;

  insert(val, type) {
    const curNode = new Node(val);
    if (!this.size) {
      if (!this.head) this.head = curNode;
      if (!this.tail) this.tail = curNode;
    } else {
      if (type === 'front') {
        this.head.prev = curNode;
        curNode.next = this.head;
        this.head = curNode;
      } else if (type === 'back') {
        this.tail.next = curNode;
        curNode.prev = this.tail;
        this.tail = curNode;
      }
    }
    this.size += 1;
  }

  extractFront() {
    if (!this.head) return -1;

    const curVal = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    else this.head.prev = null;
    this.size -= 1;
    return curVal;
  }

  extractBack() {
    if (!this.tail) return -1;

    const curVal = this.tail.value;
    this.tail = this.tail.prev;
    if (!this.tail) this.head = null;
    else this.tail.next = null;
    this.size -= 1;
    return curVal;
  }

  length() {
    return this.size;
  }

  isEmpty() {
    return !this.size ? 1 : 0;
  }

  printFront() {
    if (!this.head) return -1;
    return this.head.value;
  }
  printBack() {
    if (!this.tail) return -1;
    return this.tail.value;
  }
}

// 작업 수행
const deque = new Deque();
const result = [];
for (let i of input) {
  const [c, v] = i;
  switch (c) {
    case 1:
      deque.insert(v, 'front');
      break;
    case 2:
      deque.insert(v, 'back');
      break;
    case 3:
      result.push(deque.extractFront());
      break;
    case 4:
      result.push(deque.extractBack());
      break;
    case 5:
      result.push(deque.length());
      break;
    case 6:
      result.push(deque.isEmpty());
      break;
    case 7:
      result.push(deque.printFront());
      break;
    case 8:
      result.push(deque.printBack());
      break;
  }
}

console.log(result.join('\n'));
