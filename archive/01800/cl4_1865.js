// https://www.acmicpc.net/problem/1865
/*
웜홀

때는 2020년, 백준이는 월드나라의 한 국민이다. 월드나라에는 N개의 지점이 있고 N개의 지점 사이에는 M개의 도로와 W개의 웜홀이 있다. (단 도로는 방향이 없으며 웜홀은 방향이 있다.) 웜홀은 시작 위치에서 도착 위치로 가는 하나의 경로인데, 특이하게도 도착을 하게 되면 시작을 하였을 때보다 시간이 뒤로 가게 된다. 웜홀 내에서는 시계가 거꾸로 간다고 생각하여도 좋다.

시간 여행을 매우 좋아하는 백준이는 한 가지 궁금증에 빠졌다. 한 지점에서 출발을 하여서 시간여행을 하기 시작하여 다시 출발을 하였던 위치로 돌아왔을 때, 출발을 하였을 때보다 시간이 되돌아가 있는 경우가 있는지 없는지 궁금해졌다. 여러분은 백준이를 도와 이런 일이 가능한지 불가능한지 구하는 프로그램을 작성하여라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
let [[TC], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(TC, data);

// 문제 로직
/**
 * 벨만-포드 알고리즘
 * 음수 사이클 존재하면 YES, 아니면 NO 출력
 * "한 지점에서 출발" 이 포인트. 
=> 특정 지점이 아니고 모든 점에 대해 음수 순환 가능성 검사

 */

// 테스트 케이스 수행
const result = [];
while (TC-- > 0) {
  // 정점, 도로, 웜홀 정보 입력
  let [N, M, W] = data.shift();
  const link = [];
  while (M-- > 0) {
    const [S, E, T] = data.shift();
    link.push([S, E, T]);
    link.push([E, S, T]);
  }
  while (W-- > 0) {
    const [S, E, T] = data.shift();
    link.push([S, E, T * -1]);
  }
  // console.log('-------');
  // console.log('link', link);

  // 모든 정점에 대해 최단 소요 시간 구하기 (기본 N번 수행)
  const dist = new Array(N + 1).fill(0); // 모든 노드에 대해 탐색하므로 초기값 중요치 않음

  for (let i = 1; i <= N; i++) {
    for (let [s, e, t] of link) {
      dist[e] = Math.min(dist[s] + t, dist[e]);
    }
  }
  // console.log('dist', dist);

  // N번째 이후 추가로 시간이 줄면 음수 순환 존재한다는 뜻
  let hasMinusCycle = false;
  A: for (let i = 1; i <= N; i++) {
    for (let [s, e, t] of link) {
      if (dist[s] + t < dist[e]) {
        hasMinusCycle = true;
        break A;
      }
    }
  }
  result.push(hasMinusCycle ? 'YES' : 'NO');
}

// 결과 출력
console.log(result.join('\n'));
