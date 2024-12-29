// https://www.acmicpc.net/problem/17247
/*
택시 거리

...
택시 거리는 바둑판 모양의 도로망을 가진 도시에서 점 A에서 B까지의 최단 거리를 구할 경우 도로를 따라서만 가는 가장 짧은 거리를 뜻한다.

위의 사진에서는 빨간색 선이 택시거리이다. 즉, 점 A의 좌표가 (x1, y1)이고 점 B의 좌표를 (x2, y2)라고 했을 때, 두 장소 사이의 택시 거리 D는 다음과 같다.
 
D = |x_2 - x_1| + |y_2 - y_1|

인접한 0과 0, 0과 1, 1과 1 사이의 거리를 1이라고 할 때, 두 1 사이의 거리를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [[R, C], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(R, C, data);

// 문제 로직
const pos = [];
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (data[r][c] === 1) pos.push([r, c]);
  }
}
const [[ax, ay], [bx, by]] = pos;
const result = Math.abs(ax - bx) + Math.abs(ay - by);
console.log(result);
