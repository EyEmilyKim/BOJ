// https://www.acmicpc.net/problem/1389
/*
케빈 베이컨의 6단계 법칙

케빈 베이컨의 6단계 법칙에 의하면 지구에 있는 모든 사람들은 최대 6단계 이내에서 서로 아는 사람으로 연결될 수 있다. 케빈 베이컨 게임은 임의의 두 사람이 최소 몇 단계 만에 이어질 수 있는지 계산하는 게임이다.

예를 들면, 전혀 상관없을 것 같은 인하대학교의 이강호와 서강대학교의 민세희는 몇 단계만에 이어질 수 있을까?

천민호는 이강호와 같은 학교에 다니는 사이이다. 천민호와 최백준은 Baekjoon Online Judge를 통해 알게 되었다. 최백준과 김선영은 같이 Startlink를 창업했다. 김선영과 김도현은 같은 학교 동아리 소속이다. 김도현과 민세희는 같은 학교에 다니는 사이로 서로 알고 있다. 즉, 이강호-천민호-최백준-김선영-김도현-민세희 와 같이 5단계만 거치면 된다.

케빈 베이컨은 미국 헐리우드 영화배우들 끼리 케빈 베이컨 게임을 했을때 나오는 단계의 총 합이 가장 적은 사람이라고 한다.

오늘은 Baekjoon Online Judge의 유저 중에서 케빈 베이컨의 수가 가장 작은 사람을 찾으려고 한다. 케빈 베이컨 수는 모든 사람과 케빈 베이컨 게임을 했을 때, 나오는 단계의 합이다.

예를 들어, BOJ의 유저가 5명이고, 1과 3, 1과 4, 2와 3, 3과 4, 4와 5가 친구인 경우를 생각해보자.

1은 2까지 3을 통해 2단계 만에, 3까지 1단계, 4까지 1단계, 5까지 4를 통해서 2단계 만에 알 수 있다. 따라서, 케빈 베이컨의 수는 2+1+1+2 = 6이다.

2는 1까지 3을 통해서 2단계 만에, 3까지 1단계 만에, 4까지 3을 통해서 2단계 만에, 5까지 3과 4를 통해서 3단계 만에 알 수 있다. 따라서, 케빈 베이컨의 수는 2+1+2+3 = 8이다.

3은 1까지 1단계, 2까지 1단계, 4까지 1단계, 5까지 4를 통해 2단계 만에 알 수 있다. 따라서, 케빈 베이컨의 수는 1+1+1+2 = 5이다.

4는 1까지 1단계, 2까지 3을 통해 2단계, 3까지 1단계, 5까지 1단계 만에 알 수 있다. 4의 케빈 베이컨의 수는 1+2+1+1 = 5가 된다.

마지막으로 5는 1까지 4를 통해 2단계, 2까지 4와 3을 통해 3단계, 3까지 4를 통해 2단계, 4까지 1단계 만에 알 수 있다. 5의 케빈 베이컨의 수는 2+3+2+1 = 8이다.

5명의 유저 중에서 케빈 베이컨의 수가 가장 작은 사람은 3과 4이다.

BOJ 유저의 수와 친구 관계가 입력으로 주어졌을 때, 케빈 베이컨의 수가 가장 작은 사람을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
// console.log(N, M, input);

// 문제 로직

// 연결된 네트워크 입력
const graph = Array.from(new Array(N + 1), () => []);
for (let i of input) {
  const [from, to] = i.split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}
// console.log(graph);

// 각to각 bacon 값 저장할 배열 & bacon 값 구하는 BFS 함수
// *문제에서는 각 node 당 bacon 값 합만 알면 되지만 내가 궁금해서 각to각 값 저장.
const bacon_ea = Array.from(new Array(N + 1), () => [0]);
function BFS(start) {
  const visited = new Array(N + 1).fill(false);
  const queue = [[start, 0]];

  while (queue.length) {
    let [node, count] = queue.shift();
    if (!visited[node]) {
      visited[node] = true;
      bacon_ea[start][node] = count++;
      graph[node].forEach((v) => queue.push([v, count]));
    }
  }
}

// 작업 수행
for (let i = 1; i <= N; i++) BFS(i);
// console.log('bacon_ea', bacon_ea);
const bacon_sum = bacon_ea.slice(1).map((i) => i.reduce((a, b) => a + b));
// console.log('bacon_sum', bacon_sum); // 문제에서 요구한 node 당 bacon 값 합
const min = Math.min(...bacon_sum); // 최소 bacon 합
const min_bacon_node = [];
bacon_sum.forEach((i, idx) => {
  if (i === min) min_bacon_node.push(idx + 1);
}); // 최소 bacon 합 가진 사람 찾고
console.log(Math.min(...min_bacon_node)); // 번호가 가장 작은 사람 출력
