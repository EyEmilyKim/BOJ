// https://www.acmicpc.net/problem/1213
/*
팰린드롬 만들기

임한수와 임문빈은 서로 사랑하는 사이이다.

임한수는 세상에서 팰린드롬인 문자열을 너무 좋아하기 때문에, 둘의 백일을 기념해서 임문빈은 팰린드롬을 선물해주려고 한다.

임문빈은 임한수의 영어 이름으로 팰린드롬을 만들려고 하는데, 임한수의 영어 이름의 알파벳 순서를 적절히 바꿔서 팰린드롬을 만들려고 한다.

임문빈을 도와 임한수의 영어 이름을 팰린드롬으로 바꾸는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split('').sort();
// console.log(input);

// 문제 로직
const [head, body] = [[], []];
while (input.length) {
  const first = input.shift();
  const idx = input.indexOf(first);
  if (idx === -1) body.push(first);
  else {
    head.push(first);
    input.splice(idx, 1);
  }
}
const tail = [...head].reverse().join('');
if (body.length > 1) console.log("I'm Sorry Hansoo");
else console.log(head.join('') + body.join('') + tail);
