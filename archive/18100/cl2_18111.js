// https://www.acmicpc.net/problem/18111
/*
마인크래프트

팀 레드시프트는 대회 준비를 하다가 지루해져서 샌드박스 게임인 ‘마인크래프트’를 켰다. 마인크래프트는 1 × 1 × 1(세로, 가로, 높이) 크기의 블록들로 이루어진 3차원 세계에서 자유롭게 땅을 파거나 집을 지을 수 있는 게임이다.

목재를 충분히 모은 lvalue는 집을 짓기로 하였다. 하지만 고르지 않은 땅에는 집을 지을 수 없기 때문에 땅의 높이를 모두 동일하게 만드는 ‘땅 고르기’ 작업을 해야 한다.

lvalue는 세로 N, 가로 M 크기의 집터를 골랐다. 집터 맨 왼쪽 위의 좌표는 (0, 0)이다. 우리의 목적은 이 집터 내의 땅의 높이를 일정하게 바꾸는 것이다. 우리는 다음과 같은 두 종류의 작업을 할 수 있다.

좌표 (i, j)의 가장 위에 있는 블록을 제거하여 인벤토리에 넣는다.
인벤토리에서 블록 하나를 꺼내어 좌표 (i, j)의 가장 위에 있는 블록 위에 놓는다.
1번 작업은 2초가 걸리며, 2번 작업은 1초가 걸린다. 밤에는 무서운 몬스터들이 나오기 때문에 최대한 빨리 땅 고르기 작업을 마쳐야 한다. ‘땅 고르기’ 작업에 걸리는 최소 시간과 그 경우 땅의 높이를 출력하시오.

단, 집터 아래에 동굴 등 빈 공간은 존재하지 않으며, 집터 바깥에서 블록을 가져올 수 없다. 또한, 작업을 시작할 때 인벤토리에는 B개의 블록이 들어 있다. 땅의 높이는 256블록을 초과할 수 없으며, 음수가 될 수 없다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M, B] = input.shift().split(' ').map(Number);
const land = input.map((i) => i.split(' ').map(Number)); // 땅 상태 2차원 배열
// console.log(N, M, B, land);

// 문제 로직
/**
 * 높이 0 부터 256까지 걸리는 시간을 다 구해서, 가장 짧고 높은 시간 출력.
 * 브루트 포스 => O(N*M)
 */

// target 높이 맞추는데 걸리는 시간 구하는 함수
function getTime(target) {
  const maxInven = 64000000;
  let block = B;
  let time = 0;
  let isPossible = true;
  land.forEach((i) => {
    // console.log('----------');
    i.forEach((cur) => {
      const diff = target - cur; // 쌓아야 할 블럭 수
      if (diff > 0) {
        time += diff; // 양수면 하나당 *1초 추가
        block -= diff; // 쌓은 블럭 인벤에서 꺼냄
      } else if (diff < 0) {
        time -= diff * 2; // 음수면 하나당 *2초 추가
        block -= diff; // 파낸 블록 인벤에 추가
      }
      // console.log(time, block);
    });
  });
  if (block < 0 || block > maxInven) isPossible = false; // 블럭이 모자라거나 넘치면 target 높이 달성 불가
  return { target, isPossible, time };
}
// console.log(getTime(63));

// 높이 0 부터 256 까지 걸리는 시간 구하기
const time = [];
for (let h = 0; h <= 256; h++) {
  const t = getTime(h);
  if (t.isPossible) time.push([t.time, h]);
}
// console.log(time);
time.sort((a, b) => {
  if (a[0] === b[0]) return b[1] - a[1];
  return a[0] - b[0];
});
// console.log(time);
console.log(time[0].join(' '));

/**
 * 테스트 케이스 
2 3 10
0 0 1
0 0 1
=>
2 3 10 [ [ 0, 0, 1 ], [ 0, 0, 1 ] ]
[ [ 4, 0 ], [ 4, 1 ], [ 10, 2 ] ]
[ [ 4, 1 ], [ 4, 0 ], [ 10, 2 ] ]
 */
