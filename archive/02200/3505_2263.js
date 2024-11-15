// https://www.acmicpc.net/problem/2263
/*
트리의 순회

n개의 정점을 갖는 이진 트리의 정점에 1부터 n까지의 번호가 중복 없이 매겨져 있다. 이와 같은 이진 트리의 인오더와 포스트오더가 주어졌을 때, 프리오더를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[n], inOrder, postOrder] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(n, inOrder, postOrder);

// 문제 로직
/**
 * 트리의 순회 : 1-2-4-5-3-6-7
- 전위 순회 PreOrder 
 1. 트리의 루트를 방문
 2. 왼쪽 서브 트리를 전위 순회
 3. 오른쪽 서브 트리를 전위 순회
(가운데 노드 - 왼쪽 노드 - 오른쪽 노드 순서로 순회)

- 중위 순회 InOrder : 4-2-5-1-6-3-7
 1. 왼쪽 서브 트리를 중위 순회
 2. 트리의 루트를 방문
 3. 오른쪽 서브 트리를 중위 순회
(왼쪽 노드 - 가운데 노드 - 오른쪽 노드 순서로 순회)

- 후위 순회 PostOrder : 4-5-2-6-7-3-1
 1. 왼쪽 서브 트리를 후위 순회
 2. 오른쪽 서브 트리를 후위 순회
 3. 트리의 루트를 방문
(왼쪽 노드 - 오른쪽 노드 - 가운데 노드 순서로 순회)

=>
 인오더와 포스트오더 정보가 주어졌을 때,
 포스트오더 맨마지막 값으로 트리의 루트를 알 수 있고,
 인오더를 통해 왼쪽 서브트리와 오른쪽 서브트리를 알 수 있다.
 이를 이용해 재귀적으로 프리오더 채워나가기.
=>
 후위 순회 결과의 마지막 숫자를 출력하고, 
 왼쪽 서브트리의 중위 순회 결과, 후위 순회 결과를 이용해 이 과정 반복
 오른쪽 서브트리의 중위 순회 결과, 후위 순회 결과를 이용해 이 과정 반복

 * 참고) https://lotuslee.tistory.com/82
 */

const result = [];
const callStack = [[0, n - 1, 0, n - 1]];
while (callStack.length) {
  const [inStart, inEnd, postStart, postEnd] = callStack.pop();
  if (inStart > inEnd || postStart > postEnd) continue;
  const root = postOrder[postEnd];
  result.push(root);
  let inRootIndex;
  for (let i = inStart; i <= inEnd; i++) {
    if (inOrder[i] === root) {
      inRootIndex = i;
      break;
    }
  }
  const postLeftEnd = postStart + (inRootIndex - 1 - inStart);
  callStack.push([inRootIndex + 1, inEnd, postLeftEnd + 1, postEnd - 1]);
  callStack.push([inStart, inRootIndex - 1, postStart, postLeftEnd]);
}

console.log(result.join(' '));
