// https://www.acmicpc.net/problem/9012
/*
괄호

괄호 문자열(Parenthesis String, PS)은 두 개의 괄호 기호인 ‘(’ 와 ‘)’ 만으로 구성되어 있는 문자열이다. 그 중에서 괄호의 모양이 바르게 구성된 문자열을 올바른 괄호 문자열(Valid PS, VPS)이라고 부른다. 한 쌍의 괄호 기호로 된 “( )” 문자열은 기본 VPS 이라고 부른다. 만일 x 가 VPS 라면 이것을 하나의 괄호에 넣은 새로운 문자열 “(x)”도 VPS 가 된다. 그리고 두 VPS x 와 y를 접합(concatenation)시킨 새로운 문자열 xy도 VPS 가 된다. 예를 들어 “(())()”와 “((()))” 는 VPS 이지만 “(()(”, “(())()))” , 그리고 “(()” 는 모두 VPS 가 아닌 문자열이다. 

여러분은 입력으로 주어진 괄호 문자열이 VPS 인지 아닌지를 판단해서 그 결과를 YES 와 NO 로 나타내어야 한다. 

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
// console.log(T, input);

// 문제 로직 - 방법1 : 배열을 이용한 스택 사용

// 스택 구현
class Stack {
  constructor() {
    this.arr = [];
  }
  push(v) {
    this.arr.push(v);
  }
  pop() {
    return this.arr.pop();
  }
  peek() {
    return this.arr[this.arr.length - 1];
  }
  getSize() {
    return this.arr.length;
  }
}

// VPS 여부 확인하는 메서드
function checkVPS(str) {
  const stack = new Stack();
  const strArr = Array.from(str);
  // console.log(strArr);
  let isVPS = 0;
  strArr.forEach((i) => {
    if (i === '(') stack.push(i);
    else if (i === ')') {
      if (stack.peek() === '(') stack.pop();
      else stack.push(i);
    }
    // console.log(stack);
  });
  if (!stack.getSize()) isVPS = 1;
  return isVPS ? 'YES' : 'NO';
}

// 작업 수행
const result = [];
input.forEach((i) => result.push(checkVPS(i)));
console.log(result.join('\n').trim());

/**
 * 후납선출 방식의 스택 구현해서 풀기
 
 - 방법 1: 배열 이용
 - 방법 2: Linked List 이용
 => 제출 시 둘다 정답이고, 시간/메모리 차이는 크지 않고
    구현 편의성을 봐서는 배열이 더 편했다. 

 * 방법 3: 단순 조건문과 작업 결과 cnt(가상 스택 데이터 수)로 확인하기
 => 어찌보면 단순 깔끔하지만 시간은 3가지 중 쬐~~금 더 오래 걸림.

*/

// 문제 로직 - 방법2 : Linked List를 이용한 스택 사용

// 스택 구현
class Node {
  constructor(v) {
    this.val = v;
    this.next = null;
    this.prev = null;
  }
}
class Stack_LL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  push(v) {
    const newNode = new Node(v);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.size++;
    }
  }
  pop() {
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
    }
    this.size--;
    return this.tail;
  }
  peek() {
    return this.tail;
  }
  getSize() {
    return this.size;
  }
}

// VPS 여부 확인하는 메서드
function checkVPS_LL(str) {
  const stack = new Stack_LL();
  const strArr = Array.from(str);
  // console.log(strArr);
  let isVPS = 0;
  strArr.forEach((i) => {
    if (i === '(') stack.push(i);
    else if (i === ')') {
      if (stack.peek() && stack.peek().val === '(') stack.pop();
      else stack.push(i);
    }
    // console.log(stack);
  });
  if (!stack.getSize()) isVPS = 1;
  return isVPS ? 'YES' : 'NO';
}

// 스택, 메서드 테스트용
// console.log(checkVPS('())(')); // NO

// 작업 수행
const result_LL = [];
input.forEach((i) => result_LL.push(checkVPS_LL(i)));
console.log(result_LL.join('\n').trim());

// 문제 로직 - 방법3 : 단순 조건문과 작업 결과 cnt(가상 스택 데이터 수)로 확인하기
const answer = [];
input.forEach((i) => {
  let cnt = 0;
  for (let ea of i) {
    ea == '(' ? cnt++ : cnt--;
    if (cnt < 0) break;
  }
  const isVPS = cnt == 0 ? 'YES' : 'NO';
  answer.push(isVPS);
});
console.log(answer.join('\n').trim());
