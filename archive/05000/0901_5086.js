// https://www.acmicpc.net/problem/5086
/*
배수와 약수

두 수가 주어졌을 때, 다음 3가지 중 어떤 관계인지 구하는 프로그램을 작성하시오.

첫 번째 숫자가 두 번째 숫자의 약수이다.
첫 번째 숫자가 두 번째 숫자의 배수이다.
첫 번째 숫자가 두 번째 숫자의 약수와 배수 모두 아니다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

//문제 로직
input.pop();
input.forEach((i) => {
  const [A, B] = i.split(' ').map((val) => +val);
  if (B % A === 0) console.log('factor');
  else if (A % B === 0) console.log('multiple');
  else console.log('neither');
});
