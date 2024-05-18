// https://www.acmicpc.net/problem/24266
/*
알고리즘 수업 - 알고리즘의 수행 시간 5

MenOfPassion(A[], n) {
    sum <- 0;
    for i <- 1 to n
        for j <- 1 to n
            for k <- 1 to n
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
// console.log(input);

// 문제 로직

console.log(String(input * input * input));
console.log(3);

/**
 * 지금까지 내용과 기본 논리는 같음. 
 실행횟수 : n^3회, O(N^3) => 즉 3차 시간이다. 

 * 이 문제의 함정은 input 값 범위와 자료형 !! 
 input 값은 n (1 ≤ n ≤ 500,000) 이 주어진다.
 JavaScript로 표현할 수 있는 Number의 범위는
 -2^53+1 에서 2^53-1(9,007,199,254,740,991)까지인데 
 이를 초과하는 125,000,000,000,000,000 값을 가지게 된다. 
 따라서 Number 범위 초과를 고려해 BigInt 자료형을 사용해야한다.
 */
