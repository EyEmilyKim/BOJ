// https://www.acmicpc.net/problem/31859
/*
SMUPC NAME

연재는 제4회 SMUPC에 출전하는 사람들을 위해 SMUPC NAME을 만들어주려고 한다. SMUPC NAME을 만드는 방법은 아래와 같다.

1. 출전자의 영어 이름에서 알파벳이 중복되지 않도록 추출한다. 특정 알파벳이 여러 번 등장한다면 처음 등장한 경우를 제외하고 해당 알파벳을 버린다.
2. 1번을 통해 만들어진 문자열 맨 뒤에 1번 과정에서 버려진 문자의 총개수에 4를 더한 값을 붙인다.
3. 2번을 통해 만들어진 문자열 맨 앞에 출전 등록 번호에 1906을 더한 값을 붙인다.
4. 3번을 통해 만들어진 문자열을 뒤집는다.
5. 4번을 통해 만들어진 문자열 맨 앞에 "smupc_"를 붙인다.
출전 등록 번호가 2이며 "yeonjaechoi" 라는 영어 이름을 가진 사람의 SMUPC NAME을 규칙에 따라 만들면 다음과 같다.
yeonjachi
yeonjachi6
1908yeonjachi6
6ihcajnoey8091
smupc_6ihcajnoey8091

출전 등록 번호와 영어 이름이 주어지면 그 사람의 SMUPC NAME을 출력하자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(' ');
const [N, S] = [+input[0], input[1]];
// console.log(N, S);

// 문제 로직
// 1. 중복 알파벳 추출
const set = new Set();
let drop = 0;
for (let c of S) {
  if (set.has(c)) drop++;
  else set.add(c);
}
// console.log('set', set, 'drop', drop);
// 2. 뒤에 버려진 문자 총개수 +4
let str = '';
for (let s of set) str += s;
// console.log('str', str);
// 3. 앞에 출전 등록 번호 +1906
const name = String(N + 1906) + str + String(drop + 4);
// console.log('name', name);
// 4. 문자열 뒤집기
let revName = '';
const len = name.length;
for (let i = len - 1; i >= 0; i--) revName += String(name[i]);
// console.log('revName', revName);
// 5. 앞에 +"smupc_"
const result = 'smupc_' + revName;
console.log(result);
