// https://www.acmicpc.net/problem/6502
/*
동혁 피자

대전 ACM-ICPC Regional가 끝나면, 대회 참가자들은 다같이 카이스트 근처의 동혁 피자에 간다. 대회는 5시간동안 진행되므로, 참가자는 모두 배가 매우 고프다. 피자를 최대한 빨리 먹기 위해서, 큰 피자를 하나 시키려고 한다. 생각해보니 피자가 너무 크면 식탁 위에 맞지 않을 수도 있다. 식탁은 원이고, 피자는 직사각형이다. 식탁의 반지름과 피자의 크기가 주어졌을 때, 피자가 식탁에 맞는 크기인지 아닌지를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
// console.log(input);

// 문제 로직
/**
 * 직사각형의 대각선 구하기 
 a^2 + b^2 = c^2 (피타고라스의 정리)
*/
const result = [];
input.forEach((i, idx) => {
  const [r, w, l] = i.split(' ').map(Number);
  const diagonal = Math.sqrt(w ** 2 + l ** 2);
  if (diagonal <= r * 2) result.push(`Pizza ${idx + 1} fits on the table.`);
  else result.push(`Pizza ${idx + 1} does not fit on the table.`);
});
console.log(result.join('\n'));
