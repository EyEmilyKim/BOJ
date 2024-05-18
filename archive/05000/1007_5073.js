// https://www.acmicpc.net/problem/5073
/*
삼각형과 세 변

삼각형의 세 변의 길이가 주어질 때 변의 길이에 따라 다음과 같이 정의한다.

Equilateral :  세 변의 길이가 모두 같은 경우
Isosceles : 두 변의 길이만 같은 경우
Scalene : 세 변의 길이가 모두 다른 경우
단 주어진 세 변의 길이가 삼각형의 조건을 만족하지 못하는 경우에는 "Invalid" 를 출력한다. 예를 들어 6, 3, 2가 이 경우에 해당한다. 가장 긴 변의 길이보다 나머지 두 변의 길이의 합이 길지 않으면 삼각형의 조건을 만족하지 못한다.

세 변의 길이가 주어질 때 위 정의에 따른 결과를 출력하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
// console.log(input);

// 문제 로직
input.forEach((i) => {
  const [a, b, c] = i
    .split(' ')
    .map((val) => +val)
    .sort((a, b) => {
      return a - b; // 오름차순으로 정렬 (내림차순 : b-a)
    });
  // console.log(a, b, c);
  if (c >= a + b) console.log('Invalid');
  else {
    if (a === b && b === c) console.log('Equilateral');
    else if (a !== b && b !== c && a !== c) console.log('Scalene');
    else console.log('Isosceles');
  }
});

/**
 * 함정 ! 
 * 배열에서 a,b,c  순서를 오름차순으로 정리하고자 할 때
 그냥 sort() 를 쓰면 오류가 발생한다.

 예) [1,10,2].sort() -> 기대: [1,2,10] but 결과 : [1,10,2]
 avaScript의 sort() 메서드는 기본적으로 문자열로 변환한 각 요소를 비교하여 정렬합니다. 이때 문자열로 변환하면 "10"이 "2"보다 먼저오기 때문에 [1, 10, 2] 배열을 정렬하면 [1, 10, 2]가 나오게 됩니다.

 만약 숫자를 기준으로 오름차순으로 정렬하고 싶다면 다음과 같이 비교 함수를 사용할 수 있습니다:
 
  var arr = [1, 10, 2];
  
  arr.sort(function(a, b) { // 오름차순
    return a - b;
  });
  console.log(arr); // [1, 2, 10]

  arr.sort(function(a, b) { // 내림차순
    return b - a;
  });
  console.log(arr); // [10, 2, 1]

  이 코드에서 sort() 메서드에 전달된 비교 함수는 두 숫자를 받아서 a가 b보다 작으면 음수, 같으면 0, 크면 양수를 반환합니다. 이를 통해 숫자를 비교하고 오름차순으로 정렬할 수 있습니다.
 */
