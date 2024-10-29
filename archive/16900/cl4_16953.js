// https://www.acmicpc.net/problem/16953
/*
A → B

정수 A를 B로 바꾸려고 한다. 가능한 연산은 다음과 같은 두 가지이다.

- 2를 곱한다.
- 1을 수의 가장 오른쪽에 추가한다. 
A를 B로 바꾸는데 필요한 연산의 최솟값을 구해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(a, b);

// 문제 로직
/**
 * BFS
 */

function solution(a, b) {
  const queue = [[a, 1]]; // 현재 만들어진 숫자와 step수 저장할 큐

  while (queue.length) {
    const [cur, step] = queue.shift();

    if (cur === b) return step; // 목표숫자 만들어지면 step수 반환

    const addedOne = cur * 10 + 1;
    const multiplied = cur * 2;

    if (addedOne <= b) queue.push([addedOne, step + 1]);
    if (multiplied <= b) queue.push([multiplied, step + 1]);
  }

  return -1; // 목표숫자 못 만들고 끝나면 -1 반환
}

console.log(solution(a, b));
