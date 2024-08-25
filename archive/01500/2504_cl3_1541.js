// https://www.acmicpc.net/problem/1541
/*
잃어버린 괄호

세준이는 양수와 +, -, 그리고 괄호를 가지고 식을 만들었다. 그리고 나서 세준이는 괄호를 모두 지웠다.

그리고 나서 세준이는 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다.

괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * '-' 뒤 '+' 로 이어지는 수를 우선 연산해서 크게 만들면 전체항 합이 최소값이 된다.
 */
const fomula = input.split('-');
let answer = [];
fomula.forEach((item) => {
  if (item.includes('+')) {
    let sum = 0;
    item = item.split('+').map(Number);
    item.forEach((i) => (sum += i));
    answer.push(sum);
  } else {
    answer.push(Number(item));
  }
});
console.log(answer.reduce((a, b) => a - b));
