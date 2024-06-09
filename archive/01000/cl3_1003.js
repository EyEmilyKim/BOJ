// https://www.acmicpc.net/problem/1003
/*
피보나치 함수

다음 소스는 N번째 피보나치 수를 구하는 C++ 함수이다.
...
fibonacci(3)을 호출하면 다음과 같은 일이 일어난다.

fibonacci(3)은 fibonacci(2)와 fibonacci(1) (첫 번째 호출)을 호출한다.
fibonacci(2)는 fibonacci(1) (두 번째 호출)과 fibonacci(0)을 호출한다.
두 번째 호출한 fibonacci(1)은 1을 출력하고 1을 리턴한다.
fibonacci(0)은 0을 출력하고, 0을 리턴한다.
fibonacci(2)는 fibonacci(1)과 fibonacci(0)의 결과를 얻고, 1을 리턴한다.
첫 번째 호출한 fibonacci(1)은 1을 출력하고, 1을 리턴한다.
fibonacci(3)은 fibonacci(2)와 fibonacci(1)의 결과를 얻고, 2를 리턴한다.
1은 2번 출력되고, 0은 1번 출력된다. N이 주어졌을 때, fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번 출력되는지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const T = input.shift();
// console.log(T, input);

// 문제 로직 - 방법 2 : 상향식 피보나치
/** 
 * f(n)의 0, 1의 개수 구하기
f(0) = 0 ===========> zero 1, one 0
f(1) = 1 ===========> zero 0, one 1
f(2) = f(1) + f(0) => zero 1, one 1 
f(3) = f(2) + f(1) => zero 1, one 2
f(4) = f(3) + f(2) => zero 2, one 3
f(5) = f(4) + f(3) => zero 3, one 5
=>
  상향식으로 [zero, one] 을 memo 배열에 저장하고
f(n) = f(n-1) + f(n-2)

* 피보나치 값은 어짜피 같으므로, input 최대값까지 한번에 구해놓자 !
 */

// fibonacci(input 최대값)까지의 0,1 출력 횟수 구하기
const max = Math.max(...input);
const memo = [
  [1, 0],
  [0, 1],
];
for (let i = 2; i <= max; i++) {
  zero = memo[i - 1][0] + memo[i - 2][0];
  one = memo[i - 1][1] + memo[i - 2][1];
  memo.push([zero, one]);
}

// 작업 수행
const result = [];
input.forEach((i) => {
  const [zero, one] = memo[i];
  result.push(`${zero} ${one}`);
});
console.log(result.join('\n'));

// 문제 로직 - 방법 1 : 하향식 재귀호출 => 시간초과
// fibonacci(n) 의 0, 1 출력 횟수 세는 함수
function cntZeroOneFibo(n) {
  let cntZero = 0;
  let cntOne = 0;
  const innerCntZeroOneFibo = (m) => {
    // console.log(`f(${n}) called`);
    if (m === 0) cntZero++;
    else if (m === 1) cntOne++;
    else return innerCntZeroOneFibo(m - 1) + innerCntZeroOneFibo(m - 2);
  };
  innerCntZeroOneFibo(n);
  return [cntZero, cntOne];
}

const result1 = [];
input.forEach((i) => {
  const [cntZero, cntOne] = cntZeroOneFibo(i);
  result1.push(`${cntZero} ${cntOne}`);
});
console.log(result1.join('\n'));
