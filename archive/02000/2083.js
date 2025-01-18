// https://www.acmicpc.net/problem/2083
/*
럭비 클럽

올 골드 럭비 클럽의 회원들은 성인부 또는 청소년부로 분류된다.

나이가 17세보다 많거나, 몸무게가 80kg 이상이면 성인부이다. 그 밖에는 모두 청소년부이다. 클럽 회원들을 올바르게 분류하라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' '));
input.pop();
// console.log(input);

// 문제 로직
const result = [];
for (const [name, age, weight] of input) {
  const check = age > 17 || weight >= 80 ? 'Senior' : 'Junior';
  result.push(name + ' ' + check);
}
console.log(result.join('\n'));
