// https://www.acmicpc.net/problem/1874
/*
스택 수열

스택 (stack)은 기본적인 자료구조 중 하나로, 컴퓨터 프로그램을 작성할 때 자주 이용되는 개념이다. 스택은 자료를 넣는 (push) 입구와 자료를 뽑는 (pop) 입구가 같아 제일 나중에 들어간 자료가 제일 먼저 나오는 (LIFO, Last in First out) 특성을 가지고 있다.

1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓음으로써, 하나의 수열을 만들 수 있다. 이때, 스택에 push하는 순서는 반드시 오름차순을 지키도록 한다고 하자. 임의의 수열이 주어졌을 때 스택을 이용해 그 수열을 만들 수 있는지 없는지, 있다면 어떤 순서로 push와 pop 연산을 수행해야 하는지를 알아낼 수 있다. 이를 계산하는 프로그램을 작성하라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const N = input.shift();
// console.log('input', input);

// 문제 로직

// push, pop 기록하는 스택 구현
class Stack {
  constructor() {
    this.arr = [];
    this.log = [];
  }
  push(v) {
    this.arr.push(v);
    this.log.push('+');
  }
  pop() {
    this.arr.pop();
    this.log.push('-');
  }
  peek() {
    return this.arr[this.arr.length - 1];
  }
  size() {
    return this.arr.length;
  }
}

// 작업 수행
const stack = new Stack();
let isPossible = true;
for (let i = 1; i <= N; i++) {
  stack.push(i);
  while (stack.size() > 0 && stack.peek() === input[0]) {
    stack.pop();
    input.shift();
  }
}
if (input.length > 0) isPossible = false;

// 출력
if (isPossible) console.log(stack.log.join('\n').trim());
else console.log('NO');

/**
 while 조건에 stack.size()>0 를 안주면
 작업이 끝나도 null === null 이 되어 무한루프에 빠지므로 주의 !
 */
