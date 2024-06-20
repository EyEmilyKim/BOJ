// https://www.acmicpc.net/problem/16194
/*
카드 구매하기 2

요즘 민규네 동네에서는 스타트링크에서 만든 PS카드를 모으는 것이 유행이다.

PS카드는 PS(Problem Solving)분야에서 유명한 사람들의 아이디와 얼굴이 적혀있는 카드이다. 각각의 카드에는 등급을 나타내는 색이 칠해져 있고, 다음과 같이 8가지가 있다.
- 전설카드
- 레드카드
- 오렌지카드
- 퍼플카드
- 블루카드
- 청록카드
- 그린카드
- 그레이카드
카드는 카드팩의 형태로만 구매할 수 있고, 카드팩의 종류는 카드 1개가 포함된 카드팩, 카드 2개가 포함된 카드팩, ... 카드 N개가 포함된 카드팩과 같이 총 N가지가 존재한다.

민규는 지난주에 너무 많은 돈을 써 버렸다. 그래서 오늘은 돈을 최소로 지불해서 카드 N개를 구매하려고 한다. 카드가 i개 포함된 카드팩의 가격은 Pi원이다.

예를 들어, 카드팩이 총 4가지 종류가 있고, P1 = 1, P2 = 5, P3 = 6, P4 = 7인 경우에 민규가 카드 4개를 갖기 위해 지불해야 하는 금액의 최솟값은 4원이다. 1개 들어있는 카드팩을 4번 사면 된다.

P1 = 5, P2 = 2, P3 = 8, P4 = 10인 경우에는 카드가 2개 들어있는 카드팩을 2번 사면 4원이고, 이 경우가 민규가 지불해야 하는 금액의 최솟값이다.

카드 팩의 가격이 주어졌을 때, N개의 카드를 구매하기 위해 민규가 지불해야 하는 금액의 최솟값을 구하는 프로그램을 작성하시오. N개보다 많은 개수의 카드를 산 다음, 나머지 카드를 버려서 N개를 만드는 것은 불가능하다. 즉, 구매한 카드팩에 포함되어 있는 카드 개수의 합은 N과 같아야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직
/**
 * DP
 * 11052 "카드 구매하기" 문제 참고
 */

// X장짜리 카드팩 가격
const pack = [0, ...input[0].split(' ').map(Number)];
// console.log('pack', pack);
// X장 카드 구하는 최소 비용 구하기
const dp = new Array(N + 1).fill(99999);
dp[0] = 0;
for (let i = 1; i <= N; i++) {
  // console.log('------');
  for (let j = 1; j <= i; j++) {
    dp[i] = Math.min(dp[i], dp[i - j] + pack[j]);
    // console.log('i-j', i - j, 'j', j, dp);
  }
}
// console.log('dp', dp);
// 타겟 값 출력
console.log(dp[N]);
