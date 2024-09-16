// https://www.acmicpc.net/problem/15652
/*
N과 M (4)

자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

- 1부터 N까지 자연수 중에서 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.
- 고른 수열은 비내림차순이어야 한다.
  - 길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, M] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(N, M);

// 문제 로직
/**
 * 백트래킹. 중복허용, 조합
 */

let numSet = []; // 숫자 M 개 채울 배열

let result = [];
function dfs(cnt, start) {
  if (cnt === M) {
    // 하나의 numSet 완성하고 나면
    result.push(numSet.join(' ')); // 결과 저장
    // console.log('---');
    return; // 재귀 끝
  }
  // 숫자 오름차순으로 순회하며 "앞 칸보다 크거나 같은 숫자로만" 칸 채우기
  for (let i = start; i <= N; i++) {
    numSet.push(i);
    dfs(cnt + 1, i);
    numSet.pop(); // 한 칸 되돌리고
  }
}
dfs(0, 1);
console.log(result.join('\n'));
