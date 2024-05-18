// https://www.acmicpc.net/problem/25206
/*
너의 평점은

치훈이의 전공평점을 계산해주는 프로그램을 작성해보자.
전공평점은 전공과목별 (학점 × 과목평점)의 합을 학점의 총합으로 나눈 값이다.
인하대학교 컴퓨터공학과의 등급에 따른 과목평점은 다음 표와 같다.
A+	4.5
A0	4.0
B+	3.5
B0	3.0
C+	2.5
C0	2.0
D+	1.5
D0	1.0
F	0.0
P/F 과목의 경우 등급이 P또는 F로 표시되는데, 등급이 P인 과목은 계산에서 제외해야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

//문제 로직
let table = {
  'A+	': 4.5,
  'A0	': 4.0,
  'B+	': 3.5,
  'B0	': 3.0,
  'C+	': 2.5,
  'C0	': 2.0,
  'D+	': 1.5,
  'D0	': 1.0,
  'F	': 0.0,
};
let sumCredit = 0;
let sumTotalScore = 0;
input.forEach((i) => {
  const [title, credit] = i.split(' ');
  let score = -1; // P: -1
  for (let x in table) {
    if (i.split(' ')[2] == x.trim()) score = table[x];
  }
  // console.log(title, credit, score);

  // 계산하기
  if (score >= 0) {
    // P등급 과목 제외하고
    sumCredit += Number(credit);
    sumTotalScore += Number(credit) * score;
  }
});
console.log(sumTotalScore / sumCredit);
