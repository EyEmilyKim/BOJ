// https://www.acmicpc.net/problem/29719
/*
브실이의 불침번 근무

브실이는 브실사단에서 브실브실 중대에 군 복무 중인 군인으로 여느 때와 다름없이 군 생활 중 한 공지문을 보게 됐다.

<공지사항>

행정반에서 공지사항 전파 말씀드립니다.

상급 부대의 지시에 의해 우리 브실브실 중대에서는 N일 동안 불침번을 서게 되었습니다. 이러한 이유로 현재 중대에 있는 M명의 용사를 넣어 불침번을 서게 할 생각입니다.

불침번은 혼자서도 할 수 있으므로 하루마다 용사 한 명씩 넣을 계획입니다. 불침번을 여러 번 서는 용사가 있을 수 있음에 유의해 주시기 바랍니다.

브실이는 당연히 군 복무 중인 군인이기에 M명의 불침번 후보에 본인도 포함되어 있다는 것을 안다. 브실이는 이러한 공지를 보고 자신이 불침번에 들어갈 경우의 수가 얼마나 되는지 궁금해졌다.

궁금해진 브실이를 위해 대신 당신이 알려주자. 단, 투입되는 인원이 같아도 들어가는 순서가 다르면 다른 경우가 되며 수가 너무 커질 수 있으므로 1,000,000,007로 나눈 나머지를 출력하자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, M] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(N, M);

// 문제 로직
/**
 * 브실이가 1회 이상 서는 경우의 수 = 전체 경우의 수 - 브실이가 0번 서는 경우의 수
 * 거듭제곱 수가 너무 커지면 정밀도 문제로 오답 판정을 받는다.
 * (참고) "빠른 거듭제곱(이진 지수법)"을 이용하면 큰 지수의 거듭제곱 연산이 더욱 효율적이다.
 */

// 방법 1 - 단순 반복문 이용한 거듭제곱 모듈 연산 함수
function modPow(base, exponent, mod) {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result = (result * base) % mod;
  }
  return result;
}
// 계산 수행
const mod = 1000000007;
const case_all = modPow(M, N, mod);
const case_neverMe = modPow(M - 1, N, mod);
const case_me = (case_all - case_neverMe + mod) % mod;
console.log(case_me);

// 방법 2 - 이진 지수법 이용한 거듭제곱 모듈 연산 함수
/**
 * 지수를 이진수로 표현하고, 이 이진수의 각 비트에 따라 거듭제곱을 계산하는 방식.
예 : 3 ** 13 mod 5 를 계산할 경우, 지수 13을 이진수로 표현하면 1101.
이 1101 의 각 비트를 가장 오른쪽부터 순차적으로 처리하여 결과를 계산한다.
- result : 최종 결과를 저장할 변수로 초기값은 1이다.
- base : 모듈 연산(base % mod) 수행하여 초기화. 이는 이후 계산에서 기본 값이 너무 커지는 것을 방지하기 위함이다.
- '지수가 홀수인 경우(즉 비트값이 1인 경우)' result에 base를 곱하고 모듈 연산 수행. 
이는 현재 base가 지수의 해당 비트에 대응하는 값을 가지고 있음을 의미한다.
- 지수를 반으로 나눈다. 이는 이진수 표현에서 다음 비트를 처리하기 위함이다.
- base를 제곱하고 모듈 연산 수행. 이는 다음 비트 값 처리 위해 base를 준비하는 과정.
*/
function modPow_binEx(base, exponent, mod) {
  let result = 1; // 결과를 저장할 변수, 초기값은 1
  base = base % mod; // base를 mod로 나눈 나머지로 초기화

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      // 지수가 홀수인 경우
      result = (result * base) % mod; // result에 base 곱하고 모듈 연산
    }
    exponent = Math.floor(exponent / 2); // 지수를 반으로 나눔
    base = (base * base) % mod; // base를 제곱하고 모듈로 연산
  }
  return result;
}
