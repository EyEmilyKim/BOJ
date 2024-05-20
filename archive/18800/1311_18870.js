// https://www.acmicpc.net/problem/18870
/*
좌표 압축

수직선 위에 N개의 좌표 X1, X2, ..., XN이 있다. 이 좌표에 좌표 압축을 적용하려고 한다.
Xi를 좌표 압축한 결과 X'i의 값은 Xi > Xj를 만족하는 서로 다른 좌표 Xj의 개수와 같아야 한다.
X1, X2, ..., XN에 좌표 압축을 적용한 결과 X'1, X'2, ..., X'N를 출력해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const coords = input[0].split(' ').map(Number);
// console.log(N, coords);

// 문제 로직

/** 
 Xi를 좌표 압축한 결과 X'i의 값은 Xi > Xj를 만족하는 서로 다른 좌표 Xj의 개수
 => 즉 해당 X값 보다 작은 서로 다른 X좌표 수
 => 모든 좌표 중복없이 오름차순 정렬했을 때 인덱스 값과 같다.

 그런데 단순히 index 값을 매번 새로 탐색하게 되면
 uniqSort.indexOf(number) 이 부분이 O(N^2)이라, N은 최대 100만이므로 시간초과가 난다..

 그래서 각각의 index 값을 딕셔너리로 만들어서 1:1 대응으로 알아낼 수 있게 했다.
 */

const uniqSort = [...new Set(coords)].sort((a, b) => a - b);
// console.log(arr);

let result = '';
// 방법 1 : 시간초과
// coords.forEach((i) => (result += uniqSort.indexOf(i) + ' '));

// 방법 2 : 성공
let dic = {};
uniqSort.forEach((i, idx) => (dic[i] = idx));
// console.log(dic);
coords.forEach((i) => (result += dic[i] + ' '));

console.log(result.trim());
