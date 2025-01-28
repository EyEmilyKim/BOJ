// https://www.acmicpc.net/problem/24078
/*
余り (Remainder)

正の整数 X が与えられる．X を 21 で割った余りを出力せよ．

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
console.log(input % 21);
