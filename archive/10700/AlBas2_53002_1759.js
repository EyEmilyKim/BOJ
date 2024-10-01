// https://www.acmicpc.net/problem/1759
/*
암호 만들기

바로 어제 최백준 조교가 방 열쇠를 주머니에 넣은 채 깜빡하고 서울로 가 버리는 황당한 상황에 직면한 조교들은, 702호에 새로운 보안 시스템을 설치하기로 하였다. 이 보안 시스템은 열쇠가 아닌 암호로 동작하게 되어 있는 시스템이다.

암호는 서로 다른 L개의 알파벳 소문자들로 구성되며 최소 한 개의 모음(a, e, i, o, u)과 최소 두 개의 자음으로 구성되어 있다고 알려져 있다. 또한 정렬된 문자열을 선호하는 조교들의 성향으로 미루어 보아 암호를 이루는 알파벳이 암호에서 증가하는 순서로 배열되었을 것이라고 추측된다. 즉, abc는 가능성이 있는 암호이지만 bac는 그렇지 않다.

새 보안 시스템에서 조교들이 암호로 사용했을 법한 문자의 종류는 C가지가 있다고 한다. 이 알파벳을 입수한 민식, 영식 형제는 조교들의 방에 침투하기 위해 암호를 추측해 보려고 한다. C개의 문자들이 모두 주어졌을 때, 가능성 있는 암호들을 모두 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((row) => row.split(' '));
const [L, C] = input[0].map(Number);
const alphabets = input[1].sort();
// console.log([L, C], alphabets);

// 문제 로직
/**
 * 백트래킹. 브루트 포스.
 * 알파벳 배열 제시, 자릿수 지정.
 * 조건 : 오름차순. 모음 1개 이상, 자음 2개 이상 포함.
 */

// 가능한 암호 모두 구하는 함수
const result = [];
function recursive(charSet, idx) {
  if (charSet.length === L) {
    if (checkConvention(charSet)) result.push(charSet.join(''));
    return;
  }

  for (let i = idx; i < C; i++) {
    recursive([...charSet, alphabets[i]], i + 1);
  }
}

// 암호 조건 확인하는 함수
const vowels = Array.from('aeiou');
function checkConvention(arr) {
  // 모음 1개 이상 포함?
  const usedVowels = arr.reduce((acc, v) => acc + vowels.includes(v), 0);
  if (usedVowels < 1) return false;
  // 자음 2개 이상 포함?
  if (arr.length - usedVowels < 2) return false;

  return true;
}

// 작업 수행
recursive([], 0);
console.log(result.join('\n'));
