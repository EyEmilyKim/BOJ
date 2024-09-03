// https://www.acmicpc.net/problem/11403
/*
경로 찾기

가중치 없는 방향 그래프 G가 주어졌을 때, 모든 정점 (i, j)에 대해서, i에서 j로 가는 길이가 양수인 경로가 있는지 없는지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const graph = input.map((i) => i.split(' ').map(Number));
// console.log(N, graph);

// 문제 로직
/**
 * 경로가 존재한다 => 중간 정점 거쳐서 도달할 수 있다
 * 중간 정점을 설정하고 바꿔가면서, 모든 정점 i to j 탐색해서 
 도달 가능한 graph[i][j] = 1 로 바꿔줌
 * Floyd-Warshall 알고리즘 : 모든 정점에서 모든 정점 탐색
 (참고 : https://blog.naver.com/ndb796/221234427842)
 */

// Floyd-Warshall 함수
function fw(N, matrix) {
  // k 는 거쳐갈 중간 정점
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // k 를 거쳐 i -> j 도달 가능 => 경로 존재 => 1
        if (matrix[i][k] && matrix[k][j]) {
          matrix[i][j] = 1;
        }
      }
    }
  }
}

// 작업 수행
fw(N, graph);
console.log(graph.map((i) => i.join(' ')).join('\n'));
