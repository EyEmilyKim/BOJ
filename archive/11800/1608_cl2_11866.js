// https://www.acmicpc.net/problem/11866
/*
요세푸스 문제 0

요세푸스 문제는 다음과 같다.

1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다. 이제 순서대로 K번째 사람을 제거한다. 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다. 이 과정은 N명의 사람이 모두 제거될 때까지 계속된다. 원에서 사람들이 제거되는 순서를 (N, K)-요세푸스 순열이라고 한다. 예를 들어 (7, 3)-요세푸스 순열은 <3, 6, 2, 7, 5, 1, 4>이다.

N과 K가 주어지면 (N, K)-요세푸스 순열을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, K] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(N, K);

// 문제 로직

//Double Linked List 로 Queue 구현
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
  enqueue(i) {
    const newNode = new Node(i);
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  dequeue() {
    if (this.length === 0) return -1;
    const tmp = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return tmp.val;
  }
  size() {
    return this.length;
  }
}

// N명의 원 준비
const circle = new LinkedList();
for (let i = 1; i <= N; i++) {
  circle.enqueue(i);
}
// console.log(circle);

// 작업 수행
const list = [];
while (circle.size() > 0) {
  for (let i = 1; i <= K; i++) {
    if (i === K) list.push(circle.dequeue());
    else circle.enqueue(circle.dequeue());
  }
}
console.log(`<${list.join(', ')}>`);

/**
 * 문제를 잘못 이해해서 삽질하느라 오래 걸림...
 나는 한 사람 제거 후엔 다시 1번 부터 대상자를 카운트 하는 줄 알았는데 
 그게 아니고 제거된 사람 다음 사람부터 카운트하는 거였다 !
 예시로 주어진 (7,3) => <3, 6, 2, 7, 5, 1, 4> 을 보면
 각 차례에 대상자 제거 후의 원은 아래와 같이 처리됨을 알 수 있다...

 시작- 1234567
  3 - 456712
  6 - 71245
  2 - 4571
  7 - 145
  5 - 14
  1 - 4
  4
 
 */
