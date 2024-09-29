// https://www.acmicpc.net/problem/10971
/*
외판원 순회 2

외판원 순회 문제는 영어로 Traveling Salesman problem (TSP) 라고 불리는 문제로 computer science 분야에서 가장 중요하게 취급되는 문제 중 하나이다. 여러 가지 변종 문제가 있으나, 여기서는 가장 일반적인 형태의 문제를 살펴보자.

1번부터 N번까지 번호가 매겨져 있는 도시들이 있고, 도시들 사이에는 길이 있다. (길이 없을 수도 있다) 이제 한 외판원이 어느 한 도시에서 출발해 N개의 도시를 모두 거쳐 다시 원래의 도시로 돌아오는 순회 여행 경로를 계획하려고 한다. 단, 한 번 갔던 도시로는 다시 갈 수 없다. (맨 마지막에 여행을 출발했던 도시로 돌아오는 것은 예외) 이런 여행 경로는 여러 가지가 있을 수 있는데, 가장 적은 비용을 들이는 여행 계획을 세우고자 한다.

각 도시간에 이동하는데 드는 비용은 행렬 W[i][j]형태로 주어진다. W[i][j]는 도시 i에서 도시 j로 가기 위한 비용을 나타낸다. 비용은 대칭적이지 않다. 즉, W[i][j] 는 W[j][i]와 다를 수 있다. 모든 도시간의 비용은 양의 정수이다. W[i][i]는 항상 0이다. 경우에 따라서 도시 i에서 도시 j로 갈 수 없는 경우도 있으며 이럴 경우 W[i][j]=0이라고 하자.

N과 비용 행렬이 주어졌을 때, 가장 적은 비용을 들이는 외판원의 순회 여행 경로를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const cost = input.map((r) => r.split(' ').map(Number));
const maxOneWay = 1e6; // 1,000,000
// console.log(N, cost, maxOneWay);

// 문제 로직
/**
 * 브루트 포스, 백트래킹.
 * 모든 순회 경로 순열을 구한 뒤, 비용 계산하면서 최소값 갱신.
 * 경로 순열 모두 구한 다음(함수1) 그걸 다 돌면서 체크(함수2)하려 하니 출력초과..
=> 하나의 경로 나올 때마다 바로바로 최소비용 확인하는 걸로 수정.
 */

// 경로 순열 만들고 그때마다 비용 체크하는 함수
const visited = new Array(N).fill(false);
const route = [];
function makeRouteAndCheckCost(cnt) {
  if (cnt === N) {
    checkMinCost([...route, route[0]]); // 최소 비용 확인
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    route.push(i);
    makeRouteAndCheckCost(cnt + 1);
    route.pop();
    visited[i] = false;
  }
}

// 경로의 모든 도시 순회하며 최소 비용 확인하는 함수
let minCost = N * maxOneWay; // 초기값은 최대 비용
function checkMinCost(route) {
  let sum = 0;
  for (let i = 0; i <= N; i++) {
    // 출발지로 돌아왔으면 경비 최소값 비교, 갱신
    if (i == N) minCost = Math.min(minCost, sum);
    // 경로별 비용 합산
    else {
      // 길이 없으면 이 경로는 무효
      if (!cost[route[i]][route[i + 1]]) break;
      else sum += cost[route[i]][route[i + 1]];
    }
  }
  // console.log('route', route, 'sum', sum, 'min', minCost);
}

// 작업 수행
makeRouteAndCheckCost(0);
console.log(minCost);
