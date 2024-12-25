// https://www.acmicpc.net/problem/1297
/*
TV 크기

김탑은 TV를 사러 인터넷 쇼핑몰에 들어갔다. 쇼핑을 하던 중에, TV의 크기는 그 TV의 대각선의 길이로 나타낸다는 것을 알았다. 하지만, 김탑은 대각선의 길이가 같다고 해도, 실제 TV의 크기는 다를 수도 있다는 사실에 직접 TV를 보러갈걸 왜 인터넷 쇼핑을 대각선의 길이만 보고있는지 후회하고 있었다.

인터넷 쇼핑몰 관리자에게 이메일을 보내서 실제 높이와 실제 너비를 보내달라고 했지만, 관리자는 실제 높이와 실제 너비를 보내지 않고 그것의 비율을 보내왔다.

TV의 대각선 길이와, 높이 너비의 비율이 주어졌을 때, 실제 높이와 너비의 길이를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [D, H, W] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(D, H, W);

// 문제 로직
/**
 * 피타고라스 정리
 */

const d = Math.sqrt(H ** 2 + W ** 2);
const x = D / d;
const height = Math.floor(H * x);
const width = Math.floor(W * x);
console.log(`${height} ${width}`);
