// https://www.acmicpc.net/problem/15649
/*
N과 M (1)

자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, M] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
console.log(N, M);

// 문제 로직
let numSet = new Array(M).fill(0); // 숫자 M 개 채울 배열
const usedNum = new Array(N).fill(false); // 숫자 사용/미사용 구분

let result = [];
function dfs(k) {
  if (k === M) {
    result.push(numSet.join(' '));
    return;
  }
  for (let i = 1; i <= N; i++) {
    if (!usedNum[i]) {
      numSet[k] = i;
      usedNum[i] = true;
      dfs(k + 1);
      usedNum[i] = false; // 하나의 numSet 완성하고 나면 한 depth 돌아와서 다시 숫자선택 반복
    }
  }
}
dfs(0);
console.log(result.join('\n'));

/**
 * 백트래킹
 * (참고) https://blog.encrypted.gg/945?category=773649
 */
