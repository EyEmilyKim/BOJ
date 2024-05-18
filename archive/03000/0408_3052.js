// https://www.acmicpc.net/problem/3052
/*
나머지

두 자연수 A와 B가 있을 때, A%B는 A를 B로 나눈 나머지 이다. 예를 들어, 7, 14, 27, 38을 3으로 나눈 나머지는 1, 2, 0, 2이다. 

수 10개를 입력받은 뒤, 이를 42로 나눈 나머지를 구한다. 그 다음 서로 다른 값이 몇 개 있는지 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((val) => +val);
// console.log(input);

// 문제 로직
let result = [];
input.forEach((i) => {
  if (!result.includes(i % 42)) result.push(i % 42);
});
// console.log(result);
console.log(result.length);

/**
 입력값 파싱 단계에서 trim() 없으니 오답처리 됨..
 => 그냥 안전하게 잊지 말고 꼭 넣어주자.

 가끔가다 테스트케이스의 맨 뒤에 '\n'이 붙는 것이 있다고 얼핏 들은 것 같아요 그래서 trim을 써주지 않으면 ['a', 'b', 'c', '']처럼 배열에 공백을 가진 원소가 들어갈 수 있기 때문에 틀린 것 같습니다.
 */
