// https://www.acmicpc.net/problem/6603
/*
로또

독일 로또는 {1, 2, ..., 49}에서 수 6개를 고른다.

로또 번호를 선택하는데 사용되는 가장 유명한 전략은 49가지 수 중 k(k>6)개의 수를 골라 집합 S를 만든 다음 그 수만 가지고 번호를 선택하는 것이다.

예를 들어, k=8, S={1,2,3,5,8,13,21,34}인 경우 이 집합 S에서 수를 고를 수 있는 경우의 수는 총 28가지이다. ([1,2,3,5,8,13], [1,2,3,5,8,21], [1,2,3,5,8,34], [1,2,3,5,13,21], ..., [3,5,8,13,21,34])

집합 S와 k가 주어졌을 때, 수를 고르는 모든 방법을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
const test = input.map((i) => {
  [k, ...nums] = i.split(' ').map(Number);
  return [k, nums];
});
// console.log(test);

// 문제 로직
/**
 * 백 트래킹. 오름차순. 배열 제시. 자릿수 지정.
 */

const result = [];
function testX(N, arr) {
  const output = [];
  const numSet = [];
  const visited = new Array(N).fill(false);

  const recursive = (depth) => {
    // 로또 6자리 완성하면 이 조합 끝
    if (depth === 6) {
      output.push(numSet.join(' '));
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      // 오름차순이 깨지면 다음 수(depth 가 아니고 arr) 로 넘어감
      if (depth >= 1 && arr[i] < numSet[depth - 1]) continue;
      visited[i] = true;
      numSet.push(arr[i]);
      recursive(depth + 1);
      numSet.pop();
      visited[i] = false;
    }
  };

  recursive(0);
  result.push(output.join('\n'));
}

// 작업 수행
for (let t of test) {
  const N = t[0];
  const arr = t[1].sort((a, b) => a - b);
  testX(N, arr);
}
console.log(result.join('\n\n'));
