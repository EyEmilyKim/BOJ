// https://www.acmicpc.net/problem/10951
/*
A+B - 4
두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직
for (i = 0; i < input.length; i++) {
  const [A, B] = input[i].split(' ').map((val) => +val);
  console.log(A + B);
}

/**
 * 지금까지 trim() 없이도 잘만 정답처리 됐었는데, 갑자기 trim() 있고 없고 차이로 틀렸/맞 다고 나왔다..
 * 
 *  trim() 메서드의 사용 여부는 입력값의 정확한 파싱을 보장하기 위한 것.
 
입력값을 받을 때, 각 줄의 앞뒤에 공백이 있을 수 있습니다. 만약 이 공백이 포함된 채로 숫자를 파싱하게 되면, 숫자로 변환된 값에도 영향을 줄 수 있습니다. 예를 들어, " 1 2"라는 문자열을 파싱할 때, 앞뒤의 공백이 있으면 "1"과 "2"로 변환되지만, 공백이 없으면 "1"과 "2"로 정확하게 변환됩니다.

따라서 trim() 메서드를 사용하여 각 줄의 앞뒤 공백을 제거한 후에 숫자로 변환하는 것이 좋습니다. 이렇게 하면 입력값이 공백으로 구분된 정확한 숫자쌍으로 변환됩니다.
 */
