// https://www.acmicpc.net/problem/6588
/*
골드바흐의 추측

1742년, 독일의 아마추어 수학가 크리스티안 골드바흐는 레온하르트 오일러에게 다음과 같은 추측을 제안하는 편지를 보냈다.

4보다 큰 모든 짝수는 두 홀수 소수의 합으로 나타낼 수 있다.
예를 들어 8은 3 + 5로 나타낼 수 있고, 3과 5는 모두 홀수인 소수이다. 또, 20 = 3 + 17 = 7 + 13, 42 = 5 + 37 = 11 + 31 = 13 + 29 = 19 + 23 이다.
이 추측은 아직도 해결되지 않은 문제이다.

백만 이하의 모든 짝수에 대해서, 이 추측을 검증하는 프로그램을 작성하시오.

출력>
각 테스트 케이스에 대해서, n = a + b 형태로 출력한다. 이때, a와 b는 홀수 소수이다. 숫자와 연산자는 공백 하나로 구분되어져 있다. 만약, n을 만들 수 있는 방법이 여러 가지라면, b-a가 가장 큰 것을 출력한다. 또, 두 홀수 소수의 합으로 n을 나타낼 수 없는 경우에는 "Goldbach's conjecture is wrong."을 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

console.time();
// 실행시간 측정 시작

// 입력값 파싱
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'example.txt')
  .toString()
  .trim()
  .split(/\r?\n/)
  .map(Number);
input.pop();
// console.log(input);

// 문제 로직 - 방법 2 : 시간 & 메모리 절약 Ver (함수 없이 문제 통으로 풀기)

// input 최대값 이하의 소수 판별 위한 배열 - 에라토스테네스의 체
const max = Math.max(...input);
const isPrime = new Array(max + 1).fill(1); // 인덱스와 값 위치 맞추기 위해 N+1
isPrime[0] = isPrime[1] = 0;
sqrt = Math.ceil(Math.sqrt(max));
for (let i = 2; i <= sqrt; i++) {
  if (!isPrime[i]) continue;
  for (let j = i * 2; j <= max; j += i) {
    isPrime[j] = 0;
  }
}

// 입력값 순회하며 골드바흐 확인 & 출력
const result = [];
input.forEach((N) => {
  let isTrue = 0;
  const mid = N / 2 + 1; // 두 숫자 합은 대칭이니까 절반 앞까지만 (+) 0 포함 +1
  for (let i = 3; i < mid; i++) {
    // 홀수 소수만 확인하니까 소수 2 제외
    // 두 숫자의 합이어야 하니까 /2 값 제외
    if (isPrime[i] && isPrime[N - i]) {
      isTrue = 1;
      result.push(`${N} = ${i} + ${N - i}`);
      break;
    }
  }
  if (!isTrue) result.push(`Goldbach's conjecture is wrong.`);
});
console.log(result.join('\n'));

// 실행시간 측정 종료
console.timeEnd();

/**
 * 시간초과, 메모리 초과
 1.
 소수 진행은 어떤 수가 와도 같으므로, 입력값 중 최대값을 기준으로 구한 소수를 사용해, 중복 작업을 피해야 한다.

 2.
 소수 판별 배열에서 true 인 순수 소수값 별도 배열로 추출하고, 
 N-a = b 값이 소수 배열에 속해있는지 또 includes 로 구하는 로직은 시간 낭비였다.
 모든 정수 소수 판별 배열에서 target 소수 인덱스로 접근해 true/false 확인하면 된다.

 * 시간 제한 0.5초 
 3.
 메모리 초과 해결 후, 마지막 골드바흐 판별에서 [isTrue|N, a, b] 를 result 에 담고
 삼항연산으로 문자열 가공해 출력하려 했더니 시간 초과...
 처음부터 단순히 문자열로 push, 출력하면 통과.
 => 개인적으로 데이터 원형 최대한 보존하고 필요에 따라 활용하길 선호하는데, 코테에서 시간 제한이 빠듯할 경우는 가공 여부를 잘 판별해야겠다.
 */

// 문제 로직 - 방법 1 : 순수 로직 구현 => 시간초과
// N 이하의 소수 구하는 함수 - 에라토스테네스의 체
function getPrimeNums(N) {
  const check = new Array(N + 1).fill(1); // 인덱스와 정수 위치 맞추기 위해 N+1
  for (let i = 2; i <= Math.ceil(Math.sqrt(N)); i++) {
    for (let j = i * 2; j <= N; j += i) {
      if (check[j] === 0) continue;
      check[j] = 0;
    }
  }
  const primeNums = [];
  for (let i = 2; i <= N; i++) {
    //0과 1은 소수에서 제외
    if (check[i]) primeNums.push(i);
  }
  // console.log(primeNums);
  return primeNums;
}

// 골드바흐 - 2개의 홀수 소수 합 찾는 함수
function Goldbach(N, primeNums) {
  let isPossible = 1;
  const comb = [];
  const midIdx = Math.ceil(primeNums.length / 2);
  for (let i = 1; i <= midIdx - 1; i++) {
    // primeNums[0]는 2. 홀수 소수만 확인하므로 idx 1부터~
    // 두 숫자의 합은 대칭이므로 중간까지만
    if (primeNums[i] % 2 === 0) continue;
    const a = primeNums[i];
    const b = N - a;
    if (primeNums.includes(b)) comb.push([a, b]);
  }
  // console.log(N, comb);
  if (comb.length === 0) isPossible = 0;
  return { isPossible, comb };
}

// 입력값 순회하며 골드바흐 확인 & 출력
const result1 = [];
input.forEach((i) => {
  const test = Goldbach(i, getPrimeNums(i));
  if (test.isPossible) {
    result1.push(`${i} = ${test.comb[0][0]} + ${test.comb[0][1]}`);
  } else result1.push(`Goldbach's conjecture is wrong.`);
});
console.log(result1.join('\n'));
