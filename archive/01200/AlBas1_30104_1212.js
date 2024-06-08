// https://www.acmicpc.net/problem/1212
/*
8진수 2진수

8진수가 주어졌을 때, 2진수로 변환하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * 8진수에서 2진수로 바로 바꾸기 
 1. 8진수 문자열 앞에서부터 한 자리씩 3자리 2진수로 바꾸기
 2. 결과 문자열에 합하기 => 8진수
 3. 결과 문자열 앞에 나오는 0은 생략하기
 */

// 8진수 2진수로 바꾸는 함수
function octToBin(oct) {
  for (let i of oct) {
    let num = i;
    let first = '0';
    let second = '0';
    let third = '0';
    if (num >= 4) {
      first = '1';
      num -= 4;
    }
    if (num >= 2) {
      second = '1';
      num -= 2;
    }
    if (num >= 1) {
      third = '1';
      num -= 1;
    }
    const bin = first + second + third;
    // console.log(i, bin);
    return bin;
  }
}

// 입력값 각 자리 2진수로 바꿔 문자열로 합치기
let str = '';
for (let i of input) {
  str += octToBin(i);
}
// console.log(str);

// 문자열 앞자리 0 생략하고 출력

// 방법 1. 단순 조건 분기로 처리하기
// 최소값 0 => 많아도 앞 2자리만 날리면 됨.
let result1 = '';
if (str[0] === '0' && str[1] === '0') result1 = str.substring(2);
else if (str[0] === '0') result1 = str.substring(1);
else result1 = str;
console.log(result1);

// 방법 2. 정규표현식으로 처리하기
let result2 = str.replace(/^0+/, '');
console.log(input === '0' ? 0 : result2); // 입력값 0 이면 0 출력

/**
 * 문자열 앞자리 0 생략할 때 parseInt(str) 를 쓰면 틀린다.
 : parseInt 가 문자열을 10진수 숫자로 해석할 때, 입력값이 길 경우 부정확한 결과가 나올 수 있다.
 반례 - 입력값 : 333327 
 -> str 문자열    : 11011011011010111
 -> parseInt(str) : 11011011011010112
 */

/**
 * 정규 표현식 사용

 * 리터럴 표기법: 슬래시(/)로 감싸서 정규식을 정의함.
 * 리터럴 문자: 패턴과 정확히 일치하는 문자를 찾음.
 예 : let regex = /cat/; // "cat"과 일치
 
 * 메타문자: 특별한 의미를 가진 문자들
  .: 임의의 한 문자와 일치
  ^: 문자열의 시작과 일치
  $: 문자열의 끝과 일치
  *: 0회 이상 반복
  +: 1회 이상 반복
  ?: 0회 또는 1회 반복
  {n}: 정확히 n회 반복
  [...]: 문자 클래스, 대괄호 안의 문자 중 하나와 일치
  \: 이스케이프 문자, 메타문자가 아닌 문자로 취급
  
 * 특수 문자: 특정 패턴과 일치시키는 데 사용
  \d: 숫자 문자와 일치 (0-9)
  \D: 숫자가 아닌 문자와 일치
  \w: 단어 문자와 일치 (알파벳, 숫자, 밑줄)
  \W: 단어 문자가 아닌 문자와 일치
  \s: 공백 문자와 일치
  \S: 공백이 아닌 문자와 일치
  \b: 단어 경계 
    = 단어 문자(알파벳, 숫자, 밑줄)와 비단어 문자(공백, 구두점 등) 사이의 위치
    = 단어 문자와 문자열의 시작 또는 끝 사이의 위치

 * 옵션 (플래그): 정규식의 동작 방식을 변경하는 데 사용
  /g (global search)
    : 문자열 내에서 패턴과 일치하는 모든 부분 찾음. 
    g 플래그가 없으면, 첫 번째 일치 항목만 찾음.
  /i (case-insensitive search)
    : 대소문자 구분하지 않고 검색.
  /m (multi-line search)
    : 여러 줄(기준 : 줄바꿈 문자)에 걸쳐 검색 수행. 
    ^와 $가 각 줄의 시작과 끝에 매칭되도록 함.
  /u (unicode)
    : 유니코드 모드 활성화. 유니코드 문자도 올바르게 처리할 수 있게 됨.
  /s (dotAll)
    : 점(.) 문자가 개행 문자 포함하여 모든 문자와 일치하도록 함.
 */
