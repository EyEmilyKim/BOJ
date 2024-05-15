// https://www.acmicpc.net/problem/1181
/*
단어 정렬

알파벳 소문자로 이루어진 N개의 단어가 들어오면 아래와 같은 조건에 따라 정렬하는 프로그램을 작성하시오.

길이가 짧은 것부터
길이가 같으면 사전 순으로
단, 중복된 단어는 하나만 남기고 제거해야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, ...word] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(N, word);

// 문제 로직

// 중복 단어 제거
const unique = [...new Set(word)];
// console.log(unique);

// 정렬 - 1. 길이가 짧은 것 부터 2. 길이가 같으면 사전순
unique.sort((a, b) => {
  if (a.length > b.length) return 1;
  else if (a.length === b.length && a > b) return 1;
  else return -1;
});
const result = unique.join('\n');
console.log(result.trim());

/**
 * '<' , '>' 연산자를 이용해 문자열의 순서를 비교할 수 있다.
 문자열의 ASCII 값을 '사전 순서'대로 비교

 * sort((a,b)=>{...}) 에서 비교 함수의 반환값은 정렬 순서를 결정한다.
 - 0보다 작은 경우 (-1)
  : 첫 번째 인자를 두 번째 인자보다 앞에 놓음. a 다음 b
 - 0보다 큰 경우 (1)
  : 첫 번째 인자를 두 번째 인자보다 뒤에 놓음. b 다음 a
 - 0인 경우
  : 순서를 변경하지 않음. 
 */
