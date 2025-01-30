// https://www.acmicpc.net/problem/27324
/*
十進法で 2 桁の整数 N が与えられる．

N の十の位の数字と一の位の数字が同じである場合は 1 を，そうでない場合は 0 を出力せよ．

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
const isSame = input[0] == input[1] ? 1 : 0;
console.log(isSame);
