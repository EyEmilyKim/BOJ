// https://www.acmicpc.net/problem/15686
/*
치킨 배달

크기가 N×N인 도시가 있다. 도시는 1×1크기의 칸으로 나누어져 있다. 도시의 각 칸은 빈 칸, 치킨집, 집 중 하나이다. 도시의 칸은 (r, c)와 같은 형태로 나타내고, r행 c열 또는 위에서부터 r번째 칸, 왼쪽에서부터 c번째 칸을 의미한다. r과 c는 1부터 시작한다.

이 도시에 사는 사람들은 치킨을 매우 좋아한다. 따라서, 사람들은 "치킨 거리"라는 말을 주로 사용한다. 치킨 거리는 집과 가장 가까운 치킨집 사이의 거리이다. 즉, 치킨 거리는 집을 기준으로 정해지며, 각각의 집은 치킨 거리를 가지고 있다. 도시의 치킨 거리는 모든 집의 치킨 거리의 합이다.

임의의 두 칸 (r1, c1)과 (r2, c2) 사이의 거리는 |r1-r2| + |c1-c2|로 구한다.

예를 들어, 아래와 같은 지도를 갖는 도시를 살펴보자.

0 2 0 1 0
1 0 1 0 0
0 0 0 0 0
0 0 0 1 1
0 0 0 1 2
0은 빈 칸, 1은 집, 2는 치킨집이다.

(2, 1)에 있는 집과 (1, 2)에 있는 치킨집과의 거리는 |2-1| + |1-2| = 2, (5, 5)에 있는 치킨집과의 거리는 |2-5| + |1-5| = 7이다. 따라서, (2, 1)에 있는 집의 치킨 거리는 2이다.

(5, 4)에 있는 집과 (1, 2)에 있는 치킨집과의 거리는 |5-1| + |4-2| = 6, (5, 5)에 있는 치킨집과의 거리는 |5-5| + |4-5| = 1이다. 따라서, (5, 4)에 있는 집의 치킨 거리는 1이다.

이 도시에 있는 치킨집은 모두 같은 프랜차이즈이다. 프렌차이즈 본사에서는 수익을 증가시키기 위해 일부 치킨집을 폐업시키려고 한다. 오랜 연구 끝에 이 도시에서 가장 수익을 많이 낼 수 있는  치킨집의 개수는 최대 M개라는 사실을 알아내었다.

도시에 있는 치킨집 중에서 최대 M개를 고르고, 나머지 치킨집은 모두 폐업시켜야 한다. 어떻게 고르면, 도시의 치킨 거리가 가장 작게 될지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, M], ...city] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, M, city);

// 문제 로직
/**
 * 모든 치킨집 존폐 조합 구하고(백트래킹 DFS), 치킨거리 최소값 갱신(브루트포스)
 */

// 도시 내 모든 집과 치킨집 위치값 추리기
const home = [];
const chicken = [];
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (city[r][c] === 1) home.push([r, c]);
    else if (city[r][c] === 2) chicken.push([r, c]);
  }
}

// 동네 치킨거리 최소값 구하는 함수
function getMinDistance() {
  let sum = 0;
  home.forEach(([hr, hc]) => {
    let min = Infinity;
    chicken.forEach((_, idx) => {
      if (check[idx] === true) {
        const [cr, cc] = chicken[idx];
        min = Math.min(min, Math.abs(hr - cr) + Math.abs(hc - cc));
      }
    });
    sum += min;
  });
  return sum;
}

// 치킨집 조합 바꿔가면서 동네 치킨거리 최소값 갱신하기
const check = new Array(chicken.length).fill(false); // 치킨집 운영 여부
let result = Infinity;
function dfs(idx, cnt) {
  if (cnt === M) {
    result = Math.min(result, getMinDistance());
    return;
  } else {
    for (let i = idx; i < chicken.length; i++) {
      if (check[i] === true) continue;
      check[i] = true;
      dfs(i, cnt + 1);
      check[i] = false;
    }
  }
}

// 작업 수행
dfs(0, 0);
console.log(result);
