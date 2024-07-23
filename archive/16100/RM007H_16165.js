// https://www.acmicpc.net/problem/16165
/*
걸그룹 마스터 준석이

정우는 소문난 걸그룹 덕후이다. 정우의 친구 준석이도 걸그룹을 좋아하지만 이름을 잘 외우지 못한다는 문제가 있었다. 정우는 친구를 위해 걸그룹 개인과 팀의 이름을 검색하여 외우게 하는 퀴즈 프로그램을 만들고자 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
let idx = 0;
const team_mem = [];
for (let i = 0; i < N; i++) {
  const team = input[idx++];
  const num = +input[idx++];
  const member = new Set();
  for (let j = 0; j < num; j++) member.add(input[idx++]);
  // console.log(team, num, member);
  team_mem.push([team, member]);
}
// console.log(team_mem);
const quiz = input.slice(idx);
// console.log(quiz);

// 작업 수행
const result = [];
for (let i = 0; i < M * 2; i += 2) {
  const name = quiz[i];
  const type = +quiz[i + 1];
  // 0 : 팀 이름 => 멤버 사전순
  if (type === 0) {
    team_mem.forEach((t) => {
      if (t[0] === name) {
        const member = Array.from(t[1]);
        result.push(member.sort().join('\n'));
      }
    });
  }
  // 1 : 멤버 이름 => 팀 이름
  else if (type === 1) {
    team_mem.forEach((t) => {
      if (t[1].has(name)) result.push(t[0]);
    });
  }
}
console.log(result.join('\n'));
