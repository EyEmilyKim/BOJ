// https://www.acmicpc.net/problem/4592
/*
중복을 없애

Al의 초콜릿 망고 회사는 방문자들이 2d 단지에 얼마나 많은 초콜릿 망고가 있는지 추측할 수 있는 웹 사이트를 갖고 있다. 방문자들은 1부터 99까지의 수를 추측한 후 "제출" 버튼을 누르는데, 안타깝게도 서버로부터 응답시간이 종종 길어져 방문자들이 이성을 잃은 나머지 "제출"을 연타하는 사태가 발생한다. 이게 우리가 해결해야 할 문제다.

ACM의 직원을 도와 연타된 중복을 걸러보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
// console.log(input);

// 문제 로직
const result = [];
input.forEach((i) => {
  const [n, ...arr] = i.split(' ').map(Number);
  const tmp = [];
  for (let i = 0; i < n; i++) {
    if (tmp.at(-1) === arr[i]) continue; // 배열 끝값과 같으면 pass
    tmp.push(arr[i]);
  }
  result.push(tmp.join(' ') + ' $');
});
console.log(result.join('\n'));
