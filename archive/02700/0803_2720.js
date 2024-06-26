// https://www.acmicpc.net/problem/2720
/*
세탁소 사장 동혁

거스름돈의 액수가 주어지면 직원이 줘야할 쿼터(Quarter, $0.25)의 개수, 다임(Dime, $0.10)의 개수, 니켈(Nickel, $0.05)의 개수, 페니(Penny, $0.01)의 개수를 구하는 프로그램을 작성하시오. 거스름돈은 항상 $5.00 이하이고, 손님이 받는 동전의 개수를 최소로 하려고 한다. 예를 들어, $1.24를 거슬러 주어야 한다면, 손님은 4쿼터, 2다임, 0니켈, 4페니를 받게 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [T, ...C] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((val) => +val);
// console.log(T, C);

//문제 로직
const amount = [25, 10, 5, 1];
for (let i = 0; i < T; i++) {
  const count = new Array(4).fill(0);
  let target = C[i];
  for (let j = 0; j < 4; j++) {
    const Q = Math.floor(target / amount[j]);
    target -= amount[j] * Q;
    count[j] = Q;
  }
  console.log(count.join(' '));
}
