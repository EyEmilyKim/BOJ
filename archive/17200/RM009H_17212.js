// https://www.acmicpc.net/problem/17212
/*
달나라 토끼를 위한 구매대금 지불 도우미

달나라 토끼들이 사용하는 화폐는 동전뿐이다. 동전의 종류는 1원, 2원, 5원, 7원 이렇게 4종류가 있다. 물건을 사고 동전으로 계산을 하는데 동전의 개수가 최소가 되도록 지불하지 않는 것은 불법이다. 예를 들어, 17원을 지불할 때 7원짜리 동전 1개와 5원짜리 동전 2개로 지불해야 합법이고, 7원짜리 동전 2개와 2원짜리 동전 1개, 1원짜리 동전 1개로 지불해도 17원이 되지만, 총 동전의 개수가 4개가 되어 최소 개수가 아니므로 불법이다.

지불 금액을 입력받아 합법이 되는 동전 개수를 출력으로 내어주는 프로그램을 작성해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
/**
 * 동전 단위 : [1,2,5,7]원
 * dp[n] : n원을 가장 적은 동전으로 지불할 때 동전 개수
n=1 : [1,0,0,0] => 1
n=2 : [0,1,0,0] => 1
n=3 : [1,1,0,0] => 2
n=4 : [0,2,0,0] => 2
n=5 : [0,0,1,0] => 1
n=6 : [1,0,1,0] => 2
n=7 : [0,0,0,1] => 1
...
=> dp[n]은 다음 중 가장 작은 것
1개 앞에 1원 +1, 
2개 앞에 2원 +1, 
5개 앞에 5원 +1, 
7개 앞에 7월 +1, 
*/

const dp = new Array(N + 1).fill(0);
const tmp = [0, 1, 1, 2, 2, 1, 2, 1];
for (let i = 1; i <= 7; i++) dp[i] = tmp[i];
for (let i = 8; i <= N; i++) {
  dp[i] = Math.min(dp[i - 1], dp[i - 2], dp[i - 5], dp[i - 7]) + 1;
}
console.log(dp[N]);