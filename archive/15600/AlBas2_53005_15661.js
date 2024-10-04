// https://www.acmicpc.net/problem/15661
/*
링크와 스타트

오늘은 스타트링크에 다니는 사람들이 모여서 축구를 해보려고 한다. 축구는 평일 오후에 하고 의무 참석도 아니다. 축구를 하기 위해 모인 사람은 총 N명이다. 이제 스타트 팀과 링크 팀으로 사람들을 나눠야 한다. 두 팀의 인원수는 같지 않아도 되지만, 한 명 이상이어야 한다.

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
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((row) => row.split(' ').map(Number));
const [N] = input.shift();
// console.log(N, input);

// 문제 로직
/**
 * 백트래킹. 브루트포스.
 * 한 사람은 A팀 가거나 B팀 가거나. => 각 스텝 멤버별 recursive 2회씩 수행
  recursive 매개변수 num 을 선수번호로 생각하고 접근.
 * 매번 총력차 비교, 최소값 갱신.

 * 참고 : 
 "14889번 - 스타트와 링크" 풀이 방식 그대로 적용해서 
 if(cnt >= 2) {diff 비교, min 갱신} 로직만 추가하면 
 정답 나오긴 하지만, 시간초과 발생함.
 (14889번 풀이) https://www.acmicpc.net/source/84638154
 */

function solution(N, synergy) {
  const check = new Array(N).fill(0); // 데덴찌 팀 조합
  let minDiff = 100 * (N - 1); // 최소 총력차. 초기값은 최대 총력
  // let cnt = 0;

  recursive(0); // 작업 수행
  return minDiff; // 최종 최소 총력차 반환

  // 멤버별 A팀(0) or B팀(1) 조합 구하면서,
  function recursive(num) {
    if (num === N) {
      // cnt++;
      // console.log('cnt', cnt, 'check', check);
      // 전원 팀 정했으면 팀 간 총력차 비교, 최소값 갱신하기
      teamForces = getTeamForces(check, N, synergy);
      minDiff = checkTeamForceDiff(teamForces, minDiff);
      return;
    }

    check[num] = 0;
    recursive(num + 1);

    check[num] = 1;
    recursive(num + 1);
  }
}

// 팀별 총력 구하는 함수
function getTeamForces(check, N, synergy) {
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (check[i] && check[j]) sum1 += synergy[i][j] + synergy[j][i];
      if (!check[i] && !check[j]) sum2 += synergy[i][j] + synergy[j][i];
    }
  }
  // console.log(check, 'sum1', sum1, 'sum2', sum2);
  return [sum1, sum2];
}

// 두팀 총력차 비교, 최소값 갱신하는 함수
function checkTeamForceDiff([tf1, tf2], minDiff) {
  const diff = Math.abs(tf1 - tf2);
  const min = Math.min(diff, minDiff);
  // console.log('tf1', tf1, 'tf2', tf2, 'diff', diff, 'min', min);
  return min;
}

const result = solution(N, input);
console.log(result);
