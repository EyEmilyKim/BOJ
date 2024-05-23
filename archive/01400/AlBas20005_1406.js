// https://www.acmicpc.net/problem/1406
/*
에디터

한 줄로 된 간단한 에디터를 구현하려고 한다. 이 편집기는 영어 소문자만을 기록할 수 있는 편집기로, 최대 600,000글자까지 입력할 수 있다.

이 편집기에는 '커서'라는 것이 있는데, 커서는 문장의 맨 앞(첫 번째 문자의 왼쪽), 문장의 맨 뒤(마지막 문자의 오른쪽), 또는 문장 중간 임의의 곳(모든 연속된 두 문자 사이)에 위치할 수 있다. 즉 길이가 L인 문자열이 현재 편집기에 입력되어 있으면, 커서가 위치할 수 있는 곳은 L+1가지 경우가 있다.

이 편집기가 지원하는 명령어는 다음과 같다.

- L	커서를 왼쪽으로 한 칸 옮김 (커서가 문장의 맨 앞이면 무시됨)
- D	커서를 오른쪽으로 한 칸 옮김 (커서가 문장의 맨 뒤이면 무시됨)
- B	커서 왼쪽에 있는 문자를 삭제함 (커서가 문장의 맨 앞이면 무시됨)
- 삭제로 인해 커서는 한 칸 왼쪽으로 이동한 것처럼 나타나지만, 실제로 커서의 오른쪽에 있던 문자는 그대로임
- P $	$라는 문자를 커서 왼쪽에 추가함

초기에 편집기에 입력되어 있는 문자열이 주어지고, 그 이후 입력한 명령어가 차례로 주어졌을 때, 모든 명령어를 수행하고 난 후 편집기에 입력되어 있는 문자열을 구하는 프로그램을 작성하시오. 
단, 명령어가 수행되기 전에 커서는 문장의 맨 뒤에 위치하고 있다고 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const origin = input.shift();
const M = +input.shift();
const comms = input;
// console.log(origin, M, comms);

// 문제 로직
// - 방법 2: 커서 좌우에 각각 스택을 두고 이쪽저쪽 옮기거나 넣고 빼기...!

const stackL = []; // 왼쪽에서 오른쪽으로 읽기 ─>
const stackR = []; // 오른쪽에서 왼쪽으로 읽기 <─
Array.from(origin).forEach((i) => stackL.push(i));
// console.log(stackL, stackR);
comms.forEach((i) => {
  // console.log(`----- ${i} -----`);
  switch (i[0]) {
    case 'L':
      if (stackL.length) {
        stackR.push(stackL.pop());
      }
      break;
    case 'D':
      if (stackR.length) stackL.push(stackR.pop());
      break;
    case 'B':
      stackL.pop();
      break;
    default:
      stackL.push(i.split(' ')[1]);
      break;
  }
  // console.log(stackL, stackR);
});
let result = stackL.join('') + stackR.reverse().join('');
console.log(result);

// 문제 로직
// - 방법 1: LinkedList, Editor 클래스 구현
// => 시간 초과 ㅠ

// 에디터 내용 담을 LinkedList 구현
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
  push(v, cursor) {
    const newNode = new Node(v);
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (cursor === 0) {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      } else if (cursor > 0) {
        const prevNode = this.getNthNode(cursor);
        if (prevNode == this.tail) this.tail = newNode;
        if (prevNode.next) prevNode.next.prev = newNode;
        newNode.next = prevNode.next;
        newNode.prev = prevNode;
        prevNode.next = newNode;
      }
    }
    this.length++;
    // console.log('cursor', cursor, 'push', `' ${v} '`, this.print());
  }
  pop(cursor) {
    const node = this.getNthNode(cursor);
    if (node == null) return false;
    if (node == this.head) {
      node.next.prev = null;
      this.head = node.next;
    } else if (node == this.tail) {
      node.prev.next = null;
      this.tail = node.prev;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    this.length--;
    // console.log('cursor', cursor, 'pop', `' ${node.val} '`, this.print());
    return true;
  }
  getNthNode(n) {
    if (n === 0) return null;
    let currentNode = this.head;
    for (let i = 1; i <= n - 1; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  size() {
    return this.length;
  }
  print() {
    let result = '';
    for (let i = 1; i <= this.length; i++) {
      result += this.getNthNode(i).val;
    }
    return result;
  }
}

// 에디터 기능 구현
class Editor {
  constructor(str) {
    this.list = new LinkedList();
    this.cursor = 0;
    Array.from(str).forEach((i) => {
      this.list.push(i, this.cursor);
      this.cursor++;
    });
    // console.log('list', this.list);
    // console.log('cursor', this.cursor);
  }
  left() {
    if (this.cursor > 0) this.cursor--;
    // console.log('current cursor', this.cursor);
  }
  right() {
    if (this.cursor < this.list.size()) this.cursor++;
    // console.log('current cursor', this.cursor);
  }
  put(v) {
    this.list.push(v, this.cursor);
    this.cursor++;
    // console.log('current cursor', this.cursor);
  }
  backspace() {
    const isDone = this.list.pop(this.cursor);
    if (isDone) this.cursor--;
    // console.log('current cursor', this.cursor);
  }
}

// 작업 수행
const editor = new Editor(origin);
// console.log(editor);
comms.forEach((i) => {
  // console.log(`----- ${i} -----`);
  switch (i[0]) {
    case 'L':
      editor.left();
      break;
    case 'D':
      editor.right();
      break;
    case 'B':
      editor.backspace();
      break;
    default:
      editor.put(i[2]);
      break;
  }
});
// 출력
console.log(editor.list.print());

/**
 * Wow.. 발상의 전환이 이렇게 중요하다 !
 * 나는 정말 단순 정직하구나.. 좀 더 말랑말랑 모험적 창의적으로 사고해보는 연습을 해야겠다.
 * 그래도 스스로 에디터 구현한 것도 장하다... 뿌듯 !
 */
