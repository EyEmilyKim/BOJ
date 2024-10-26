// https://www.acmicpc.net/problem/26069
/*
붙임성 좋은 총총이

총총이는 친구 곰곰이의 소개로 제2회 곰곰컵에 출연할 기회를 얻었다!

총총이는 자신의 묘기인 무지개 댄스를 선보여, 여러분의 환심을 사려 한다. 이 댄스는 중독성이 강하기 때문에, 한번 보게 된 사람은 모두 따라 하게 돼버린다.

무지개 댄스를 추는 총총 2마리

사람들이 만난 기록이 시간 순서대로 
$N$개 주어진다. (총총이는 토끼이지만 이 문제에서는 편의상 사람이라고 가정한다.)

무지개 댄스를 추지 않고 있던 사람이 무지개 댄스를 추고 있던 사람을 만나게 된다면, 만난 시점 이후로 무지개 댄스를 추게 된다.

기록이 시작되기 이전 무지개 댄스를 추고 있는 사람은 총총이 뿐이라고 할 때, 마지막 기록 이후 무지개 댄스를 추는 사람이 몇 명인지 구해보자!

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [[N, _], ...input] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' '));
// console.log(N, input);

// 문제 로직
const dancer = new Map(); // 춤추는 사람 저장할 맵
dancer.set('ChongChong', true);

for (let i of input) {
  const [a, b] = i;
  // 안 춤추는 사람이 춤추는 사람 만나면 전염됨
  if (dancer.has(a) && !dancer.has(b)) dancer.set(b, true);
  else if (dancer.has(b) && !dancer.has(a)) dancer.set(a, true);
}

console.log(dancer.size); // 춤추는 사람 수 출력
