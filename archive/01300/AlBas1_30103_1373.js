// https://www.acmicpc.net/problem/1373
/*
2진수 8진수

2진수가 주어졌을 때, 8진수로 변환하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * 2진수에서 8진수로 바로 바꾸기 
 1. 2진수 문자열 뒤집어(idx 다루기 쉽도록)서 앞에서 3자리씩 끊고 
 2. 각 자리 *1, *2, *4  합한 결과 임시배열에 추가
 3. 임시배열 뒤집어서 붙인 값 => 8진수
 */
const revArr = Array.from(input).reverse();
const len = revArr.length;
// console.log(revArr);
const resultRev = [];
let cnt = 0;
while (cnt * 3 + 1 <= len) {
  let sum = 0;
  const idx1 = cnt * 3;
  const idx2 = idx1 + 1;
  const idx3 = idx1 + 2;
  sum += revArr[idx1] * 1;
  if (revArr[idx2]) sum += revArr[idx2] * 2;
  if (revArr[idx3]) sum += revArr[idx3] * 4;
  resultRev.push(sum);
  cnt++;
}
console.log(resultRev.reverse().join(''));

// 문제 로직 - 실패한 방법 : 10진수로 바꿔 8진수로 표기하기
/**
 * 주어지는 2진수 길이 최대 1,000,000
 => max 값 2^1,000,000 으로 매우 큰 수가 올 수 있으므로
 10진수를 거치지 않고 바로 8진수로 변환해야 함.

 * parseInt(N, 기수B) => B진수 정수 N을 10진수로 전환
 * N.toString(기수B) => 10진수 N을 B진수로 전환
 */

// 10진수 전환
const decimal = parseInt(input, 2);
// 10진수로 직접 전환
// const length = input.length;
// let decimal = 0;
// for (let i = 0; i < length; i++) {
//   const idx = length - 1 - i;
//   decimal += input[idx] * Math.pow(2, i);
// }
// console.log(decimal);

// 8진수로 출력
console.log(decimal.toString(8));
