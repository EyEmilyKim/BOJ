// https://www.acmicpc.net/problem/1264
/*
모음의 개수

영문 문장을 입력받아 모음의 개수를 세는 프로그램을 작성하시오. 모음은 'a', 'e', 'i', 'o', 'u'이며 대문자 또는 소문자이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직
const result = [];
for (let t of input) {
  const pick = t.match(/[aeiou]/gi);
  result.push(pick.length);
}
console.log(result.join('\n'));

/**
 * 정규표현식 활용
 * [aeiou]: a, e, i, o, u 중 하나의 모음 문자를 매칭
 * 플래그 - i: 대소문자 구분 없이 매칭
 * 플래그 - g: 문자열 전체에서 매칭
 * 문자열.match 메서드는 regex와 매칭되는 모든 부분을 배열로 반환
 */
