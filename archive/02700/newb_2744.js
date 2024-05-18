// https://www.acmicpc.net/problem/2744
/*
대소문자 바꾸기

영어 소문자와 대문자로 이루어진 단어를 입력받은 뒤, 대문자는 소문자로, 소문자는 대문자로 바꾸어 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직

// 대문자인지 아닌지 판별하는 메서드
const isUpperCase = (char) => {
  return char === char.toUpperCase();
};
// 변환 수행
let result = '';
for (let i = 0; i < input.length; i++) {
  // console.log(input[i], isUpperCase(input[i]));
  if (isUpperCase(input[i])) result += input[i].toLowerCase();
  else result += input[i].toUpperCase();
}
console.log(result);
