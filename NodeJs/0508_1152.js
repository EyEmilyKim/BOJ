// https://www.acmicpc.net/problem/1152
/*
단어의 개수

영어 대소문자와 공백으로 이루어진 문자열이 주어진다. 이 문자열에는 몇 개의 단어가 있을까? 이를 구하는 프로그램을 작성하시오. 단, 한 단어가 여러 번 등장하면 등장한 횟수만큼 모두 세어야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

//문제 로직
const words = input.split(' ');
console.log(input === '' ? 0 : words.length);

/**
 * trim() 을 넣느냐 안넣느냐가 함정인듯
 <입력> ... "또한 문자열은 공백으로 시작하거나 끝날 수 있다."
 
 * + 함정 하나 더 ! 주어진 문자열이 공백만 있을 경우,  공백은 카운트를 안해야 하니 0 처리를 해줘야 함 !
 */
