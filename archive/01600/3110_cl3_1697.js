// https://www.acmicpc.net/problem/1697
/*
숨바꼭질

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
const [sumin, target] = input.split(' ').map(Number);
// console.log(sumin, target);

// 문제 로직
// 동생에게 도달할 때까지 걷거나 순간이동 해서 찾아가는 bfs 함수
function bfs() {
  const max = 100000; // 0 <= 점 N,K <= 100000
  const visited = new Array(max + 1).fill(0); // 방문여부 그래프 (0부터 max까지)
  const queue = []; // 새로 도달한 위치와 소요시간 저장할 큐
  let head = 0; // 느린 shift() 대신 queue에 접근할 idx
  queue.push([sumin, 0]); // 시작위치 저장
  visited[sumin] = 1; // 시작위치 방문처리
  // 큐 하나하나 기점 삼아 안가본 위치 탐색 반복
  while (head < queue.length) {
    let [cur, sec] = queue[head++];
    if (cur === target) return sec; // 동생에게 도달하면 소요시간 반환, 게임 끝
    for (let next of [cur - 1, cur + 1, cur * 2]) {
      if (0 <= next && next <= max && !visited[next]) {
        visited[next] = 1;
        queue.push([next, sec + 1]);
      }
    }
  }
}
// 탐색 및 출력
console.log(bfs());
