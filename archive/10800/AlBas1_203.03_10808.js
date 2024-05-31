// https://www.acmicpc.net/problem/10808
/*
알파벳 개수

알파벳 소문자로만 이루어진 단어 S가 주어진다. 각 알파벳이 단어에 몇 개가 포함되어 있는지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
// 개수 딕셔너리
const dic = Array.from(input).reduce((acc, i) => {
  acc[i] = (acc[i] || 0) + 1;
  return acc;
}, {});
// console.log(dic); // { b: 1, a: 1, e: 1, k: 1, j: 1, o: 2, n: 1 }

// 알파벳 26자 순회하며 개수 확인 & 출력
const result = [];
const eng = Array.from('abcdefghijklmnopqrstuvwxyz');
eng.forEach((i) => result.push(dic[i] || 0));
console.log(result.join(' '));
