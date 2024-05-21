// https://www.acmicpc.net/problem/10845
/*
큐

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
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(i) {
    const newNode = new Node(i);
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
  }
  pop() {
    if (!this.length) return -1;
    else {
      const tmp = this.head;
      this.head = this.head.next;
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
const queue = new LinkedList();
const result = [];
commands.forEach((i) => {
  switch (i) {
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
    default:
      queue.push(i.split(' ')[1]);
      break;
  }
});
console.log(result.join('\n'));

/**
 LinkedList 클래스 정의부에서 
 필드 속성 size 와 메서드 size() 이름이 같으면 함수가 속성으로 취급되는 오류 발생.
 => 필드 속성명을 length 로 바꿔 충돌 피해주니 정상 작동했다.
 */
