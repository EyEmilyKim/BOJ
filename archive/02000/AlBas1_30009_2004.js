// https://www.acmicpc.net/problem/2004
/*
조합 0의 개수
 
nCm의 끝자리 0의 개수를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [n, m] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(n, m);

// 문제 로직 - 방법 2 : 팩토리얼 연산에 *10, 즉 5와 2의 개수 확인
/**
 * 이항계수 = 조합 공식
5C3 = 5*4*3 / 3*2*1
    = 5*4*3*(2*1) / 3*2*1*(2*1)
    = 5! / 3!*(5-2)!
nCr = n! / r! * (n-r)!

 * 끝자리 0의 개수 = *10 의 개수 = *2, *5 의 개수 중 적은 수
2*2 * 5*5*5 = 10*10*5 = 500
2*2*2 * 5*5 = 10*10*2 = 200
 */

// num! 연산 중의 *2 와 *5 의 개수 구하는 함수
function getTwoFive(num) {
  let two = 0;
  let five = 0;
  for (let i = 2; i <= num; i *= 2) {
    two += parseInt(num / i);
  }
  for (let i = 5; i <= num; i *= 5) {
    five += parseInt(num / i);
  }
  return [two, five];
}

// nCm 값의 *2, *5 개수 구하기
const [n2, n5] = getTwoFive(n);
const [m2, m5] = getTwoFive(m);
const [nm2, nm5] = getTwoFive(n - m);

const two = n2 - m2 - nm2;
const five = n5 - m5 - nm5;

// nCm 값의 끝자리 0의 개수 구하기
console.log(Math.min(two, five));

// 문제 로직 - 방법 1 : 결과값 문자열로 바꿔서 0 찾기 => ((실패))
/**
 * 실패 이유 : 
 n에 큰 수가 들어오면 내가 생각한 10진수 표기가 아니게 됨
 예 : 2,000,000,000(C)5 = 2.6666666533333333e+44
 */

// nCm 구하기
/**
5C3 = 5*4*3 / 3*2*1
 */
let top = 1;
let bott = 1;
for (let i = 0; i < m; i++) {
  top *= n - i;
  bott *= i + 1;
}
let C = 0;
if (n > 0 && m > 0) C = top / bott;
console.log(C);

// nCm 의 끝자리 0 개수 구하기
const arr = Array.from(String(C)).reverse();
console.log(arr);
let cnt = 0;
while (arr[cnt] === '0') cnt++;
console.log(cnt);
