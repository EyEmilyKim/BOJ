// https://www.acmicpc.net/problem/9093
/*
단어 뒤집기

문장이 주어졌을 때, 단어를 모두 뒤집어서 출력하는 프로그램을 작성하시오. 단, 단어의 순서는 바꿀 수 없다. 단어는 영어 알파벳으로만 이루어져 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = input.shift();
const sents = input.map((i) => i.split(' '));
// console.log(N, sents);

// 문제 로직
const result = [];
sents.forEach((i) => {
  const reverse = [];
  i.forEach((block) => {
    const blockRev = Array.from(block).reverse().join('');
    reverse.push(blockRev);
  });
  result.push(reverse.join(' '));
});
console.log(result.join('\n').trim());
