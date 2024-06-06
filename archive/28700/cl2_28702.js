// https://www.acmicpc.net/problem/28702
/*
FizzBuzz

FizzBuzz 문제는 
i = 1, 2, \cdots$ 에 대해 다음 규칙에 따라 문자열을 한 줄에 하나씩 출력하는 문제입니다.

- i가 3의 배수이면서 5의 배수이면 “FizzBuzz”를 출력합니다. 
- i가 3의 배수이지만 5의 배수가 아니면 “Fizz”를 출력합니다. 
- i가 3의 배수가 아니지만 5의 배수이면 “Buzz”를 출력합니다. 
- i가 3의 배수도 아니고 5의 배수도 아닌 경우 i를 그대로 출력합니다.

FizzBuzz 문제에서 연속으로 출력된 세 개의 문자열이 주어집니다. 이때, 이 세 문자열 다음에 올 문자열은 무엇일까요?

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직

// FizzBuzz 함수
function FizzBuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) return 'FizzBuzz';
  if (num % 3 === 0) return 'Fizz';
  if (num % 5 === 0) return 'Buzz';
  return num;
}

// input 중에 숫자가 있으면 +카운트로 다음 수 구하기
// (연속된 input 3개 중 하나는 반드시 숫자일 것이므로)
let next = -1;
for (let i = 0; i < 3; i++) {
  if (Number(input[i])) next = Number(input[i]) + (3 - i);
}

// 다음 수 FizzBuzz 로 출력
console.log(FizzBuzz(next));
