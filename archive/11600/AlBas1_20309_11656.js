// https://www.acmicpc.net/problem/11656
/*
접미사 배열

접미사 배열은 문자열 S의 모든 접미사를 사전순으로 정렬해 놓은 배열이다.

baekjoon의 접미사는 baekjoon, aekjoon, ekjoon, kjoon, joon, oon, on, n 으로 총 8가지가 있고, 이를 사전순으로 정렬하면, aekjoon, baekjoon, ekjoon, joon, kjoon, n, on, oon이 된다.

문자열 S가 주어졌을 때, 모든 접미사를 사전순으로 정렬한 다음 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
// 접미사 모두 구하기
const arr = [];
for (let i = 0; i < input.length; i++) {
  arr.push(input.substring(i));
}
// console.log(arr);

// 접미사 사전순 정렬 & 출력
arr.sort();
console.log(arr.join('\n'));

/**
 * 문자열 배열은 sort() 만 써도 오름차순 정렬이 된다 !
 */

// arr.sort((a, b) => {
//   // console.log('a', a, a.length, 'b', b, b.length);
//   let idx = 0;
//   const limit = Math.min(a.length, b.length); // 있는 글자수 안에서만 비교하기
//   while (idx < limit - 1 && a[idx].charCodeAt(0) === b[idx].charCodeAt(0)) {
//     idx++;
//   }
//   if (a[idx].charCodeAt(0) === b[idx].charCodeAt(0)) {
//     // 최종 인덱스 글자가 같다면 문자열 길이 짧은 단어가 먼저
//     return a.length - b.length;
//   } else {
//     // 알파벳 오름차순
//     return a[idx].charCodeAt(0) - b[idx].charCodeAt(0);
//   }
// });
