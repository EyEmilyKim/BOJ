// https://www.acmicpc.net/problem/2845
/*
파티가 끝나고 난 뒤

파티가 끝나고 나면, 사람들은 누가 파티에 왔는지와 얼마나 많은 사람들이 왔는지를 궁금해한다. 보통 파티는 매우 크게 열리기 때문에, 정확하게 몇 명이 참가했는지 알 수가 없다.

지난주 토요일에 상근이는 자신의 3학년 진학을 기념하면서 매우 성대한 파티를 열었다. 그리고, 상근이는 1m2당 몇 명의 사람이 있었는지 알고있다.

상근이의 파티는 정말 엄청난 규모였기 때문에, 대부분의 신문에도 기사가 실렸다. 상근이는 서로 다른 5개의 신문을 보면서 그 기사에 적혀져있는 참가자의 수를 적었다.

상근이는 자신이 알고있는 참가자의 수가 정확하다고 생각한다. 각 신문 기사에 실려있는 참가자의 수가 몇 명 만큼 잘못되어있는지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [L, P] = input.shift().split(' ').map(Number);
const paper = input.shift().split(' ').map(Number);
// console.log(L, P, paper);

// 문제 로직
const total = L * P;
const result = [];
paper.forEach((i) => {
  result.push(i - total);
});
console.log(result.join(' '));
