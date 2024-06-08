// https://www.acmicpc.net/problem/1764
/*
듣보잡

김진영이 듣도 못한 사람의 명단과, 보도 못한 사람의 명단이 주어질 때, 듣도 보도 못한 사람의 명단을 구하는 프로그램을 작성하시오.

입력>
첫째 줄에 듣도 못한 사람의 수 N, 보도 못한 사람의 수 M이 주어진다. 
이어서 둘째 줄부터 N개의 줄에 걸쳐 듣도 못한 사람의 이름과, 
N+2째 줄부터 보도 못한 사람의 이름이 순서대로 주어진다. 
이름은 띄어쓰기 없이 알파벳 소문자로만 이루어지며, 그 길이는 20 이하이다. 
N, M은 500,000 이하의 자연수이다.
듣도 못한 사람의 명단에는 중복되는 이름이 없으며, 보도 못한 사람의 명단도 마찬가지이다.

출력>
듣보잡의 수와 그 명단을 사전순으로 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [D, B] = input.shift().split(' ').map(Number);
// console.log(D, B, input);

// 문제 로직 - 방법 1 : Set 사용

// 듣지 못한 명단
const setD = new Set(input.slice(0, D).sort());
// console.log(setD);
// 보지 못한 명단
const setB = new Set(input.slice(D).sort());
// console.log(setB);

// 듣도 보도 못한 명단
const arrDB = [];
setB.forEach((i) => {
  if (setD.has(i)) arrDB.push(i);
});
arrDB.sort();
console.log(arrDB.length);
console.log(arrDB.join('\n'));

/**
 * Array.includes(x) 보다 Set.has(x) 가 더 빠르다 !
 */

// 문제 로직 - 방법 2 : 이진탐색 & 배열 filter() 사용

// 듣지 못한 명단
const arrD = input.slice(0, D).sort();
// console.log(arrD);
// 보지 못한 명단
const arrB = input.slice(D).sort();
// console.log(arrB);

// 배열에서 타겟을 이진탐색으로 찾는 함수
function binSearch(target, arr) {
  let isThere = false;
  let start = 0;
  let end = arr.length - 1;
  let mid;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (arr[mid] > target) end = mid - 1;
    else if (arr[mid] < target) start = mid + 1;
    else return (isThere = true);
  }
  return isThere;
}
// console.log(binSearch('charlie', arrD));
// console.log(binSearch('clinton', arrD));

// 듣도 보도 못한 명단
// 길이가 짧은 명단 중 긴 명단에 존재하는 요소만 추출하기
const [longer, shorter] = arrD.length > arrB.length ? [arrD, arrB] : [arrB, arrD];
// console.log(longer);
// console.log(shorter);
const filteredDB = shorter.filter((i) => binSearch(i, longer));
filteredDB.sort(); // 사전순으로 출력
console.log(filteredDB.length);
console.log(filteredDB.join('\n'));

/**
 * 자바스크립트에서는 문자열을 부등호로 사전순으로 비교할 수 있다 !
 1. 유니코드 값 비교: 자바스크립트는 문자열을 유니코드 코드 포인트(Unicode code points)로 변환한 다음, 각 문자의 유니코드 값을 순차적으로 비교한다.
 2. 문자 단위 비교: 문자열 비교는 첫 번째 문자부터 시작해서 각각의 문자를 유니코드 값으로 비교한다. 첫 번째 문자가 같으면 두 번째 문자로 넘어가고, 두 번째 문자도 같으면 세 번째 문자로 넘어가는 식이다.
 3. 길이 비교: 만약 두 문자열이 같은 문자들로 시작하지만 길이가 다르면, 더 긴 문자열이 더 큰 것으로 간주된다. 예를 들어, 'abc'와 'abcd'를 비교할 때, 'abc' < 'abcd'가 된다.
 */
