// https://www.acmicpc.net/problem/10819
/*
차이를 최대로

N개의 정수로 이루어진 배열 A가 주어진다. 이때, 배열에 들어있는 정수의 순서를 적절히 바꿔서 다음 식의 최댓값을 구하는 프로그램을 작성하시오.

|A[0] - A[1]| + |A[1] - A[2]| + ... + |A[N-2] - A[N-1]|

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const nums = input[1].split(' ').map(Number);
// console.log(N, nums);

// 문제 로직
/**
 * 브루트 포스, 백트래킹.
 * 규칙성이 잘 찾아지지 않아서, 범위가 적은 걸 보고 그냥 브루트 포스 답게
 조합 가능한 순열을 다 구해보고 그 중 가장 적절한 결과값을 찾기로.
 */

// 모든 조합 가능한 순열 구하는 함수
function getAllArr(arr) {
  const output = [];
  const numSet = [];
  const visited = new Array(N).fill(false);

  function dfs(cnt) {
    if (cnt === N) {
      output.push([...numSet]);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      numSet.push(arr[i]);
      dfs(cnt + 1);
      numSet.pop();
      visited[i] = false;
    }
  }

  dfs(0);
  // console.log(output);
  return output;
}

// 모든 순열 조회하며 최적의 결과값 찾는 함수
function findBestY(arr) {
  let max = 0;
  for (let A of arr) {
    max = Math.max(max, fx(A, N));
  }
  return max;

  function fx(A, N) {
    let sum = 0;
    for (let i = 0; i <= N - 2; i++) sum += Math.abs(A[i] - A[i + 1]);
    return sum;
  }
}

// 작업 수행
const result = findBestY(getAllArr(nums));
console.log(result);
