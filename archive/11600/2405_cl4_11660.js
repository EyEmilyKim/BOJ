// https://www.acmicpc.net/problem/11660
/*
구간 합 구하기 5

N×N개의 수가 N×N 크기의 표에 채워져 있다. (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하시오. (x, y)는 x행 y열을 의미한다.

예를 들어, N = 4이고, 표가 아래와 같이 채워져 있는 경우를 살펴보자.

1	2	3	4
2	3	4	5
3	4	5	6
4	5	6	7
여기서 (2, 2)부터 (3, 4)까지 합을 구하면 3+4+5+4+5+6 = 27이고, (4, 4)부터 (4, 4)까지 합을 구하면 7이다.

표에 채워져 있는 수와 합을 구하는 연산이 주어졌을 때, 이를 처리하는 프로그램을 작성하시오.

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
const table = input.slice(1, N + 1);
const test = input.slice(1 + N);
// console.log(N, M);
// console.log('table', table);
// console.log('test', test);

// 문제 로직
/**
 * DP, 누적합
 * 누적 합 구하기 : 
가로 세로로 인접한 이전 누적합 더하고 새로운(현재위치) 값 더한 뒤, 중복으로 더해진 교차 부분 한번 빼주기
 * 부분 합 구하기 : 
제해야 할 가로 세로 이전 누적합 덜고, 중복으로 덜어진 교차 부분 누적합 한번 더해주기
 * 참고) https://chanhuiseok.github.io/posts/baek-19/
 */

// 누적합 표 미리 만들기
const dp = Array.from(Array(N + 1), () => Array(N + 1).fill(0));
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    dp[i][j] = table[i - 1][j - 1] + dp[i][j - 1] + dp[i - 1][j] - dp[i - 1][j - 1];
  }
}
// console.log(dp);

// 작업 수행
const result = [];
for (let t of test) {
  const [x1, y1, x2, y2] = t;
  // 부분 합 구하기
  const output = dp[x2][y2] - (dp[x1 - 1][y2] + dp[x2][y1 - 1]) + dp[x1 - 1][y1 - 1];
  result.push(String(output));
}
console.log(result.join('\n'));
