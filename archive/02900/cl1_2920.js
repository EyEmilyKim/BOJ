// https://www.acmicpc.net/problem/2920
/*
음계

다장조는 c d e f g a b C, 총 8개 음으로 이루어져있다. 이 문제에서 8개 음은 다음과 같이 숫자로 바꾸어 표현한다. c는 1로, d는 2로, ..., C를 8로 바꾼다.

1부터 8까지 차례대로 연주한다면 ascending, 8부터 1까지 차례대로 연주한다면 descending, 둘 다 아니라면 mixed 이다.

연주한 순서가 주어졌을 때, 이것이 ascending인지, descending인지, 아니면 mixed인지 판별하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((i) => +i);
console.log('input', input);

// 문제 로직

// 오름차순, 내림차순 판별 메서드

const origin = input.slice(); // 비교를 위해 입력 받은 배열 따로 복사

const isAsc = (arr) => {
  let result = 1;
  arr.sort((a, b) => a - b);
  // console.log('isAsc', arr);
  for (let i = 0; i < arr.length; i++) {
    if (origin[i] !== arr[i]) {
      result = 0;
      break;
    }
  }
  // console.log(result);
  return result;
};

const isDesc = (arr) => {
  let result = 1;
  arr.sort((a, b) => b - a);
  // console.log('isDesc', arr);
  for (let i = 0; i < arr.length; i++) {
    if (origin[i] !== arr[i]) {
      result = 0;
      break;
    }
  }
  // console.log(result);
  return result;
};

// 출력
if (isAsc(input)) console.log('ascending');
else if (isDesc(input)) console.log('descending');
else console.log('mixed');

/**
 * 배열.slice() 메서드  : 배열을 부분 또는 전체복사
  첫 인자를 시작 인덱스, 두번째 인자를 종료(포함안함)할 인덱스로 받는다.
  인자를 생략하면 전체를 복사한다.
  
  var originalArray = [1, 2, 3, 4, 5];
  var copiedArray = originalArray.slice(1, 4);
  console.log(copiedArray); // 출력: [2, 3, 4]

 * 또 다른 배열 복사 방법에는 아래도 있다. 성능 차이는 크지 않음.

  var originalArray = [1, 2, 3, 4, 5];
  var copiedArray = [...originalArray];
  console.log(copiedArray); // 출력: [1, 2, 3, 4, 5]
  
 * 배열은 참조 객체이므로 이런 식으로 별개 개체로 복사하지 않으면
  원본 배열 조작이 또 다른 변수에 할당된 배열에도 영향을 미치게 된다.
  var origin = [3,2,1]
  var copy = origin
  origin.sort() // [1,2,3]
  console.log(copy); // 출력: [1,2,3]
  
 */
