// https://www.acmicpc.net/problem/10814
/*
나이순 정렬

온라인 저지에 가입한 사람들의 나이와 이름이 가입한 순서대로 주어진다. 이때, 회원들을 나이가 증가하는 순으로, 나이가 같으면 먼저 가입한 사람이 앞에 오는 순서로 정렬하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직
const mems = input.map((i) => i.split(' ')).map((i) => [Number(i[0]), i[1]]);
// console.log(mems);
mems.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  return 0;
});
// console.log(mems);
let result = '';
mems.forEach((i) => (result += `${i[0]} ${i[1]}\n`));
console.log(result.trim());
