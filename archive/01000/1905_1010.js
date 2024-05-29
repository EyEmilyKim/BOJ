// https://www.acmicpc.net/problem/1010
/*
다리 놓기

재원이는 한 도시의 시장이 되었다. 이 도시에는 도시를 동쪽과 서쪽으로 나누는 큰 일직선 모양의 강이 흐르고 있다. 하지만 재원이는 다리가 없어서 시민들이 강을 건너는데 큰 불편을 겪고 있음을 알고 다리를 짓기로 결심하였다. 강 주변에서 다리를 짓기에 적합한 곳을 사이트라고 한다. 재원이는 강 주변을 면밀히 조사해 본 결과 강의 서쪽에는 N개의 사이트가 있고 동쪽에는 M개의 사이트가 있다는 것을 알았다. (N ≤ M)

재원이는 서쪽의 사이트와 동쪽의 사이트를 다리로 연결하려고 한다. (이때 한 사이트에는 최대 한 개의 다리만 연결될 수 있다.) 재원이는 다리를 최대한 많이 지으려고 하기 때문에 서쪽의 사이트 개수만큼 (N개) 다리를 지으려고 한다. 다리끼리는 서로 겹쳐질 수 없다고 할 때 다리를 지을 수 있는 경우의 수를 구하는 프로그램을 작성하라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
// console.log(T, input);

// 문제 로직 - 방법 1 : 조합 사용
/**
 항상 동쪽 사이트 M > 서쪽 사이트 N
 N개의 사이트 모두 연결
 => M 개 중에 N 개 고르는 조합과 같다.
 순열이 아닌 조합인 이유는 다리끼리 서로 겹쳐질 수 없으므로 
 가능한 조합이 M의 번호 오름차순 또는 내림차순으로 순서가 고정되는 것과 같기 때문.

 mCn 은 mCm-n 과 같다.

        nPr
 nCr = ───── 
         r!
 */

// nCr 구하는 함수
function combination(n, r) {
  if (r > n - r) r = n - r;
  let topNum = 1;
  let bottNum = 1;
  for (let i = 0; i < r; i++) {
    topNum *= n - i;
    bottNum *= i + 1;
  }
  return topNum / bottNum;
}
// console.log(combination(29, 13)); //67863915

// 작업 수행
const result = [];
input.forEach((i) => {
  let [N, M] = i.split(' ').map(Number);
  result.push(N === M ? 1 : combination(M, N));
});
console.log(result.join('\n'));

// 문제 로직 - 방법 2-1 : 파스칼의 삼각형 (재귀함수) => 시간초과

/**
 서쪽 사이트 M, 동쪽 사이트 N 일 때
 다리 지을 수 있는 경우의 수를 dp[M][N] 이라 하면
 dp[1][1] = 1, dp[2][1] =  0, dp[3][1] =  0
 dp[1][2] = 2, dp[2][2] =  1, dp[3][2] =  0
 dp[1][3] = 3, dp[2][3] =  3, dp[3][3] =  1
 dp[1][4] = 4, dp[2][4] =  6, dp[3][4] =  4
 dp[1][5] = 5, dp[2][5] = 10, dp[3][5] = 10 ...
  Ξ
 => 규칙 : 파스칼의 삼각형 ! 
 예 : dp[2][4] = dp[1][3] + dp[2][3]
 +) M = 1 일 때는 경우의 수 = N
 +) M > N 일 때는 경우의 수 = 0
 */

// dp[m][n] 구하는 함수
function dp(m, n) {
  if (m === 0) return 0;
  else if (m === 1) return n;
  else if (m > 1) {
    if (m > n) return 0;
    else if (m == n) return 1;
    else return dp(m - 1, n - 1) + dp(m, n - 1);
  }
}

// 작업 수행
const result2_1 = [];
input.forEach((i) => {
  const [M, N] = i.split(' ').map(Number);
  result2_1.push(dp(M, N));
});
console.log(result2_1.join('\n'));

// 문제 로직 - 방법 2-2 : 파스칼의 삼각형 (2차원 배열에 저장; DP)

/**
 서쪽 사이트 M, 동쪽 사이트 N 일 때
 다리 지을 수 있는 경우의 수를 dp[M][N] 이라 하면
 dp[1][1] = 1, dp[2][1] =  0, dp[3][1] =  0
 dp[1][2] = 2, dp[2][2] =  1, dp[3][2] =  0
 dp[1][3] = 3, dp[2][3] =  3, dp[3][3] =  1
 dp[1][4] = 4, dp[2][4] =  6, dp[3][4] =  4
 dp[1][5] = 5, dp[2][5] = 10, dp[3][5] = 10 ...
  Ξ
 => 규칙 : 파스칼의 삼각형 ! 
 +) M = 1 일 때는 경우의 수 = N
 +) M > N 일 때는 경우의 수 = 0
 그런데
  dp[2][4] = dp[1][3] + (dp[2][3]) 인데
  dp[2][3] = dp[1][2] + (dp[2][2]),
  dp[2][2] = dp[1][1] + (dp[2][1]),
  dp[2][1] = 0                      이므로
 => dp[2][4] = dp[1][3] + dp[1][2] + dp[1][1]
  즉, 
  dp[m][n] = dp[m-1][n-1] + dp[m-1][n-2] ... + dp[m-1][1] 과 같다 !

  * 입력 조건 (0 < N ≤ M < 30) : 가능한 N,M 은 1~29
 */
function pascal(m, n) {
  // dp[m][n]까지 담을 2차원 배열 준비
  // index 0은 안쓰는 행,열. dp[m][n] = memo[m][n]으로 맞추기 위해
  const memo = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  // console.log('memo', memo);

  // 배열 채우기
  for (let i = 1; i <= m; i++) {
    for (let j = i; j <= n; j++) {
      if (i === 1) memo[i][j] = j;
      else if (j === i) memo[i][j] = 1;
      else {
        let tmp = 0;
        for (let k = 1; k < j; k++) {
          tmp += memo[i - 1][k];
        }
        memo[i][j] = tmp;
      }
    }
  }

  // 타겟 값 반환
  // console.log(m, n, memo, memo[m][n]);
  return memo[m][n];
}

// 작업 수행
const result2_2 = [];
input.forEach((i) => {
  const [M, N] = i.split(' ').map(Number);
  result2_2.push(pascal(M, N));
});
console.log(result2_2.join('\n'));

/**
 * 내가 DP (Dynamic Programming : 동적 프로그래밍) 로 문제를 푼게 맞을까... ? 
 => DP의 핵심은 값을 저장해 두고 필요할 때 재사용함으로써 알고리즘을 효율적으로 만드는 것이다. 
 DP 문제에서는 보통 여러 개의 값을 저장해두므로 배열을 사용하지만, 배열 자체에 초점을 두지는 않는다.
 */

/**
 * 2차원 배열 한 줄에 만들고 채우는 법
 * 아래의 두 코드는 같다 ! (예: 2행 3열)
 */
const Arr = [];
for (let i = 0; i < 2; i++) {
  Arr.push(new Array(3));
}
console.log(Arr); // [ [ <3 empty items> ], [ <3 empty items> ] ]

const arr = Array.from(new Array(2), () => new Array(3));
console.log(arr); // [ [ <3 empty items> ], [ <3 empty items> ] ]
