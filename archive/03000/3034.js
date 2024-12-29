// https://www.acmicpc.net/problem/3034
/*
앵그리 창영

창영이는 화가나서 성냥을 바닥에 던졌다.

상근이는 바닥이 더러워진 것을 보고 창영이를 매우 혼냈다.

강산이는 근처에서 박스를 발견했다.

상덕이는 강산이가 발견한 박스를 상근이에게 주었다.

상근이는 박스에 던진 성냥을 모두 담아오라고 시켰다.

하지만, 박스에 들어가지 않는 성냥도 있다.

이런 성냥은 박스에 담지 않고 희원이에게 줄 것이다.

성냥이 박스에 들어가려면, 박스의 밑면에 성냥이 모두 닿아야 한다.

박스의 크기와 성냥의 길이가 주어졌을 때, 성냥이 박스에 들어갈 수 있는지 없는지를 구하는 프로그램을 작성하시오. 창영이는 성냥을 하나씩 검사한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, W, H] = input.shift().split(' ').map(Number);
const match = input.map(Number);
// console.log(N, W, H, match);

// 문제 로직
const result = [];
for (let m of match) {
  result.push(checkMatch(m) ? 'DA' : 'NE');
}
console.log(result.join('\n'));

function checkMatch(size) {
  return size <= H || size <= W || size <= Math.sqrt(W ** 2 + H ** 2);
}
