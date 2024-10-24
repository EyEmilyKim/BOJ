// https://www.acmicpc.net/problem/25192
/*
인사성 밝은 곰곰이

알고리즘 입문방 오픈 채팅방에서는 새로운 분들이 입장을 할 때마다 곰곰티콘을 사용해 인사를 한다. 이를 본 문자열 킬러 임스는 채팅방의 기록을 수집해 그 중 곰곰티콘이 사용된 횟수를 구해 보기로 했다.

ENTER는 새로운 사람이 채팅방에 입장했음을 나타낸다. 그 외는 채팅을 입력한 유저의 닉네임을 나타낸다. 닉네임은 숫자 또는 영문 대소문자로 구성되어 있다.

새로운 사람이 입장한 이후 처음 채팅을 입력하는 사람은 반드시 곰곰티콘으로 인사를 한다. 그 외의 기록은 곰곰티콘을 쓰지 않은 평범한 채팅 기록이다.

채팅 기록 중 곰곰티콘이 사용된 횟수를 구해보자!

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [N, ...input] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(N, input);

// 문제 로직
let cnt = 0; // 곰곰티콘 쓰인 횟수
let set; // 인사한 사람 저장
for (let i of input) {
  if (i === 'ENTER') {
    set = new Set(); // 뉴비 들어오면 인사한 사람 set 초기화
  } else if (!set.has(i)) {
    cnt++; // 누가 들어오고 처음 말할 때는 곰곰티콘 인사하기
    set.add(i);
  }
}
console.log(cnt);
