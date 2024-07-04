// https://www.acmicpc.net/problem/30979
/*
유치원생 파댕이 돌보기

유치원생 파댕이는 아직 어리기 때문에 단것을 매우 좋아한다.
또한, 파댕이는 사탕을 주지 않으면 시도 때도 없이 울곤 한다.

파댕이를 사랑하는 여러분은 일정 시간 동안 파댕이를 돌봐주기로 했다. 여러분은 파댕이를 돌보는 동안 파댕이가 우는 것을 보고 싶지 않기에, 파댕이가 울지 않도록 사탕을 챙겨왔다. 하지만 파댕이를 빨리 보고 싶은 마음에 급하게 사탕을 챙기느라, 돌보는 동안 파댕이가 울지 않게 만들 수 있는 충분한 사탕의 개수인지 확인하지 못했다. 여러분이 가지고 있는 사탕으로 파댕이를 돌보는 동안 파댕이를 울지 않게 만들 수 있는지 알아보자!

여러분은 T분 동안 파댕이를 돌봐야 하며, N개의 사탕을 가지고 있다. 파댕이는 사탕의 맛에 따라 울음을 그치는 시간이 다르며, 사탕의 맛이 F일 때 F분 동안 울음을 멈춘다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input[0];
const N = +input[1];
const candy = input[2].split(' ').map(Number);
// console.log(T, N, candy);

// 문제 로직
const sum = candy.reduce((a, b) => a + b);
let result = 'Padaeng_i ';
if (sum >= T) result += 'Happy';
else result += 'Cry';
console.log(result);
