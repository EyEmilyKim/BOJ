// https://www.acmicpc.net/problem/11655
/*
ROT13

ROT13은 카이사르 암호의 일종으로 영어 알파벳을 13글자씩 밀어서 만든다.

예를 들어, "Baekjoon Online Judge"를 ROT13으로 암호화하면 "Onrxwbba Bayvar Whqtr"가 된다. ROT13으로 암호화한 내용을 원래 내용으로 바꾸려면 암호화한 문자열을 다시 ROT13하면 된다. 앞에서 암호화한 문자열 "Onrxwbba Bayvar Whqtr"에 다시 ROT13을 적용하면 "Baekjoon Online Judge"가 된다.

ROT13은 알파벳 대문자와 소문자에만 적용할 수 있다. 알파벳이 아닌 글자는 원래 글자 그대로 남아 있어야 한다. 예를 들어, "One is 1"을 ROT13으로 암호화하면 "Bar vf 1"이 된다.

문자열이 주어졌을 때, "ROT13"으로 암호화한 다음 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString();
/** 함정
 * 문자열 앞뒤로 공백이 있을 수 있으니 trim()은 하면 안된다.
 * trim() 하면 '출력 형식이 잘못되었습니다' 로 채점됨.
 */
// console.log(input);

// 문제 로직
// console.log('A'.charCodeAt(0)); // 65
// console.log('a'.charCodeAt(0)); // 97
let result = '';
for (let c of input) {
  let code = c.charCodeAt(0);
  if (65 <= code && code <= 90) {
    // 대문자
    const shift = (code - 65 + 13) % 26;
    result += String.fromCharCode(65 + shift);
  } else if (97 <= code && code <= 122) {
    // 소문자
    const shift = (code - 97 + 13) % 26;
    result += String.fromCharCode(97 + shift);
  } else result += c; // 그 외 숫자 또는 문자
  // console.log(`'${c}'`, code, `'${result}'`);
}
console.log(result);
