// https://www.acmicpc.net/problem/10820
/*
문자열 분석

문자열 N개가 주어진다. 이때, 문자열에 포함되어 있는 소문자, 대문자, 숫자, 공백의 개수를 구하는 프로그램을 작성하시오.

각 문자열은 알파벳 소문자, 대문자, 숫자, 공백으로만 이루어져 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);
/**
 * 함정 1
 이 문제에서는 마지막 줄 마지막 문자로 들어오는 공백도 로직에 포함시켜야 하기 때문에
 trim()을 사용하지 않아야 한다 !
 */
// console.log(input);

//문제 로직
// console.log('a'.charCodeAt(0)); // 97
// console.log('z'.charCodeAt(0)); // 122
// console.log('A'.charCodeAt(0)); // 65
// console.log('Z'.charCodeAt(0)); // 90
// console.log('0'.charCodeAt(0)); // 48
// console.log('9'.charCodeAt(0)); // 57
// console.log(' '.charCodeAt(0)); // 32
const result = [];
for (let i = 0; i < input.length; i++) {
  if (input[i] === '') continue;
  /** 함정 2
   * 빈 문자열은 '0 0 0 0' 출력이 아니라 아예 출력을 안해야 한다 ?
   */
  let lower = 0;
  let upper = 0;
  let number = 0;
  let blank = 0;
  for (let c of input[i]) {
    const code = c.charCodeAt(0);
    if (97 <= code && code <= 122) lower++;
    else if (65 <= code && code <= 90) upper++;
    else if (48 <= code && code <= 57) number++;
    else if (code === 32) blank++;
  }
  const str = `${lower} ${upper} ${number} ${blank}`;
  result.push(str);
}
console.log(result.join('\n'));
