// https://www.acmicpc.net/problem/10101
/*
삼각형 외우기

삼각형의 세 각을 입력받은 다음, 

세 각의 크기가 모두 60이면, Equilateral // 정삼각형
세 각의 합이 180이고, 두 각이 같은 경우에는 Isosceles // 이등변삼각형
세 각의 합이 180이고, 같은 각이 없는 경우에는 Scalene // 부등변삼각형
세 각의 합이 180이 아닌 경우에는 Error
를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b, c] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((val) => +val);
// console.log(a, b, c);

// 문제 로직
const sum = a + b + c;
if (sum === 180) {
  if (a === b && a === 60) console.log('Equilateral');
  else if (a !== b && b !== c && a !== c) console.log('Scalene');
  else console.log('Isosceles');
} else console.log('Error');
