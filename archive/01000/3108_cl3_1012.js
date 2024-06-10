// https://www.acmicpc.net/problem/1012
/*
유기농 배추

차세대 영농인 한나는 강원도 고랭지에서 유기농 배추를 재배하기로 하였다. 농약을 쓰지 않고 배추를 재배하려면 배추를 해충으로부터 보호하는 것이 중요하기 때문에, 한나는 해충 방지에 효과적인 배추흰지렁이를 구입하기로 결심한다. 이 지렁이는 배추근처에 서식하며 해충을 잡아 먹음으로써 배추를 보호한다. 특히, 어떤 배추에 배추흰지렁이가 한 마리라도 살고 있으면 이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 해충으로부터 보호받을 수 있다. 한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다.

한나가 배추를 재배하는 땅은 고르지 못해서 배추를 군데군데 심어 놓았다. 배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로 서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다. 예를 들어 배추밭이 아래와 같이 구성되어 있으면 최소 5마리의 배추흰지렁이가 필요하다. 0은 배추가 심어져 있지 않은 땅이고, 1은 배추가 심어져 있는 땅을 나타낸다.

1	1	0	0	0	0	0	0	0	0
0	1	0	0	0	0	0	0	0	0
0	0	0	0	1	0	0	0	0	0
0	0	0	0	1	0	0	0	0	0
0	0	1	1	0	0	0	1	1	1
0	0	0	0	1	0	0	1	1	1

출력>
각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = Number(input[0]);
const testCase = [];
let idx = 1;
let tmpM, tmpN, tmpK;
for (let i = 0; i < T; i++) {
  const tmp = input[idx].split(' ').map(Number);
  [tmpM, tmpN, tmpK] = [...tmp];
  const baechu = input.slice(idx + 1, idx + tmpK + 1);
  // console.log('idx', idx);
  // console.log(tmpM, tmpN, tmpK);
  // console.log(baechu);
  testCase.push([[tmpM, tmpN, tmpK], baechu]);
  idx += tmpK + 1;
}
// console.log(T, testCase);

// 문제 로직 - 방법 1 : graph 2개 사용하는 정석 풀이
/** 
 * 2차원 배열 배추 밭 그래프와 visited 그래프 만들고
 배추 밭 순회하면서 배추가 있으면 그 지점을 기점으로 상하좌우 이동하면서 visited 처리 DFS. 
 연결된 영역 다 돌고 나면 다음 unvisited 배추 지점에서 또 DFS... 
 => 새로운 배추영역마다 DFS 호출, 즉
 총 DFS 호출된 횟수 = 필요한 지렁이 수.

 * 배추밭 그래프와 visited 그래프 만들 때, 
 배추밭 시작 좌표 (0,0) 대신 (1,1)로 설정하고
 상하좌우 위치 확인할 때 배열 범위 벗어나는 오류를 피하기 위해 
 배열 사이즈 M,N +2 해서 테두리 0으로 한바퀴 둘러주면 코드가 간결해진다 !

 * 가로 세로 그래프 => 2차원 배열로 나타낼 때는 배열[세로:행][가로:열]
 */

// 각 테스트 케이스마다 작업 수행
testCase.forEach((t) => {
  const [M, N, K] = t[0];

  // 그래프 2개 준비
  const farm = Array.from(Array(N + 2), () => new Array(M + 2).fill(0)); // 배추 밭
  const visited = Array.from(Array(N + 2), () => new Array(M + 2).fill(0)); // 연결된 영역 확인용

  // 배추 밭에 배추 위치값 입력
  for (let i = 0; i < K; i++) {
    const [x, y] = t[1][i].split(' ').map(Number);
    farm[y + 1][x + 1] = 1;
  }
  // console.log(farm);

  // 상하좌우 이동하며 연결된 영역 visited 처리하는 DFS 함수
  function DFS(n, m) {
    // 현재 탐색 위치 true 로 바꿈
    visited[n][m] = 1;
    // 연결된 영역 이동해가며 재귀 탐색
    const shiftN = [0, 0, 1, -1]; // 상하 이동 위한 행 idx 조작값
    const shiftM = [1, -1, 0, 0]; // 좌우 이동 위한 열 idx 조작값
    for (let i = 0; i < 4; i++) {
      const newN = n + shiftN[i];
      const newM = m + shiftM[i];
      // console.log('n', n, 'm', m, 'newN', newN, 'newM', newM);
      if (farm[newN][newM] && !visited[newN][newM]) {
        DFS(newN, newM);
      }
    }
  }

  // 배추 밭 순회하며 DFS 돌리기
  let cnt = 0; // 필요한 지렁이 수 = DFS 호출 횟수
  for (let n = 1; n <= N; n++) {
    for (let m = 1; m <= M; m++) {
      if (farm[n][m] && !visited[n][m]) {
        cnt++;
        DFS(n, m);
      }
    }
  }
  // 지렁이 수 출력
  console.log(cnt);
});

// 문제 로직 - 방법 2 : graph 1개만 사용하는 효율 좋은 풀이
/** 
 * 방문 정보를 기억하는 그래프 추가로 가져가지 말고
 밭에서 처리 완료된 배추는 0 으로 바꿔주면 다시 DFS 걸릴 일이 없음.
 => 코드 더 심플, 시간 복잡도와 공간 복잡도까지 줄일 수 있다 !
 */

// 각 테스트 케이스마다 작업 수행
testCase.forEach((t) => {
  const [M, N, K] = t[0];

  // 그래프 1개 준비
  const farm = Array.from(Array(N + 2), () => new Array(M + 2).fill(0)); // 배추 밭

  // 배추 밭에 배추 위치값 입력
  for (let i = 0; i < K; i++) {
    const [x, y] = t[1][i].split(' ').map(Number);
    farm[y + 1][x + 1] = 1;
  }
  // console.log(farm);

  // 상하좌우 이동하며 연결된 배추 0으로 바꾸는 DFS 함수
  function DFS(n, m) {
    // 현재 탐색 위치 true 로 바꿈
    farm[n][m] = 0;
    // 연결된 영역 이동해가며 재귀 탐색
    const shiftN = [0, 0, 1, -1]; // 상하 이동 위한 행 idx 조작값
    const shiftM = [1, -1, 0, 0]; // 좌우 이동 위한 열 idx 조작값
    for (let i = 0; i < 4; i++) {
      const newN = n + shiftN[i];
      const newM = m + shiftM[i];
      // console.log('n', n, 'm', m, 'newN', newN, 'newM', newM);
      if (farm[newN][newM]) {
        DFS(newN, newM);
      }
    }
  }

  // 배추 밭 순회하며 DFS 돌리기
  let cnt = 0; // 필요한 지렁이 수 = DFS 호출 횟수
  for (let n = 1; n <= N; n++) {
    for (let m = 1; m <= M; m++) {
      if (farm[n][m]) {
        cnt++;
        DFS(n, m);
      }
    }
  }
  // 지렁이 수 출력
  console.log(cnt);
});

/**
 * TBC : Queue 를 사용하는 BFS 로도 나중에 풀어보자
 */
