// https://www.acmicpc.net/problem/14215
/*
세 막대

영선이는 길이가 a, b, c인 세 막대를 가지고 있고, 각 막대의 길이를 마음대로 줄일 수 있다.

영선이는 세 막대를 이용해서 아래 조건을 만족하는 삼각형을 만들려고 한다.

각 막대의 길이는 양의 정수이다
세 막대를 이용해서 넓이가 양수인 삼각형을 만들 수 있어야 한다.
삼각형의 둘레를 최대로 해야 한다.
a, b, c가 주어졌을 때, 만들 수 있는 가장 큰 둘레를 구하는 프로그램을 작성하시오. 

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((val) => +val);
input.sort((a, b) => {
  return a - b;
});

// 문제 로직
let [a, b, c] = input;
// console.log(a, b, c);
let sum = 0;
if (a === b && b === c) sum = a + b + c;
else if (a + b <= c) {
  while (a + b <= c) c--;
  // console.log(a, b, c);
  sum = a + b + c;
} else sum = a + b + c;
console.log(sum);

/**
 * 가장 긴 변의 길이가 다른 두 변의 길이 합 보다 작아야 삼각형이 성립됨
 */
