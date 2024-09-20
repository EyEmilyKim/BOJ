// https://www.acmicpc.net/problem/15657
/*
N과 M (8)

N개의 자연수와 자연수 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오. N개의 자연수는 모두 다른 수이다.

- N개의 자연수 중에서 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.
- 고른 수열은 비내림차순이어야 한다.
  길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.

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
 * 백트래킹. 배열 제시, 중복 허용, 조합
 */

let numSet = []; // 숫자 M 개 채울 배열
let result = [];

function dfs(cnt, start) {
  // console.log('cnt', cnt, 'numSet', numSet);

  if (cnt === M) {
    // 하나의 numSet 완성하고 나면
    result.push(numSet.join(' ')); // 결과 저장
    // console.log('---');
    return; // 재귀 끝
  }
  // 숫자 순회하며 "앞 칸보다 크거나 같은 숫자로만" 칸 채우기
  for (let i = start; i < N; i++) {
    if (nums[i] < numSet[numSet.length - 1]) continue;
    numSet.push(nums[i]);
    dfs(cnt + 1, start);
    numSet.pop(); // 한 칸 되돌리고
  }
}
dfs(0, 0);
console.log(result.join('\n'));
