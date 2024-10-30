// https://www.acmicpc.net/problem/1629
/*
곱셈

자연수 A를 B번 곱한 수를 알고 싶다. 단 구하려는 수가 매우 커질 수 있으므로 이를 C로 나눈 나머지를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b, c] = require('fs').readFileSync(path).toString().trim().split(' ').map(BigInt);
// console.log(a, b, c);

// 문제 로직
/**
 * 모듈로(%) 연산의 분배 법칙
(A * B % C) = ((A % C) * (B % C)) % C

 * 단 A^B % C 를 (A * (A*...*A)) % C 로 단순하게 풀면
위 공식을 B번 재귀 반복해야 해서 비효율적임.
=> A^B 는 B가 짝수라면 (A^B/2 * A^B/2) 로 표현할 수 있는 성질을 이용
=> B가 홀수라면 *A 로 한번 덜어낸 다음 짝수 지수로 2/1씩 반복..

 * 만약 C가 2^31 - 1이고 A가 2^31 - 2라면 ((A % C) x (B % C))는 거의 2^62가 된다.
js의 int 자료형(Number)의 최대값은 2^53 - 1 이므로 오버플로우가 발생한다.
=> BigInt 자료형 사용 !

 * 참고) https://velog.io/@pakxe/%EB%B0%B1%EC%A4%80-1629-%EA%B3%B1%EC%85%88
 */

function recursive(base, power, modulo) {
  // 더 이상 나눠지지 않는 경우
  if (power === 1n) return base % modulo;

  const half = recursive(base, power / 2n, modulo) % modulo;

  // 지수가 홀수 일 때
  if (power % 2n) return (half * half * (base % modulo)) % modulo;
  // 지수가 짝수 일 때
  else return (half * half) % modulo;
}

console.log(recursive(a, b, c).toString());
