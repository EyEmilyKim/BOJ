// https://www.acmicpc.net/problem/2941
/*
크로아티아 알파벳

예전에는 운영체제에서 크로아티아 알파벳을 입력할 수가 없었다. 따라서, 다음과 같이 크로아티아 알파벳을 변경해서 입력했다.

크로아티아 알파벳 / 	변경
č	c=
ć	c-
dž	dz=
đ	d-
lj	lj
nj	nj
š	s=
ž	z=

단어가 주어졌을 때, 몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.

예를 들어, ljes=njak은 크로아티아 알파벳 6개(lj, e, š, nj, a, k)로 이루어져 있다. 
dž는 무조건 하나의 알파벳으로 쓰이고, d와 ž가 분리된 것으로 보지 않는다. lj와 nj도 마찬가지이다. 위 목록에 없는 알파벳은 한 글자씩 센다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

//문제 로직
const replace = {
  'c=': 'č',
  'c-': 'ć',
  'dz=': 'dž',
  'd-': 'đ',
  lj: 'lj',
  nj: 'nj',
  's=': 'š',
  'z=': 'ž',
};
// 특수 알파벳 대체하기
let str = input;
for (let i in replace) {
  const regex = new RegExp(i, 'g');
  str = str.replaceAll(regex, replace[i]);
  // console.log(i, newString);
}
// console.log(str);
// 문자열 해체하기
let arr = str.split('');
// console.log(arr);
// 이중 알파벳 합치기
let result = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] == 'd' && arr[i + 1] == 'ž') {
    result.push(arr[i] + arr[i + 1]);
    i++;
  } else if (arr[i] == 'l' && arr[i + 1] == 'j') {
    result.push(arr[i] + arr[i + 1]);
    i++;
  } else if (arr[i] == 'n' && arr[i + 1] == 'j') {
    result.push(arr[i] + arr[i + 1]);
    i++;
  } else {
    result.push(arr[i]);
  }
}
// console.log(result);
console.log(result.length);

/**
 * 문자열 함수 replace() 와 replaceAll(),
 * 정규표현식 활용
 */
