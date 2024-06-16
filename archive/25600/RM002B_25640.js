https://www.acmicpc.net/problem/25640
/*
MBTI

진호는 요즘 유행하는 심리 검사인 MBTI에 관심이 많다. MBTI는 아래와 같이 네 가지 척도로 사람들의 성격을 구분해서, 총 16가지의 유형중에서 자신의 유형을 찾을 수 있는 심리 검사이다.
내향(I) / 외향(E)
직관(N) / 감각(S)
감정(F) / 사고(T)
인식(P) / 판단(J)
모든 유형의 목록은 다음과 같다.
INFP, ENFP, ISFP, ESFP, INTP, ENTP, ISTP, ESTP, INFJ, ENFJ, ISFJ, ESFJ, INTJ, ENTJ, ISTJ, ESTJ

진호는 N명의 친구들에게 MBTI 유형을 물어 봤다. 이 중에서 진호와 MBTI 유형이 같은 사람의 수는 얼마일까?

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const Jinho = input.shift();
const F = +input.shift();
// console.log(Jinho, F, input);

// 문제 로직
let sameType = 0;
input.forEach((i) => {
  if (i === Jinho) sameType++;
});
console.log(sameType);

