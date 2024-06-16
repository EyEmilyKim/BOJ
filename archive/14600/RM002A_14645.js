// https://www.acmicpc.net/problem/14645
/*
와이버스 부릉부릉

버스 운전수 비와이 씨가 운전하는 버스(verse아님 ㅎ)는 N개의 정거장을 거친 후 종착역에 도착한다. 각 정거장은 내릴 인원수와 올라탈 인원수가 정해져 있다. 종착역에 도착하면 버스에 타고 있던 모든 사람이 내린다.

입력>
첫 줄에 출발역과 종착역을 제외한 정거장의 수 N(1 ≤ N ≤ 100,000)과 출발역에서 탑승하는 사람의 수 K(1 ≤ K ≤ 10,000)가 주어진다. 둘째 줄부터 N개의 줄에 걸쳐 각 줄마다 i번째 정거장에서 탑승하는 인원 A와 하차하는 인원 B가 주어진다. (0 ≤ A, B ≤ 10,000)

출력>
종착역에 도착했을 때, 버스 운전수의 이름을 출력해라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
// const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
// const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// const [N, K] = input.shift().split(' ').map(Number);
// console.log(N, K, input);

// 문제 로직

// // 종착점 인원수 물어볼 줄 알았지 ?
// let people = K;
// input.forEach((i) => {
//   const [on, off] = i.split(' ').map(Number);
//   people = people + on - off;
// });
// console.log(people);

// 응~ 아니야~ 운전수 이름 출력해~
console.log('비와이');
