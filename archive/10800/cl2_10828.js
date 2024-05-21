// https://www.acmicpc.net/problem/10828
/*
스택

정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 다섯 가지이다.

- push X: 정수 X를 스택에 넣는 연산이다.
- pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
- size: 스택에 들어있는 정수의 개수를 출력한다.
- empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
- top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/
// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const commands = input;
// console.log(N, commands);

// 문제 로직

// 스택 구현
class Stack {
  constructor() {
    this.arr = [];
  }
  push(i) {
    this.arr.push(i);
  }
  pop() {
    if (!this.arr.length) return -1;
    else {
      return this.arr.pop();
    }
  }
  size() {
    return this.arr.length;
  }
  empty() {
    if (!this.arr.length) return 1;
    else return 0;
  }
  top() {
    if (!this.arr.length) return -1;
    else return this.arr[this.arr.length - 1];
  }
}

// 작업 수행
const stack = new Stack();
const result = [];
commands.forEach((i) => {
  switch (i) {
    case 'pop':
      result.push(stack.pop());
      break;
    case 'size':
      result.push(stack.size());
      break;
    case 'empty':
      result.push(stack.empty());
      break;
    case 'top':
      result.push(stack.top());
      break;
    default:
      stack.push(i.split(' ')[1]);
      break;
  }
});
console.log(result.join('\n'));
