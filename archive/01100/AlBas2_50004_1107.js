// https://www.acmicpc.net/problem/1107
/*
리모컨

수빈이는 TV를 보고 있다. 수빈이는 채널을 돌리려고 했지만, 버튼을 너무 세게 누르는 바람에, 일부 숫자 버튼이 고장났다.

리모컨에는 버튼이 0부터 9까지 숫자, +와 -가 있다. +를 누르면 현재 보고있는 채널에서 +1된 채널로 이동하고, -를 누르면 -1된 채널로 이동한다. 채널 0에서 -를 누른 경우에는 채널이 변하지 않고, 채널은 무한대 만큼 있다.

수빈이가 지금 이동하려고 하는 채널은 N이다. 어떤 버튼이 고장났는지 주어졌을 때, 채널 N으로 이동하기 위해서 버튼을 최소 몇 번 눌러야하는지 구하는 프로그램을 작성하시오.

수빈이가 지금 보고 있는 채널은 100번이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, M, nums] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const broken = nums
  ? nums.split(' ').reduce((acc, v) => {
      acc[v] = true;
      return acc;
    }, {})
  : {};
// console.log(N, M, broken);

// 문제 로직
/**
 * 브루트 포스
=> 모든 발판 채널(번호 눌러서 이동 가능한 채널) 탐색, 아래 중 최소값 비교,갱신.
- 시작 채널(100) to 목표 채널 up/down 이동 수 (초기값)
- 발판 채널 to 목표 채널 up/down 이동 수 + 채널 번호 누른 횟수

 * 목표 채널보다 더 큰 숫자 채널에서 down 으로 이동할 수도 있으므로
발판 채널은 max 채널인 500,000 (0 ≤ N ≤ 500,000) 보다 더 커질 수 있음.
=> 0~9 중 어느 버튼이 고장났을지 모르므로 아예 한자리 더 높은 수까지 탐색 범위에 포함시켰다.

 */

function solution() {
  if (N === 100) return 0; // 목표 채널이 시작 채널과 같으면 이동 없음, 끝.
  if (!M) return N.length; // 고장난 버튼 없으면 숫자 눌러서 바로 이동, 끝.

  let cnt = Math.abs(N - 100);
  for (let i = 0; i < 1_000_000; i++) {
    const base_str = i.toString();
    let canJump = true;
    // 현재 발판 채널이 숫자 눌러서 이동 가능한지 확인
    for (let j = 0; j < base_str.length; j++) {
      if (broken[base_str[j]]) {
        canJump = false;
        break;
      }
    }
    // 가능하면 그 채널부터 목표 채널까지의 이동 수 + 채널 버튼 누른 횟수
    if (canJump) cnt = Math.min(cnt, Math.abs(i - N) + base_str.length);
  }
  return cnt;
}

const result = solution();
console.log(result);
