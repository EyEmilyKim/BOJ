// https://www.acmicpc.net/problem/11657
/*
타임머신

N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 버스가 M개 있다. 각 버스는 A, B, C로 나타낼 수 있는데, A는 시작도시, B는 도착도시, C는 버스를 타고 이동하는데 걸리는 시간이다. 시간 C가 양수가 아닌 경우가 있다. C = 0인 경우는 순간 이동을 하는 경우, C < 0인 경우는 타임머신으로 시간을 되돌아가는 경우이다.

1번 도시에서 출발해서 나머지 도시로 가는 가장 빠른 시간을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
let [[N, M], ...data] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, M, data);

// 문제 로직
/**
 * 벨만-포드 알고리즘 : 다익스트라와 비슷.. one to all. 음수 간선이 존재할 때 사용.
=> 차이점 
다익스트라 : 매 단계마다 미방문 노드 중 최단거리 노드부터 선택하여 처리. 
  음수 간선 있을 경우 최적 해 찾을 수 없음. 
  시간 복잡도 빠름 O(ElogV) 우선순위 큐 다익스트라
벨만-포드 : 매 단계마다 모든 간선 확인해 모든 노드 간의 최단거리 구함. 순서는 상관없음.
  음수 간선 있어도 최적 해 찾을 수 있음. (음수 간선의 순환 감지할 수 있음)
 (V-1까지 모든 단계 진행 후 V번째에도 최단거리 테이블 갱신된다면 음수 간선 순환한다는 뜻)
  시간 복잡도 느림 O(VE)
=> 모든 간선 비용 양수일 때는 다익스트라, 
   음수 간선 포함되면 벨만-포드 사용한다.
(참고) https://velog.io/@kimdukbae/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%B2%A8%EB%A7%8C-%ED%8F%AC%EB%93%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Bellman-Ford-Algorithm
 */

const dist = new Array(N + 1).fill(Infinity);
dist[1] = 0;
let hasNegativeCycle = false;

for (let i = 0; i <= N; i++) {
  for (const [a, b, c] of data) {
    if (dist[a] !== Infinity && dist[b] > dist[a] + c) {
      dist[b] = dist[a] + c;

      if (i === N) hasNegativeCycle = true;
    }
  }
}
// console.log(dist);

// 결과 출력
if (hasNegativeCycle) console.log(-1);
else {
  for (let i = 2; i <= N; i++) {
    console.log(dist[i] === Infinity ? -1 : dist[i]);
  }
}
