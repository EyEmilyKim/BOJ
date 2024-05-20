// https://www.acmicpc.net/problem/1920
/*
수 찾기

N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.

입력>
다음 줄에는 N개의 정수 A[1], A[2], …, A[N]이 주어진다. 
다음 줄에는 M(1 ≤ M ≤ 100,000)이 주어진다. 
다음 줄에는 M개의 수들이 주어지는데, 이 수들이 A안에 존재하는지 알아내면 된다. 모든 정수의 범위는 -231 보다 크거나 같고 231보다 작다.

출력>
M개의 줄에 답을 출력한다. 존재하면 1을, 존재하지 않으면 0을 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const Arr = input
  .shift()
  .split(' ')
  .map((i) => +i);
const M = +input.shift();
const target = input[0].split(' ').map((i) => +i);
// console.log(N, Arr, M, target);

// 문제 로직 - 방법 1: 딕셔너리 사용
const dic = {};
Arr.forEach((i) => (dic[i] = 1));
// console.log(dic);
let result = '';
target.forEach((i) => {
  if (dic[i]) result += 1 + '\n';
  else result += 0 + '\n';
});
console.log(result.trim());

/**
  * 방법 1: 딕셔너리 사용 시 시간복잡도
 - Arr 배열 순회하며 각 요소를 키로 추가 : O(N)
 - target 배열 순회하며 딕셔너리 존재여부 확인 : O(M)
 => 전체 : O(N+M)

  * 방법 2: 이진 탐색 사용 시 시간복잡도
 - Arr 배열 정렬 : O(N log N) (보통 정렬 알고리즘의 시간 복잡도)
 - target 순회하며 이진탐색으로 포함여부 확인: O(M log N)
 => 전체 : O(N log N + M log N)

  * 방법 3: Set 객체의 has 메서드 사용 시 시간복잡도
 - Set 객체 생성 : O(N)
 - target 순회하며 포함여부 확인: O(M) 
    해시 테이블 사용하여 저장하므로 상수시간 검색이 가능
 => 전체 : O(N + M)

  * 똑같이 O(N + M)인 딕셔너리 방법, Set 방법 중에는 
 - 요소 추가, 삭제 등을 고려할 때 딕셔너리 방법이 성능 우수. 일반적으로 선호됨
 - 코드 가독성, 직관성, 간결함 면에서 Set 방법도 괜찮음. 
 - 입력 크기가 크지 않다면 성능 차이 크게 못느낄 수 있음.
 => 성능, 코드 가독성, 구현 편의성 등 고려하여 적절히 선택하면 좋다.
 */

// 문제 로직 - 방법 2: 이진 탐색 사용

// 탐색 대상 배열 정렬
Arr.sort((a, b) => a - b);
// console.log(Arr);

// 타겟 배열 순회하며 확인
const answer = []; // 포함여부 담을 배열
target.forEach((i) => {
  let isThere = 0;
  let start = 0; // 탐색 범위의 시작 index
  let end = Arr.length - 1; // 끝 index
  while (start <= end) {
    const mid = Math.floor((start + end) / 2); // 탐색 범위의 중간값...
    if (i < Arr[mid]) end = mid - 1; // 비교해서 타겟이 작으면 앞쪽 범위로.
    else if (i > Arr[mid]) start = mid + 1; // 크면 뒷쪽 범위로.
    else {
      // 같으면 포함여부 확인. 탐색 종료.
      isThere = 1;
      break;
    }
  }
  answer.push(isThere);
});

// 출력
console.log(answer.join('\n').trim());

// 문제 로직 - 방법 3: Set 객체의 has 메서드 사용

/** 
 * Set 객체는 중복을 허용하지 않고, 순서를 보장하지 않는다. 괜찮을까 ?
 - 문제 조건으로 중복하지 않는 N개의 정수가 주어지고,
 - 검색 대상이 Set 이어도 확인 대상은 어짜피 배열이므로 문제 없음 ! 
 */

const setArr = new Set(Arr);
console.log(setArr);
const result3 = target.map((i) => (setArr.has(i) ? 1 : 0));
console.log(result3);
