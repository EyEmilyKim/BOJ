// https://www.acmicpc.net/problem/23746
/*
문자열 압축 해제

특정 소문자 문자열 패턴을 대문자 한 글자로 압축하는 프로그램 SPC(String Pattern Compressor)가 있다.
예를 들어, 다음과 같은 방법으로 압축하는 경우, “aabbaaac”는 “ABAC”로 압축된다.

소문자 문자열 패턴 ->	대문자 
  aa  -> A 
  bba -> B 
  c   -> C 

압축 프로그램과 압축된 문자열이 주어지면, 압축되기 전 문자열의 일부를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const dic = {}; // 압축 패턴 딕셔너리
for (let i = 1; i <= N; i++) {
  const [before, after] = input[i].split(' ');
  dic[after] = before;
}
const target = input[N + 1];
const [S, E] = input[N + 2].split(' ').map(Number);
// console.log(input);
// console.log(N, dic, target, [S, E]);

// 문제 로직
let decode = '';
for (let c of target) {
  decode += dic[c];
}
// console.log(decode);
const answer = decode.substring(S - 1, E);
console.log(answer);
