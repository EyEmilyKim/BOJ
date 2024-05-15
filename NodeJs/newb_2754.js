// https://www.acmicpc.net/problem/2754
/*
학점계산

어떤 사람의 C언어 성적이 주어졌을 때, 평점은 몇 점인지 출력하는 프로그램을 작성하시오.

A+: 4.3, A0: 4.0, A-: 3.7
B+: 3.3, B0: 3.0, B-: 2.7
C+: 2.3, C0: 2.0, C-: 1.7
D+: 1.3, D0: 1.0, D-: 0.7
F: 0.0

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
const grade = {
  'A+ ': 4.3,
  'A0 ': 4.0,
  'A- ': 3.7,
  'B+ ': 3.3,
  'B0 ': 3.0,
  'B- ': 2.7,
  'C+ ': 2.3,
  'C0 ': 2.0,
  'C- ': 1.7,
  'D+ ': 1.3,
  'D0 ': 1.0,
  'D- ': 0.7,
  'F ': 0.0,
};

const getScore = (str) => {
  let score = -1;
  for (let i in grade) if (i.trim() === str) score = grade[i];
  return score.toFixed(1);
};

console.log(getScore(input));

/**
 * 숫자.toFixed(n) 함수
 : 소수점 n의 자리까지 표시, n-1자리에서 반올림함.
 */
