// https://www.acmicpc.net/problem/16236
/*
아기 상어

N×N 크기의 공간에 물고기 M마리와 아기 상어 1마리가 있다. 공간은 1×1 크기의 정사각형 칸으로 나누어져 있다. 한 칸에는 물고기가 최대 1마리 존재한다.

아기 상어와 물고기는 모두 크기를 가지고 있고, 이 크기는 자연수이다. 가장 처음에 아기 상어의 크기는 2이고, 아기 상어는 1초에 상하좌우로 인접한 한 칸씩 이동한다.

아기 상어는 자신의 크기보다 큰 물고기가 있는 칸은 지나갈 수 없고, 나머지 칸은 모두 지나갈 수 있다. 아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있다. 따라서, 크기가 같은 물고기는 먹을 수 없지만, 그 물고기가 있는 칸은 지나갈 수 있다.

아기 상어가 어디로 이동할지 결정하는 방법은 아래와 같다.

- 더 이상 먹을 수 있는 물고기가 공간에 없다면 아기 상어는 엄마 상어에게 도움을 요청한다.
- 먹을 수 있는 물고기가 1마리라면, 그 물고기를 먹으러 간다.
- 먹을 수 있는 물고기가 1마리보다 많다면, 거리가 가장 가까운 물고기를 먹으러 간다.
  - 거리는 아기 상어가 있는 칸에서 물고기가 있는 칸으로 이동할 때, 지나야하는 칸의 개수의 최솟값이다.
  - 거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기, 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.

아기 상어의 이동은 1초 걸리고, 물고기를 먹는데 걸리는 시간은 없다고 가정한다. 즉, 아기 상어가 먹을 수 있는 물고기가 있는 칸으로 이동했다면, 이동과 동시에 물고기를 먹는다. 물고기를 먹으면, 그 칸은 빈 칸이 된다.

아기 상어는 자신의 크기와 같은 수의 물고기를 먹을 때 마다 크기가 1 증가한다. 예를 들어, 크기가 2인 아기 상어는 물고기를 2마리 먹으면 크기가 3이 된다.

공간의 상태가 주어졌을 때, 아기 상어가 몇 초 동안 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[n], ...field] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(n, field);

// 문제 로직

const shark = {
  size: 2, // 초기 상어의 크기
  ateInThisLevel: 0, // 먹은 물고기 수 (현재 크기와 같은 양을 먹으면 크기 1 증가)
  pos: null, // 상어의 위치
};

// 상어의 처음 시작 위치 찾기
for (let r = 0; r < n; r++) {
  for (let c = 0; c < n; c++) {
    if (field[r][c] === 9) {
      shark.pos = [r, c];
      field[r][c] = 0;
    }
  }
}

// 필드 스캔, 최적의 물고기 하나 잡아먹고 탐험 계속 여부 반환하는 BFS 함수
function bfs(r, c, time) {
  const visited = Array.from(Array(n), () => Array(n).fill(0));
  visited[r][c] = 1;
  const queue = [[r, c, time]];
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  const edibleFish = []; // 먹을 수 있는 후보 물고기 위치와 거리 정보 저장할 배열

  // 필드 전체에서 후보 물고기 스캔~~
  while (queue.length) {
    const [r, c, time] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
      if (!visited[nr][nc]) {
        visited[nr][nc] = 1;
        // 먹을 수 있는 물고기이면
        if (field[nr][nc] && shark.size > field[nr][nc]) {
          edibleFish.push([nr, nc, time + 1]); // 후보 배열에 담기
        }
        // 상어의 사이즈보다 작거나 같으면
        if (shark.size >= field[nr][nc]) {
          queue.push([nr, nc, time + 1]); // 지나갈 수 있음
        }
      }
    }
  }

  let keepGoing = true;
  // 먹을 수 있는 물고기 없으면 탐험 종료
  if (!edibleFish.length) return (keepGoing = false);
  // 거리 가깝고, 위에 있고, 왼쪽에 있는 조건순으로 정렬
  edibleFish.sort((a, b) => {
    if (a[2] !== b[2]) return a[2] - b[2]; // time
    else if (a[0] !== b[0]) return a[0] - b[0]; // r
    else return a[1] - b[1]; // c
  });
  // 물고기 한마리 잡아먹기
  eat(...edibleFish[0]);
  return keepGoing;
}

// 물고기 잡아먹는 함수
function eat(r, c, time) {
  field[r][c] = 0; // 그 칸에 있던 물고기 소멸
  shark.ateInThisLevel++; // 먹은 물고기 수 +1
  if (shark.ateInThisLevel === shark.size) {
    // 자기 몸집 만큼 물고기 먹었으면 사이즈 업
    shark.size++;
    shark.ateInThisLevel = 0;
  }
  shark.pos = [r, c]; // 상어 위치 갱신
  totalTime += time; // 이동 시간 누적
}

// 작업 수행
let totalTime = 0;
while (true) {
  const [r, c] = shark.pos;
  const flag = bfs(r, c, 0);
  if (!flag) break;
}
console.log(totalTime);
