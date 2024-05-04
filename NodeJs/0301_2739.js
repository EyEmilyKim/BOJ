// https://www.acmicpc.net/problem/2739
/*
N을 입력받은 뒤, 구구단 N단을 출력하는 프로그램을 작성하시오. 출력 형식에 맞춰서 출력하면 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const n = Number(require('fs').readFileSync('example.txt').toString());
// console.log(n);

// 문제 로직
for (i = 1; i < 10; i++) {
  console.log(`${n} * ${i} = ${n * i}`);
}
