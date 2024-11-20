// https://www.acmicpc.net/problem/13549
/*
숨바꼭질 3

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 0초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, K] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(N, K);

// 문제 로직
/**
 * BFS
 */

// 세 가지 방법으로 타겟 찾아 이동하는 함수
function solution(start, end, max) {
  // 세 가지 이동 방법
  //prettier-ignore
  const move = {
    0 : (n) => { return ( inRange(n*2) ? n*2 : -1 ) },
    1 : (n) => { return ( inRange(n-1) ? n-1 : -1 ) },
    2 : (n) => { return ( inRange(n+1) ? n+1 : -1 ) },
  };
  function inRange(n) {
    return 0 <= n && n <= max ? true : false;
  }

  const queue = [[start, 0]]; // 타겟 찾기까지 거쳐가는 지점 저장할 큐
  let head = 0; // 큐 원소에 접근할 index
  const visited = new Array(max + 1).fill(false); // 방문 여부 배열
  visited[start] = true; // 시작점 방문 처리

  if (start === end) return 0; // 처음부터 같은 위치면 0초만에 끝.

  // 타겟 찾아 십만리..
  while (queue.length > head) {
    const [cur, sec] = queue[head++];

    if (cur === end) return sec; // 타겟 찾음 -> 소요 시간 반환 끝.

    for (let i = 0; i < 3; i++) {
      const next = move[i](cur);
      if (next === -1 || visited[next]) continue; // 좌표 밖 or 이미 방문한 곳은 pass
      queue.push([next, i === 0 ? sec : sec + 1]); // 순간이동 +0초, 걸으면 +1초
      visited[next] = true;
    }
  }
}

// 작업 수행
const result = solution(N, K, 1e5); // 1e5 = 100,000 (0 ≤ N, K ≤ 100,000)
console.log(result);
