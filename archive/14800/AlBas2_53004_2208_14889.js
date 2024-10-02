// https://www.acmicpc.net/problem/14889
/*
스타트와 링크

오늘은 스타트링크에 다니는 사람들이 모여서 축구를 해보려고 한다. 축구는 평일 오후에 하고 의무 참석도 아니다. 축구를 하기 위해 모인 사람은 총 N명이고 신기하게도 N은 짝수이다. 이제 N/2명으로 이루어진 스타트 팀과 링크 팀으로 사람들을 나눠야 한다.

BOJ를 운영하는 회사 답게 사람에게 번호를 1부터 N까지로 배정했고, 아래와 같은 능력치를 조사했다. 능력치 Sij는 i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치이다. 팀의 능력치는 팀에 속한 모든 쌍의 능력치 Sij의 합이다. Sij는 Sji와 다를 수도 있으며, i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치는 Sij와 Sji이다.

N=4이고, S가 아래와 같은 경우를 살펴보자.

\	1	2	3	4
1	 	1	2	3
2	4	 	5	6
3	7	1	 	2
4	3	4	5	 

예를 들어, 1, 2번이 스타트 팀, 3, 4번이 링크 팀에 속한 경우에 두 팀의 능력치는 아래와 같다.
- 스타트 팀: S12 + S21 = 1 + 4 = 5
- 링크 팀: S34 + S43 = 2 + 5 = 7

1, 3번이 스타트 팀, 2, 4번이 링크 팀에 속하면, 두 팀의 능력치는 아래와 같다.
- 스타트 팀: S13 + S31 = 2 + 7 = 9
- 링크 팀: S24 + S42 = 6 + 4 = 10

축구를 재미있게 하기 위해서 스타트 팀의 능력치와 링크 팀의 능력치의 차이를 최소로 하려고 한다. 위의 예제와 같은 경우에는 1, 4번이 스타트 팀, 2, 3번 팀이 링크 팀에 속하면 스타트 팀의 능력치는 6, 링크 팀의 능력치는 6이 되어서 차이가 0이 되고 이 값이 최소이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const synergy = input.map((row) => row.split(' ').map(Number));
// console.log(N, synergy);

// 문제 로직
/**
 * 백트래킹(조합). 브루트 포스.
 * 팀 조합을 백트래킹으로 구하고, 매번 각 팀 총력 비교, 갱신.
 */

// 가능한 팀 조합 구성하여 최소 총력 차 구하는 함수
function solution(N, synergy) {
  const allMember = new Array(N).fill(0).map((v, idx) => (v = idx)); // 모든 선수 번호
  const cntOneTeam = N / 2; // 팀 당 인원수
  const visited = new Array(N).fill(false); // 선수별 차출 여부
  let minForceDiff = 100 * cntOneTeam; // 최소 총력 차

  function recursive(arr1, cnt, idx) {
    if (cnt === cntOneTeam) {
      team1 = [...arr1];
      team2 = allMember.filter((v) => !team1.includes(v));
      const teamForces = [team1, team2].map((t) => getTeamForce(t, synergy));
      minForceDiff = checkMinForceDiff(teamForces, minForceDiff);
      return;
    }
    for (let i = idx; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      recursive([...arr1, i], cnt + 1, i);
      visited[i] = false;
    }
  }

  recursive([], 0, 0);
  return minForceDiff;
}

// 팀원 능력치 합산하는 함수
function getTeamForce(team, synergy) {
  let sum = 0;
  let mem = team.length;
  for (let i = 0; i < mem; i++) {
    for (let j = 0; j < mem; j++) {
      sum += synergy[team[i]][team[j]];
    }
  }
  // console.log(team, sum);
  return sum;
}

// 두 팀 총력 비교, 최소 총력 차 확인하는 함수
function checkMinForceDiff([tf1, tf2], min) {
  const diff = Math.abs(tf1 - tf2);
  // console.log('--');
  // console.log(tf1, tf2, 'diff', diff, 'min', min);
  return Math.min(diff, min);
}

// 작업 수행
const result = solution(N, synergy);
console.log(result);

// 실행시간 측정 종료
console.timeEnd(`-----\n`);
