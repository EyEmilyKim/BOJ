// https://www.acmicpc.net/problem/21557
/*
불꽃놀이

폴리매스 왕국의 사람들은 불의 돌을 이용해 불꽃놀이를 합니다. 오늘의 불꽃놀이는 N개의 폭죽 더미를 이용할 예정입니다.

당신은 아래 작업을 정확히 N-2번 반복해서 폭죽을 터뜨리려고 합니다.

양 끝 폭죽 더미를 제외한 폭죽 더미를 하나 고릅니다.
해당 폭죽 더미의 폭죽을 모두 터뜨립니다.
폭발한 폭죽 더미는 사라지고, 양 옆으로 가장 가까운 폭죽 더미의 높이가 1씩 감소합니다.
불꽃놀이가 끝나고 나면 두 개의 폭죽 더미만이 남습니다. 한 번 불꽃놀이에 사용한 폭죽 더미는 재사용이 불가능하기 때문에, 남은 두 폭죽 더미의 높이 중 더 큰 값을 최소화하려고 합니다. 이 값을 찾는 프로그램을 작성해 봅시다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
let A = input[1].split(' ').map(Number);
// console.log(N, A);

// 문제 로직
let i = N - 2;
while (i) {
  if (i == 1) {
    A[0]--;
    A[N - 1]--;
  } else {
    if (A[0] >= A[N - 1]) A[0]--;
    else A[N - 1]--;
  }
  i--;
}
const taller = A[0] >= A[N - 1] ? A[0] : A[N - 1];
console.log(taller);

/**
 * 과정 중간에 안쪽 어느 폭죽부터 쓰느냐는 중요하지 않다. 왜냐하면 어짜피 양끝 폭죽 2개만 남을 거니까.
 * 양쪽 끝을 최소로 남겨야 하므로 무조건 2번째 폭죽 아니면 N-1폭죽을 쓰자.
 * A[0] 과 A[N-1]의 크기를 비교해서 더 큰쪽을 -1 해주고,
 * 폭죽이 3개만 남은 마지막 회차엔 A[0], A[N-1] 모두 -1 해준다.
 */
