// https://www.acmicpc.net/problem/2752
/*
세수정렬

동규는 세수를 하다가 정렬이 하고 싶어졌다.

정수 세 개를 생각한 뒤에, 이를 오름차순으로 정렬하고 싶어졌다.

정수 세 개가 주어졌을 때, 가장 작은 수, 그 다음 수, 가장 큰 수를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
const result = [];
for (let i = input; i > 0; i--) {
  result.push(i);
}
console.log(result.join('\n'));
