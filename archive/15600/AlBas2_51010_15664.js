// https://www.acmicpc.net/problem/15664
/*
N과 M (10)

N개의 자연수와 자연수 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

N개의 자연수 중에서 M개를 고른 수열
- 고른 수열은 비내림차순이어야 한다.
- 길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
const [N, M] = input[0];
const nums = input[1];
nums.sort((a, b) => a - b); // 오름차순 정리
// console.log(N, M, nums, '\n\n');

// 문제 로직
/**
 * 백트래킹. 중복값이 있는 배열 제시. 비내림 차순.
=> 모든 결과값 구한 후 중복 삭제
 */

let numSet = []; // 숫자 M 개 채울 배열
let result = [];
const visited = new Array(N).fill(0);

function dfs(cnt) {
  // console.log('cnt', cnt, 'numSet', numSet);

  if (cnt === M) {
    // 하나의 numSet 완성하고 나면
    result.push(numSet.join(' ')); // 결과 저장
    // console.log('---');
    return; // 재귀 끝
  }
  // 배열 순회하며 "앞자리 보다 크거나 같은 수"로만 칸 채우기
  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    if (nums[i] < numSet[numSet.length - 1]) continue;
    visited[i] = 1;
    numSet.push(nums[i]);
    dfs(cnt + 1);
    visited[i] = 0;
    numSet.pop(); // 한 칸 되돌리고
  }
}
dfs(0);
const resultSet = Array.from(new Set(result)); // 중복되는 결과값 제거
console.log(resultSet.join('\n'));
