// https://www.acmicpc.net/step/54
/*
영단어 암기는 괴로워

화은이는 이번 영어 시험에서 틀린 문제를 바탕으로 영어 단어 암기를 하려고 한다. 그 과정에서 효율적으로 영어 단어를 외우기 위해 영어 단어장을 만들려 하고 있다. 화은이가 만들고자 하는 단어장의 단어 순서는 다음과 같은 우선순위를 차례로 적용하여 만들어진다.

- 자주 나오는 단어일수록 앞에 배치한다.
- 해당 단어의 길이가 길수록 앞에 배치한다.
- 알파벳 사전 순으로 앞에 있는 단어일수록 앞에 배치한다
 
$M$보다 짧은 길이의 단어의 경우 읽는 것만으로도 외울 수 있기 때문에 길이가 
$M$이상인 단어들만 외운다고 한다. 화은이가 괴로운 영단어 암기를 효율적으로 할 수 있도록 단어장을 만들어 주자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
// console.log(N, M, input);

// 문제 로직

// 길이가 M 보다 짧은 단어 제거 & 등장 횟수 카운트
const cnt = new Map();
for (let i of input) {
  if (i.length >= M) cnt.set(i, (cnt.get(i) || 0) + 1);
}
// console.log(cnt);

// 등장횟수 많음, 긴 단어, 알파벳 순으로 배치
const result = [...cnt]
  .sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0].length === b[0].length) {
        return a[0] < b[0] ? -1 : 1; // [1]
      } else {
        return b[0].length - a[0].length;
      }
    } else {
      return b[1] - a[1];
    }
  })
  .map((i) => i[0]);

// 결과 출력
console.log(result.join('\n'));

/**
 * [1] 부분 
  1) return a[0] - b[0]; 으로 쓰면 실패
  2) return a[0] < b[0] ? -1 : 1; 로 쓰면 통과
  => 숫자는 1번 방식으로도 정렬 가능하지만, 문자열은 2번 방식처럼 해줘야 함!
 */
