// https://www.acmicpc.net/problem/30804
/*
과일 탕후루

은하는 긴 막대에 N개의 과일이 꽂혀있는 과일 탕후루를 만들었습니다. 과일의 각 종류에는 1부터 9까지의 번호가 붙어있고, 앞쪽부터 차례로 S_1, S_2, ..., S_N번 과일이 꽂혀있습니다. 과일 탕후루를 다 만든 은하가 주문을 다시 확인해보니 과일을 두 종류 이하로 사용해달라는 요청이 있었습니다.

탕후루를 다시 만들 시간이 없었던 은하는, 막대의 앞쪽과 뒤쪽에서 몇 개의 과일을 빼서 두 종류 이하의 과일만 남기기로 했습니다. 앞에서 a개, 뒤에서 b개의 과일을 빼면 S_{a+1}, S_{a+2}, ..., S_{N-b-1}, S_{N-b}$번 과일, 총 N-(a+b)개가 꽂혀있는 탕후루가 됩니다. (0 <= a, b;  a+b < N)

이렇게 만들 수 있는 과일을 두 종류 이하로 사용한 탕후루 중에서, 과일의 개수가 가장 많은 탕후루의 과일 개수를 구하세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const n = +input[0];
const tang = input[1].split(' ').map(Number);
// console.log(n, tang);

// 문제 로직
/**
 * 탕후루 배열의 왼쪽 끝, 오른쪽 끝 index 옮겨가며 가능한 최대 길이 찾는 투포인터 알고리즘
 * 과일 종류가 많지 않으므로(최대 9종), 단순하게 종류 당 개수 담을 배열 준비해두고, 각 종류마다 몇개의 과일을 꼬치에 남길 수 있는지 모든 경우 탐색하며 전체 길이 최대값 갱신
 */

// 각 종류 당 꽂힌 과일 개수 저장할 배열
const cntEaFruit = new Array(n + 1).fill(0);

// 양끝 포인터 옮겨가며 남길 수 있는 최대 과일 갯수 확인하는 함수
function sol(left, right, cnt, kind, maxCnt) {
  // 우측 포인터가 배열 마지막에 도달하면 return
  if (right == n) return maxCnt;
  // 우측 포인터가 도달한 과일이 새로운 과일이면 종류 수 증가
  if (cntEaFruit[tang[right]] == 0) kind++;

  // 도달한 과일 종류의 개수 및 배열 길이 증가
  cntEaFruit[tang[right]]++;
  cnt++;

  // 과일 종류가 2개를 넘게 되면 왼쪽 포인터 이동 (=앞에서 한 개 빼기)
  if (kind > 2) {
    cntEaFruit[tang[left]]--; // 왼쪽 포인터가 가리켰던 과일 수 -1
    cnt--; // 배열 길이 감소
    // 1개만 있던 과일을 뺐다면 종류 -1
    if (cntEaFruit[tang[left]] == 0) kind--;
    left++; // 왼쪽 포인터 이동
  }

  // 최대값 갱신, 재귀 호출
  maxCnt = Math.max(cnt, maxCnt);
  // console.log('maxCnt', maxCnt, cntEaFruit.join(','));
  return sol(left, right + 1, cnt, kind, maxCnt);
}

// 함수 실행, 출력
const result = sol(0, 0, 0, 0, 0);
console.log(result);
