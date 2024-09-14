// https://www.acmicpc.net/problem/15650
/*
N과 M (2)

자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

- 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
- 고른 수열은 오름차순이어야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, M] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(N, M);

// 문제 로직
/**
 * 백트래킹 "조합"
 * N과 M (1) 은 순열, 이번 문제는 조합. "고른 수열은 오름차순이어야 한다"
=> 이미 나온 조합과 중복되지 않도록, 항상 앞 칸보다 큰 숫자로만 채움.
 * (관련 문제) N과 M (1) - https://www.acmicpc.net/problem/15649
 * (참고) https://blog.encrypted.gg/945?category=773649
 */

let numSet = []; // 숫자 M 개 채울 배열
// 숫자 사용/미사용 구분
const check = new Array(N).fill(0).reduce((acc, v, idx) => {
  acc[idx + 1] = v;
  return acc;
}, {});
// console.log('check', check, '\n\n');

let result = [];
// 숫자 오름차순으로 순회하며 "앞 칸보다 큰 숫자로만" 칸 채우는 DFS 함수
function dfs(cnt, start) {
  // console.log('cnt', cnt, 'start', start, 'numSet', numSet);

  if (cnt === M) {
    // 하나의 numSet 완성하고 나면
    result.push(numSet.join(' ')); // 결과 저장
    // console.log('---');
    return; // 재귀 끝
  }

  for (let i = start; i <= N; i++) {
    if (!check[i]) {
      numSet.push(i);
      check[i] = 1;
      // console.log('check', check);
      dfs(cnt + 1, i);
      numSet.pop(); // 한 칸 되돌리고
      check[i] = 0; // 다음 조합 선택 위해 숫자 사용여부 초기화
      // console.log('check', check, 'reset', i);
    }
  }
}

// 작업 수행
dfs(0, 1);
console.log(result.join('\n'));
