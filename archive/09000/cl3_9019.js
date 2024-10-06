// https://www.acmicpc.net/problem/9019
/*
DSLR

네 개의 명령어 D, S, L, R 을 이용하는 간단한 계산기가 있다. 이 계산기에는 레지스터가 하나 있는데, 이 레지스터에는 0 이상 10,000 미만의 십진수를 저장할 수 있다. 각 명령어는 이 레지스터에 저장된 n을 다음과 같이 변환한다. n의 네 자릿수를 d1, d2, d3, d4라고 하자(즉 n = ((d1 × 10 + d2) × 10 + d3) × 10 + d4라고 하자)

D: D 는 n을 두 배로 바꾼다. 결과 값이 9999 보다 큰 경우에는 10000 으로 나눈 나머지를 취한다. 그 결과 값(2n mod 10000)을 레지스터에 저장한다.
S: S 는 n에서 1 을 뺀 결과 n-1을 레지스터에 저장한다. n이 0 이라면 9999 가 대신 레지스터에 저장된다.
L: L 은 n의 각 자릿수를 왼편으로 회전시켜 그 결과를 레지스터에 저장한다. 이 연산이 끝나면 레지스터에 저장된 네 자릿수는 왼편부터 d2, d3, d4, d1이 된다.
R: R 은 n의 각 자릿수를 오른편으로 회전시켜 그 결과를 레지스터에 저장한다. 이 연산이 끝나면 레지스터에 저장된 네 자릿수는 왼편부터 d4, d1, d2, d3이 된다.
위에서 언급한 것처럼, L 과 R 명령어는 십진 자릿수를 가정하고 연산을 수행한다. 예를 들어서 n = 1234 라면 여기에 L 을 적용하면 2341 이 되고 R 을 적용하면 4123 이 된다.

여러분이 작성할 프로그램은 주어진 서로 다른 두 정수 A와 B(A ≠ B)에 대하여 A를 B로 바꾸는 최소한의 명령어를 생성하는 프로그램이다. 예를 들어서 A = 1234, B = 3412 라면 다음과 같이 두 개의 명령어를 적용하면 A를 B로 변환할 수 있다.

1234 →L 2341 →L 3412
1234 →R 4123 →R 3412

따라서 여러분의 프로그램은 이 경우에 LL 이나 RR 을 출력해야 한다.

n의 자릿수로 0 이 포함된 경우에 주의해야 한다. 예를 들어서 1000 에 L 을 적용하면 0001 이 되므로 결과는 1 이 된다. 그러나 R 을 적용하면 0100 이 되므로 결과는 100 이 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((row) => row.split(' ').map(Number));
const [T] = input.shift();
// console.log(T, input);

// 문제 로직
/**
 * Queue를 이용한 BFS 탐색 => D,S,L,R 대입하며 타겟 숫자 완성하는 커맨드 찾기.
 * 이미 처리한 수 중복 확인하지 않도록 visited 배열 사용.
 */

// Queue 구현
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  free() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = popItem.next;
    this.length -= 1;
    return popItem.item;
  }
}

// D,S,L,R 함수 구현
const cmd = [D, S, L, R];
function D(num) {
  return (num * 2) % 10000;
}
function S(num) {
  return num == 0 ? 9999 : num - 1;
}
function L(num) {
  const n = Math.floor(num / 1000);
  const x = num % 1000;
  return x * 10 + n;
}
function R(num) {
  const n = num % 10;
  const x = (num - n) / 10;
  return n * 1000 + x;
}

// 초기값, 목표값 지정하여 D,S,L,R함수 대입하며 적절한 커맨드 찾아가는 BFS 함수
function bfs(initial, target) {
  let visited = Array(10001).fill(false); // 이미 체크한 수
  visited[initial] = true;
  const q = new Queue();
  q.push([initial, '']); // 현재 숫자와 커맨드 문자열 Queue 에 저장
  // let cnt = 0; // 단순 확인용 - bfs 호출 횟수

  while (q.length > 0) {
    const [cur, history] = q.pop();
    // console.log('cnt', ++cnt, 'cur', cur, 'target', target, 'history', history);

    for (let i = 0; i < 4; i++) {
      const output = cmd[i](cur);
      if (output == target) {
        return history + cmd[i].name;
      }
      if (!visited[output]) {
        visited[output] = true;
        q.push([output, history + cmd[i].name]);
      }
    }
  }
}

// 작업 수행
const result = [];
for (const test of input) {
  const [initial, target] = test;
  result.push(bfs(initial, target));
}
console.log(result.join('\n'));
