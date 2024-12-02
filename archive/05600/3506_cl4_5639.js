// https://www.acmicpc.net/problem/5639
/*
이진 검색 트리

이진 검색 트리는 다음과 같은 세 가지 조건을 만족하는 이진 트리이다.

- 노드의 왼쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 작다.
- 노드의 오른쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 크다.
- 왼쪽, 오른쪽 서브트리도 이진 검색 트리이다.
...

전위 순회 (루트-왼쪽-오른쪽)은 루트를 방문하고, 왼쪽 서브트리, 오른쪽 서브 트리를 순서대로 방문하면서 노드의 키를 출력한다. 후위 순회 (왼쪽-오른쪽-루트)는 왼쪽 서브트리, 오른쪽 서브트리, 루트 노드 순서대로 키를 출력한다. 예를 들어, 위의 이진 검색 트리의 전위 순회 결과는 50 30 24 5 28 45 98 52 60 이고, 후위 순회 결과는 5 28 24 45 30 60 52 98 50 이다.

이진 검색 트리를 전위 순회한 결과가 주어졌을 때, 이 트리를 후위 순회한 결과를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(input);

// 문제 로직
/**
 * 이진 트리 : 왼쪽 서브트리 모두 루트보다 작고, 오른쪽 서브트리 모두 루트보다 크다
 * 전위 순회 : 루트 -> 왼쪽 서브트리 -> 오른쪽 서브트리
1. 루트 노드 A 가 있다
2. A보다 '작은' 노드 중 가장 먼저 나오는 노드 B는 A의 왼쪽 서브트리의 루트 노드이다
3. A보다 '큰' 노드 중 가장 먼저 나오는 노드 C는 A의 오른쪽 서브트리의 루트 노드이다
=> 이 과정을 재귀적으로 반복하여 루트, 왼쪽 서브트리, 오른쪽 서브트리를 알아낸 다음 후위 순회로 변환
 * 후위 순회 : 왼쪽 서브트리 -> 오른쪽 서브트리 -> 루트 방문

 * Node.js 에서는 최대 콜스택이 10000 정도이므로 재귀함수 사용하면 런타임 에러(StackSizeExceeded) 가 발생한다
=> 스택과 반복문을 이용해 재귀 구현
 */

const stack = [];
const result = [];

// 전위 순회 결과 배열의 시작, 끝 인덱스 삽입
stack.push([0, input.length - 1]);

// 전위 순회 결과를 단서로 트리 구조 (루트, 오른쪽 서브트리, 왼쪽 서브트리) 분해 반복
while (stack.length) {
  const [start, end] = stack.pop();
  if (start > end) continue;

  // 루트보다 큰 숫자들 중 가장 앞 숫자가 오른쪽 서브트리의 루트
  let rightRoot;
  for (let i = start + 1; i <= end; i++) {
    if (input[i] < input[start]) continue;
    rightRoot = i;
    break;
  }

  if (rightRoot) {
    // 오른쪽 서브트리가 존재하면
    stack.push([start + 1, rightRoot - 1]); // 왼쪽 서브트리의 시작, 끝 인덱스 삽입
    stack.push([rightRoot, end]); // 오른쪽 서브트리의 시작, 끝 인덱스 삽입
  } else {
    // 오른쪽 없으면 루트 제외한 나머지 숫자들 삽입 (모두 왼쪽 서브트리)
    stack.push([start + 1, end]);
  }

  // result 배열의 처음에 루트 삽입
  // => while 문에서 이 과정 반복하면 후위 순회 결과 완성
  // (루트 - 오른쪽 루트 - 왼쪽 루트 순서 뒤집힌 꼴)
  result.unshift(input[start]);
}

console.log(result.join('\n'));
