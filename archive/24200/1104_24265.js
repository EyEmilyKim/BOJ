// https://www.acmicpc.net/problem/24265
/*
알고리즘 수업 - 알고리즘의 수행 시간 4

MenOfPassion(A[], n) {
    sum <- 0;
    for i <- 1 to n - 1
        for j <- i + 1 to n
            sum <- sum + A[i] × A[j]; # 코드1
}

출력>
첫째 줄에 코드1 의 수행 횟수를 출력한다.
둘째 줄에 코드1의 수행 횟수를 다항식으로 나타내었을 때, 최고차항의 차수를 출력한다. 단, 다항식으로 나타낼 수 없거나 최고차항의 차수가 3보다 크면 4를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직
/**
 MenOfPassion(A[], n) { 
    sum <- 0;
    for i <- 1 to n - 1  
        for j <- i + 1 to n  
            sum <- sum + A[i] × A[j]; # 코드1
    return sum;
}

// n = 7이면
1 - 2,3,4,5,6,7   // 6회
2 - 3,4,5,6,7   // 5회
3 - 4,5,6,7   // 4회
4 - 5,6,7   // 3회
5 - 6,7   // 2회
6 - 7  // 1회
=> k = (n-1) 부터 1까지 등차수열의 합 = (n*(n-1))/2

O(n^2)
 */

// 실행 횟수
// 1. 단순 합산으로 구하기
function getK(num) {
  let sum = 0;
  for (let i = num - 1; i >= 1; i--) sum += i;
  return sum;
}
// console.log(getK(input));
// 2. 공식으로 구하기
console.log((input * (input - 1)) / 2);

// 최고차항 차수
console.log(2);
