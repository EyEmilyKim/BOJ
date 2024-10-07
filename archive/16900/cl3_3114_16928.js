// https://www.acmicpc.net/problem/16928
/*
뱀과 사다리 게임

뱀과 사다리 게임을 즐겨 하는 큐브러버는 어느 날 궁금한 점이 생겼다.

주사위를 조작해 내가 원하는 수가 나오게 만들 수 있다면, 최소 몇 번만에 도착점에 도착할 수 있을까?

게임은 정육면체 주사위를 사용하며, 주사위의 각 면에는 1부터 6까지 수가 하나씩 적혀있다. 게임은 크기가 10×10이고, 총 100개의 칸으로 나누어져 있는 보드판에서 진행된다. 보드판에는 1부터 100까지 수가 하나씩 순서대로 적혀져 있다.

플레이어는 주사위를 굴려 나온 수만큼 이동해야 한다. 예를 들어, 플레이어가 i번 칸에 있고, 주사위를 굴려 나온 수가 4라면, i+4번 칸으로 이동해야 한다. 만약 주사위를 굴린 결과가 100번 칸을 넘어간다면 이동할 수 없다. 도착한 칸이 사다리면, 사다리를 타고 위로 올라간다. 뱀이 있는 칸에 도착하면, 뱀을 따라서 내려가게 된다. 즉, 사다리를 이용해 이동한 칸의 번호는 원래 있던 칸의 번호보다 크고, 뱀을 이용해 이동한 칸의 번호는 원래 있던 칸의 번호보다 작아진다.

게임의 목표는 1번 칸에서 시작해서 100번 칸에 도착하는 것이다.

게임판의 상태가 주어졌을 때, 100번 칸에 도착하기 위해 주사위를 굴려야 하는 횟수의 최솟값을 구해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((row) => row.split(' ').map(Number));
const [N, M] = input.shift();
const ladder = input.slice(0, N);
const snake = input.slice(N);
// console.log(N, M, '\nladder', ladder, '\nsnake', snake);

// 문제 로직
/**
 * BFS
 */

// 사다리 or 뱀에 의한 jump 값 넣기
const arr = Array(101).fill(0);
for (let [x, y] of ladder) {
  arr[x] = y;
}
for (let [u, v] of snake) {
  arr[u] = v;
}

// 매 step 마다 주사위 눈 1~6 탐색하며 100 까지 진행하는 BFS 함수
function bfs(start, cnt) {
  const visited = Array(101).fill(false); // 각 칸 방문 여부
  const queue = [[start, cnt]]; // 칸 첫 방문 시 칸번호와 cnt 저장할 queue
  let head = 0; // queue 빠른 접근 위한 index
  visited[start] = true;

  while (queue.length > head) {
    const [cur, prevCnt] = queue[head++];
    // 주사위 눈 1 ~ 6 모두 탐색
    for (let i = 1; i <= 6; i++) {
      let next = cur + i;

      // 종점 도착하면 총 주사위 굴린 횟수 반환, 끝.
      if (next === 100) {
        return prevCnt + 1;
      }

      if (next < 100) {
        // 사다리 or 뱀 만나면 해당 위치로 이동 (카운트 증가 없음)
        if (arr[next] !== 0) {
          next = arr[next];
        }
        // 해당칸 처음 도착했을 때만 queue 에 담기
        if (!visited[next]) {
          visited[next] = true;
          queue.push([next, prevCnt + 1]);
        }
      }
    }
  }
}

// 작업 수행
const result = bfs(1, 0);
console.log(result);
