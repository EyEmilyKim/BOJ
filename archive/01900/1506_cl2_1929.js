// https://www.acmicpc.net/problem/1929
/*
소수 구하기

M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [M, N] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((i) => +i);
// console.log(M, N);

// 문제 로직 - 방법 2: 아리스토스테네스의 체 사용
/**
 * 아리스토스테네스의 체 
  - 2부터 소수를 구하고자 하는 수 까지 나열한다. (예 : 수 = 120)
  - 2는 소수이므로 자기 자신을 제외한 2의 배수들을 모두 지운다.
  - 3은 소수이므로 자기 자신을 제외한 3의 배수들을 모두 지운다.
  - 이를 반복해서 남은 숫자들은 소수가 된다.
  - 위 예의 경우 11² > 120 이므로, 11보다 작은 배수까지 비교하면 된다.
 https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4
 */

// 0 부터 N까지 소수 판별 위한 배열 준비 (index 와 정수 매칭 위해 0부터 담아줌)
const isPrimeNum = new Array(N + 1).fill(1);
isPrimeNum[0] = isPrimeNum[1] = 0; // 0 과 1 은 소수 아님
// console.log(isPrimeNum);

// 2 부터 N의 제곱근까지 자기 자신을 제외한 배수는 소수에서 제외
for (let i = 2; i <= Math.ceil(Math.sqrt(N)); i++) {
  if (!isPrimeNum[i]) continue;
  for (let j = i * 2; j <= N; j += i) {
    isPrimeNum[j] = 0;
  }
  // console.log(i, isPrimeNum);
}

// M 이상 N 이하 소수값만 결과에 담아 출력
const result = [];
for (let i = M; i <= N; i++) {
  if (isPrimeNum[i]) result.push(i);
}
console.log(result.join('\n'));

// 문제 로직 - 방법 1 : 단순 for문 소수 판별 isPrime 구현 => 시간초과

function isPrime(num) {
  if (num === 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const primeNum = [];
for (let i = M; i <= N; i++) {
  if (isPrime(i)) primeNum.push(i);
}
console.log(primeNum.join('\n').trim());

// 문제 로직 - 방법 1-2 : 단순 for문 소수 판별 isPrime 구현 (시간 절약 ver) =>통과

function isPrime(num) {
  if (num === 1) return false;
  for (let i = 2; i <= num ** 0.5; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const primeNums = [];
for (let i = M; i <= N; i++) {
  if (isPrime(i)) primeNums.push(i);
}
console.log(primeNums.join('\n').trim());

/** 
 * 소수 구할 때는 2부터 N까지 다 나눠보는건 O(N)
 => 사실 2부터 N의 제곱근까지만 나눠보면 된다 !
  약수는 제곱근을 중심으로 대칭성을 이루기 때문에
  예: 16 - 1*16과 16*1, 2*8과 8*2, 4*4

 * 제곱과 제곱근 연산
const num = 16;
console.log(num * num); // 256
console.log(num ** 2); // 256
console.log(Math.pow(num, 2)); // 256
console.log(Math.sqrt(num)); // 4
console.log(num ** 0.5); // 4
 */
