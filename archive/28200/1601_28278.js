// https://www.acmicpc.net/problem/28278
/*
스택 2

정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 다섯 가지이다.

1 X: 정수 X를 스택에 넣는다. (1 ≤ X ≤ 100,000)
2: 스택에 정수가 있다면 맨 위의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
3: 스택에 들어있는 정수의 개수를 출력한다.
4: 스택이 비어있으면 1, 아니면 0을 출력한다.
5: 스택에 정수가 있다면 맨 위의 정수를 출력한다. 없다면 -1을 대신 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, ...command] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(N, command);

// 문제 로직
const stack = [];
const result = [];

for (let cmd of command) {
  const [c, v] = cmd.split(' ');

  switch (c) {
    case '1':
      stack.push(Number(v));
      break;
    case '2':
      result.push(stack.length > 0 ? stack.pop() : -1);
      break;
    case '3':
      result.push(stack.length);
      break;
    case '4':
      result.push(stack.length === 0 ? 1 : 0);
      break;
    case '5':
      result.push(stack.length > 0 ? stack[stack.length - 1] : -1);
      break;
  }
}
console.log(result.join('\n'));
