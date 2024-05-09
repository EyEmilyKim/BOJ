// https://www.acmicpc.net/problem/2675
/*
문자열 반복

문자열 S를 입력받은 후에, 각 문자를 R번 반복해 새 문자열 P를 만든 후 출력하는 프로그램을 작성하시오. 즉, 첫 번째 문자를 R번 반복하고, 두 번째 문자를 R번 반복하는 식으로 P를 만들면 된다. S에는 QR Code "alphanumeric" 문자만 들어있다.

QR Code "alphanumeric" 문자는 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\$%*+-./: 이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const t = Number(input.shift());
console.log(t, input);

//문제 로직
for (n = 0; n < t; n++) {
  const [R, S] = input[n].split(' ');
  // console.log(R, S);
  let result = '';

  for (i = 0; i < S.length; i++) {
    // for (j = 0; j < R; j++) {
    //   result += S[i];
    // }
    result += S[i].repeat(R);
  }
  console.log(result);
}

/**
 * 문자열 repeat() 함수
 : 문자열을 지정된 횟수만큼 반복하여 새로운 문자열을 생성합니다. 

 repeat() 메서드는 매개변수로 반복할 횟수를 받습니다. 음수 또는 Infinity가 전달되면 RangeError가 발생합니다. 또한 매개변수가 정수가 아니면 소수점을 갖는 숫자는 소수점 이하를 버립니다.

 const str = 'abc';

console.log(str.repeat(0));   // ''
console.log(str.repeat(1));   // 'abc'
console.log(str.repeat(2));   // 'abcabc'
console.log(str.repeat(1.6)); // 'abc' (1.6은 1로 반올림)
console.log(str.repeat(2.5)); // 'abcabc' (2.5는 2로 반올림)

 */
