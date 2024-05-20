// https://www.acmicpc.net/problem/2164
/*
카드2

N장의 카드가 있다. 각각의 카드는 차례로 1부터 N까지의 번호가 붙어 있으며, 1번 카드가 제일 위에, N번 카드가 제일 아래인 상태로 순서대로 카드가 놓여 있다.

이제 다음과 같은 동작을 카드가 한 장 남을 때까지 반복하게 된다. 우선, 제일 위에 있는 카드를 바닥에 버린다. 그 다음, 제일 위에 있는 카드를 제일 아래에 있는 카드 밑으로 옮긴다.

예를 들어 N=4인 경우를 생각해 보자. 카드는 제일 위에서부터 1234 의 순서로 놓여있다. 1을 버리면 234가 남는다. 여기서 2를 제일 아래로 옮기면 342가 된다. 3을 버리면 42가 되고, 4를 밑으로 옮기면 24가 된다. 마지막으로 2를 버리고 나면, 남는 카드는 4가 된다.

N이 주어졌을 때, 제일 마지막에 남게 되는 카드를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직 - Linked List 사용

// Linked List 구현
class Node {
  // 생성자
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  // 생성자
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // 노드 추가하기
  push(val) {
    const newNode = new Node(val);
    if (!this.head) this.head = newNode;
    else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    this.tail = newNode;
    this.length++;
    return newNode;
  }
  // 첫 노드(head) 얻기
  getHead() {
    return this.head.val;
  }
  // 첫 노드(head) LinkedList 에서 지우기
  removeHead() {
    this.head = this.head.next;
    this.head.prev = null;
    this.length--;
  }
  // LinkedList 길이 얻기
  getLength() {
    return this.length;
  }
}

// 카드 준비 & 작업 수행
const cards = new LinkedList();
for (let i = 1; i <= input; i++) {
  cards.push(i);
}
// console.log(cards);
while (cards.getLength() > 1) {
  cards.removeHead();
  cards.push(cards.getHead());
  cards.removeHead();
}
console.log(cards.getHead());

/**
 * 카드더미를 배열로 만들어 shift(), push()로 작업 반복하면 
 입력값이 클 때 카드 더미 index 값 할당도 오래 걸리고, 
 맨앞 카드 삭제 시 index 값도 매번 -1씩 바꾸느라 시간이 엄청 오래 걸린다.
 
 * Linked List 는 배열처럼 요소들에 인덱스 번호를 붙이지 않고
 각 노드(배열의 각 요소에 해당)들을 포인터로 연결하므로, 
 삽입, 삭제가 빈번한 경우 사용하기 좋다.

 - HEAD : Linked List 의 첫 노드
 - TAIL : Linked List 의 마지막 노드
 - LENGTH : Linked List 의 총 길이 = 데이터 개수
 - NEXT : 각 노드의 다음 노드
 - PREV : 각 노드의 이전 노드
 */

// 시간 초과되는 방법 - 배열 shift 와 push 반복..
// (N = 50만 일 때 425712 나오는데 3~5분 정도 걸린 듯;;)
const arr = Array.from({ length: input }, (v, i) => (v = i + 1));
console.log(arr);
while (arr.length > 1) {
  arr.shift();
  const down = arr.shift();
  arr.push(down);
  // console.log(arr);
}
console.log(arr[0]);

/**
 * Array.from() 함수
 : 
 유사 배열 객체나 반복 가능한(iterable) 객체를 배열로 변환할 수 있다. 
 예를 들어, 문자열, Set, Map 등을 배열로 변환할 때 사용될 수 있다.

 두 가지 형태의 매개변수:
  - 변환하고자 하는 유사 배열 객체나 반복 가능한 객체(iterable)
  - 변환을 수행할 때 각 요소에 대해 호출될 매핑 함수와 
    선택적으로 매핑 함수 내에서 사용될 컨텍스트(this)

// 문자열을 배열로 변환
  const str = 'hello';
  const arr = Array.from(str);
  console.log(arr); // ['h', 'e', 'l', 'l', 'o']

// Set을 배열로 변환
  const set = new Set([1, 2, 3, 3, 4, 1, 5]); // Set(5) { 1, 2, 3, 4, 5 }
  const arrFromSet = Array.from(set);
  console.log(arrFromSet); // [ 1, 2, 3, 4, 5 ] 

// Map을 배열로 변환 (매핑 함수 사용)
  const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
  console.log(map); //Map(3) { 1 => 'one', 2 => 'two', 3 => 'three' }
  const arrFromMap = Array.from(map, ([key, value]) => `${key}: ${value}`);
  console.log(arrFromMap); // ['1: one', '2: two', '3: three']

 */

/** TBC
 * 큐를 사용하는 방법은... ?
 */
