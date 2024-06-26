// https://www.acmicpc.net/problem/10844
/*
쉬운 계단 수

45656이란 수를 보자.
이 수는 인접한 모든 자리의 차이가 1이다. 이런 수를 계단 수라고 한다.
N이 주어질 때, 길이가 N인 계단 수가 총 몇 개 있는지 구해보자. 0으로 시작하는 수는 계단수가 아니다.

입력>
첫째 줄에 N이 주어진다. N은 1보다 크거나 같고, 100보다 작거나 같은 자연수이다.

출력>
첫째 줄에 정답을 1,000,000,000으로 나눈 나머지를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직 - 방법 2 => dp 과정에 1차원 배열 2개만 사용
/**
 * 모든 자리 수 case 다 저장하는 2차원 dp배열 사용 시 메모리 초과 발생..ㅠ
 */

// n(input)자리 i로 끝나는 계단수 개수 구하는 DP
let prev = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 초기값 : 1자리 수
// console.log(prev);
let cur = new Array(10).fill(0);
const mod = 10 ** 9; // 1,000,000,000
for (let n = 2; n <= input; n++) {
  cur[0] = prev[1];
  for (let i = 1; i <= 8; i++) {
    cur[i] = (prev[i - 1] + prev[i + 1]) % mod;
  }
  cur[9] = prev[8];
  [prev, cur] = [cur, prev]; // 다음 단계 위한 이전 상태 갱신
  // console.log(prev);
}

// 타겟값 출력
let sum = prev.reduce((a, b) => (a + b) % mod);
console.log(sum);

/**
 * DP 패턴 : 
1자리 수 => 1,2,3,4,5,6,7,8,9 (9)
2자리 수 => (17)
  10, 
  21,
  32, 12,
  43, 23,
  54, 34,
  65, 45,
  76, 56,
  87, 67,
  98, 78,
  89,
3자리 수 이상.. => 
  0 으로 끝나려면 앞자리 1
  1 으로 끝나려면 앞자리 0 또는 2
  2 으로 끝나려면 앞자리 1 또는 3
  3 으로 끝나려면 앞자리 2 또는 4
  4 으로 끝나려면 앞자리 3 또는 5
  5 으로 끝나려면 앞자리 4 또는 6
  6 으로 끝나려면 앞자리 5 또는 7
  7 으로 끝나려면 앞자리 6 또는 8
  8 으로 끝나려면 앞자리 7 또는 9
  9 으로 끝나려면 앞자리 8
*/

// 문제 로직 - 방법 1 : 2차원 dp배열 사용 => 메모리 초과

// n자리 수의 i로 끝나는 계단수 개수 구하는 DP
const dp = Array.from(new Array(input + 1), () => new Array(10).fill(0));
const mod1 = Number(1e9); // 1000000000
dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
dp[2] = [1, 1, 2, 2, 2, 2, 2, 2, 2, 1];
for (let n = 3; n <= input; n++) {
  for (let i = 0; n <= 9; i++) {
    if (i === 0) dp[n][i] = dp[n - 1][1];
    else if (i === 9) dp[n][i] = dp[n - 1][8];
    else dp[n][i] = dp[n - 1][i - 1] + dp[n - 1][i + 1];
    dp[n][i] %= mod1;
  }
}
// console.log(dp);

// 타겟값 출력
let sum1 = 0;
for (let i = 0; i <= 9; i++) {
  sum1 += dp[input][i];
  sum1 %= mod1;
}
console.log(sum1);
