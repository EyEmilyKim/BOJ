// https://www.acmicpc.net/problem/1446
/*
지름길

매일 아침, 세준이는 학교에 가기 위해서 차를 타고 D킬로미터 길이의 고속도로를 지난다. 이 고속도로는 심각하게 커브가 많아서 정말 운전하기도 힘들다. 어느 날, 세준이는 이 고속도로에 지름길이 존재한다는 것을 알게 되었다. 모든 지름길은 일방통행이고, 고속도로를 역주행할 수는 없다.

세준이가 운전해야 하는 거리의 최솟값을 출력하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, D], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, D, data);

// 문제 로직
/**
 * DP 방식 풀이
 */

// 지름길 정보 입력
const shortcuts = new Map();
for (const [from, to, weight] of data) {
  if (!shortcuts.has(from)) shortcuts.set(from, [[to, weight]]);
  else shortcuts.set(from, [...shortcuts.get(from), [to, weight]]);
}

const dp = new Array(D + 1).fill(0).map((_, idx) => idx);

for (let i = 0; i <= D; i++) {
  if (i) dp[i] = Math.min(dp[i - 1] + 1, dp[i]);

  if (shortcuts.has(i)) {
    for (const [to, weight] of shortcuts.get(i)) {
      if (to <= D) dp[to] = Math.min(dp[to], dp[i] + weight);
    }
  }
}

console.log(dp.at(-1));
