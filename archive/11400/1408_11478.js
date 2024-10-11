// https://www.acmicpc.net/problem/11478
/*
서로 다른 부분 문자열의 개수

문자열 S가 주어졌을 때, S의 서로 다른 부분 문자열의 개수를 구하는 프로그램을 작성하시오.

부분 문자열은 S에서 연속된 일부분을 말하며, 길이가 1보다 크거나 같아야 한다.

예를 들어, ababc의 부분 문자열은 a, b, a, b, c, ab, ba, ab, bc, aba, bab, abc, abab, babc, ababc가 있고, 서로 다른것의 개수는 12개이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
const output = new Set();
const length = input.length;
for (let i = 0; i < length; i++) {
  for (let j = i; j < length; j++) {
    output.add(input.substring(i, j + 1));
  }
}
console.log(output.size);
