// https://www.acmicpc.net/problem/9461
/*
파도반 수열

오른쪽 그림과 같이 삼각형이 나선 모양으로 놓여져 있다. 첫 삼각형은 정삼각형으로 변의 길이는 1이다. 그 다음에는 다음과 같은 과정으로 정삼각형을 계속 추가한다. 나선에서 가장 긴 변의 길이를 k라 했을 때, 그 변에 길이가 k인 정삼각형을 추가한다.
...

파도반 수열 P(N)은 나선에 있는 정삼각형의 변의 길이이다. P(1)부터 P(10)까지 첫 10개 숫자는 1, 1, 1, 2, 2, 3, 4, 5, 7, 9이다.

N이 주어졌을 때, P(N)을 구하는 프로그램을 작성하시오.


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [T, ...nums] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(T, nums);

// 문제 로직
/**
 * dp
 * 그림에서 규칙성 찾기...
P(1) = 1
P(2) = 1
P(3) = 1
P(4) = 2
P(5) = 2
P(6) = 3
P(7) = 4
P(8) = 5 : P(6)+P(5)
P(9) = 7 : P(7)+P(6)
... 공통 패턴 모두 적용됨 !
=> 
p(4) 이후 P(N) = p(N-2) + P(N-3)
*/

const result = [];
for (const N of nums) {
  const dp = new Array(N + 1).fill(0);
  // P(1) ~ (3) 초기화
  for (let i = 1; i <= 3; i++) dp[i] = 1;
  // P(4) ~ (N) 구하기
  for (let i = 4; i <= N; i++) dp[i] = dp[i - 2] + dp[i - 3];
  // console.log(dp);
  result.push(dp[N]);
}
console.log(result.join('\n'));
