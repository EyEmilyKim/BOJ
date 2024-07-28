// https://www.acmicpc.net/problem/1309
/*
동물원

어떤 동물원에 가로로 두칸 세로로 N칸인 아래와 같은 우리가 있다.

이 동물원에는 사자들이 살고 있는데 사자들을 우리에 가둘 때, 가로로도 세로로도 붙어 있게 배치할 수는 없다. 이 동물원 조련사는 사자들의 배치 문제 때문에 골머리를 앓고 있다.

동물원 조련사의 머리가 아프지 않도록 우리가 2*N 배열에 사자를 배치하는 경우의 수가 몇 가지인지를 알아내는 프로그램을 작성해 주도록 하자. 사자를 한 마리도 배치하지 않는 경우도 하나의 경우의 수로 친다고 가정한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * DP[n] : 동물원 2*N칸일 때 사자 배치할 수 있는 경우의 수 
N = 0 : 사자 없음(1) => 1
N = 1 : 사자 없음(1), 사자 1마리(2) => 3
N = 2 : 없음(1), 1마리(4), 2마리(2) => 7
N = 3 : 없음(1), 1마리(6), 2마리(8), 3마리(2) => 17
...
=> dp[n] = dp[n-1]*2 + dp[n-2]
*/

const dp = [];
dp[0] = 1;
dp[1] = 3;
for (let i = 2; i <= input; i++) {
  dp[i] = (dp[i - 1] * 2 + dp[i - 2]) % 9901;
}
// console.log(dp);
console.log(dp[input]);
