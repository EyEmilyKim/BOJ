// https://www.acmicpc.net/problem/14652
/*
나는 행복합니다~

“나는 행복합니다~ 한화라서 행복합니다~”
행복한 이 노래 가사! 그렇다. 욱제는 한화 이글스의 열렬한 이다. 욱제는 여름방학을 맞아 치킨과 맥주를 챙겨 야구장을 방문했다! 하지만 이게 웬걸? 치맥에 정신이 팔린 욱제는 그만 자신의 관중석 위치가 담긴 티켓을 잃어버리고 말았다. 욱제가 유일하게 기억하는 것이라고는 자신의 관중석 번호 K뿐이다.

당신은 한화 이글스의 감독이다. 열혈인 욱제의 방문에 깊은 감동을 받은 당신은 욱제가 잃어버린 자리를 찾아주려고 한다. 오늘 경기가 펼쳐지는 잠실구장은 세로 길이가 N, 가로 길이가 M인 N≤M 크기의 관중석을 가지고 있다. 관중석의 왼쪽 위는 (0, 0), 오른쪽 아래는 (N-1, M-1)으로 표시된다. 각 관중석에는 번호가 아래 그림처럼 매겨져있다. (0, 0)에서부터 0번으로 시작하여 오른쪽으로, 끝에 다다르면 그 아래에서 또 오른쪽으로 숫자가 증가해나가는 식이다.
...

당신은 관중석의 크기와 욱제 자리의 번호를 알고 있다. 욱제가 잃어버린 자리는 어디일까? 자리를 찾아서 욱제에게 알려주도록 하자!

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
const [N, M, K] = input.split(' ').map(Number);
// console.log(N, M, K); // 세로 N, 가로 M (N ≤ M)

// 문제 로직
function findSeat(target) {
  let num = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (num === target) return [r, c];
      num++;
    }
  }
}
console.log(findSeat(K).join(' '));
