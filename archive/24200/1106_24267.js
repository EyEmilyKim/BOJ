// https://www.acmicpc.net/problem/24267
/*
알고리즘 수업 - 알고리즘의 수행 시간 6

MenOfPassion(A[], n) {
    sum <- 0;
    for i <- 1 to n - 2
        for j <- i + 1 to n - 1
            for k <- j + 1 to n
                sum <- sum + A[i] × A[j] × A[k]; # 코드1
    return sum;
}

입력>
첫째 줄에 입력의 크기 n(1 ≤ n ≤ 500,000)이 주어진다.

출력>
첫째 줄에 코드1 의 수행 횟수를 출력한다.
둘째 줄에 코드1의 수행 횟수를 다항식으로 나타내었을 때, 최고차항의 차수를 출력한다. 단, 다항식으로 나타낼 수 없거나 최고차항의 차수가 3보다 크면 4를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = BigInt(require('fs').readFileSync(path).toString().trim());
// console.log(input, '\n');

// 문제 로직

/**
MenOfPassion(A[], n) {
    sum <- 0;
    for i <- 1 to n - 2
        for j <- i + 1 to n - 1
            for k <- j + 1 to n
                sum <- sum + A[i] × A[j] × A[k]; # 코드1
    return sum;
}

// n = 5 일 때 
1  2  3
1  2  4
1  2  5 _ 3
1  3  4 
1  3  5 _ 2
1  4  5 ____ 1 (6)
2  3  4 
2  3  5 _ 2
2  4  5 ____ 1 (3)
3  4  5 ____ 1 (1)

O(n^3)
 */

function getTime(num) {
  // 방법1 : 등차수열 합 공식
  let sum = 0n;
  let i = num;
  while (i >= 1n) {
    sum += (i * (i + 1n)) / 2n;
    i--;
  }
  return sum;
}

function getT(num) {
  // 방법2 : 단순 합산 - 시간 초과
  let sum = 0n;
  for (let i = num - 2n; i >= 1n; i--) {
    let target = i;
    while (target >= 1n) {
      // console.log(target);
      sum += target;
      target--;
    }
  }
  return sum;
}

console.log(String(getTime(input - 2n)));
console.log(3);

/**
 * 방법2 등차수열 합 공식 활용해 풀 때, 
 처음에 똑같은 논리를 재귀함수로 구현했으나 런타임 에러 났음.
 재귀호출은 입력 값이 너무 클 경우에는 스택 오버플로우가 발생할 수 있다.
 이를 피하기 위해 반복문으로 다시 제출하니 정답 처리되었다.

 * 나는 규칙성을 찾아내 등차수열 합 공식을 사용했는데,
 예시로 나열해본 케이스를 다르게 해석하면 
 입력값 N 개 중 서로 중복되지 않는 수 3개의 조합으로 볼 수도 있다.
 이를 토대로 조합공식을 사용해 풀어볼 수도 있다.
        nP3     n(n-1)(n-2)
 nC3 = ───── = ─────────────
         3!       3*2*1

          n!     
 nPr = ──────────
        (n-r)!

          n!     
 nCr = ──────────
        r!(n-r)!
        
 (참고) 순열 조합 공식 원리 쉽게 철저하게 이해하기
 https://m.blog.naver.com/galaxyenergy/221565884833        
 */
