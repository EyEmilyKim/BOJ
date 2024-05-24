// https://www.acmicpc.net/problem/17413
/*
단어 뒤집기 2

문자열 S가 주어졌을 때, 이 문자열에서 단어만 뒤집으려고 한다.

먼저, 문자열 S는 아래와과 같은 규칙을 지킨다.

알파벳 소문자('a'-'z'), 숫자('0'-'9'), 공백(' '), 특수 문자('<', '>')로만 이루어져 있다.
문자열의 시작과 끝은 공백이 아니다.
'<'와 '>'가 문자열에 있는 경우 번갈아가면서 등장하며, '<'이 먼저 등장한다. 또, 두 문자의 개수는 같다.
태그는 '<'로 시작해서 '>'로 끝나는 길이가 3 이상인 부분 문자열이고, '<'와 '>' 사이에는 알파벳 소문자와 공백만 있다. 단어는 알파벳 소문자와 숫자로 이루어진 부분 문자열이고, 연속하는 두 단어는 공백 하나로 구분한다. 태그는 단어가 아니며, 태그와 단어 사이에는 공백이 없다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
console.log(input);

// 문제 로직 - 방법 1 : 문자 하나하나 분해하여 상태에 따라 처리

/**
 * 태그/ 단어/ 공백 구분해서 처리 후 result 배열에 저장..
 * 태그 수집중, 단어 수집중 상태 변수 사용
 => 태그 : '<' 만나면 String 쭉 받아서 '>' 만나면 result에 저장
 => 단어 : stack 에 담다가 '<' 만나면 거꾸로 꺼내 result에 저장
 => 공백 : 태그 수집중이면 그대로 진행, 문자 수집중이면 거꾸로 꺼내 result 에 저장

 * 단어 수집이 끝나는 것을 ' ' 만났을 때로 통일하기 위해
 입력 받은 문장 맨 마지막에 임의로 ' ' 추가하여 처리 후 출력시 trim().
 */

const arr = Array.from(input + ' ');
// console.log(arr, arr.length);

const result = []; // 결과물 받을 배열
let doingTag = false; // 상태 변수 : 태그 수집중
let doingWord = false; // 상태 변수 : 단어 수집중
let tag = ''; // 태그 수집 내용 저장할 변수
let stack = []; // 단어 수집 내용 저장할 변수

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === '<') {
    doingWord = false;
    if (stack.length) {
      let word = '';
      stack.reverse().forEach((i) => (word += i));
      result.push(word);
      stack = [];
    }
    doingTag = true;
    tag = arr[i];
  } else if (arr[i] === '>') {
    tag += arr[i];
    result.push(tag);
    tag = '';
    doingTag = false;
  } else if (arr[i] === ' ') {
    if (doingWord) {
      if (stack.length) {
        let word = '';
        stack.reverse().forEach((i) => (word += i));
        word += arr[i];
        result.push(word);
        stack = [];
      }
    } else if (doingTag) {
      tag += arr[i];
    } else {
      result.push(arr[i]);
    }
  } else {
    if (doingTag) tag += arr[i];
    else {
      doingWord = true;
      stack.push(arr[i]);
    }
  }
  // console.log(
  //   i,
  //   `'${arr[i]}'`,
  //   'doingTag',
  //   doingTag,
  //   `'${tag}'`,
  //   'doingWord',
  //   doingWord,
  //   `'${stack.join('')}'`
  // );
  // console.log('result', result);
}

console.log(result.join('').trim());

// 문제 로직 - 방법 2 : 정규표현식, replace() 사용
// 시간과 메모리 효율이 방법 1보다 눈에 보이게 좋다.

const regExp = /<[a-z\s]+>|[a-z0-9]+/g;
/**
 * '/' 와 '/' 사이에 정규 표현식 패턴을 정의한다.
  - '|'
  : 또는 (OR) 연산자. 주어진 패턴 중 하나와 매칭되는 부분을 찾는다.
 - <[a-z\s]+>
  : '<' 로 시작하고 '>' 로 끝나는 태그를 찾는다. 
  소문자 알파벳 (a-z)와 공백 문자 (\s)가 하나 이상 존재한다.
 - [a-z0-9]+
  : 소문자 알파벳 (a-z)와 숫자 (0-9)가 하나 이상 존재하는 단어를 찾는다.
 - g: 전역 검색 플래그. 문자열 전체에서 모든 매칭 부분을 찾는다.
 */

const result2 = input.replace(regExp, (word) => {
  return word.startsWith('<') ? word : word.split('').reverse().join('');
});
/**
 * String.replace(regExp, callback)
 : regExp와 매칭되는 부분을 찾아서 callback 함수로 처리한다.
  callback 함수의 매개변수 word는 매칭된 문자열을 받는다.
 */

console.log(result2);
