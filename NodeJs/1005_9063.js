// https://www.acmicpc.net/problem/9063
/*
대지

“ 6.25 이전의 개인소유 대지들은 99%가 남북, 동서 방향으로 평행한 직사각형 모양이었으므로, 임씨의 이름이 새겨진 옥구슬이 나오는 모든 지점을 포함하는 가장 작은 남북, 동서 방향으로 평행한 변을 갖는 직사각형의 대지를 임씨의 소유로 인정한다.” 

임씨의 이름이 새겨진 옥구슬의 위치 N 개가 주어질 때에, 임씨에게 돌아갈 대지의 넓이를 계산하는 프로그램을 작성하시오. 단, 옥구슬의 위치는 2 차원 정수 좌표로 주어지고 옥구슬은 같은 위치에 여러 개가 발견될 수도 있으며, x 축의 양의방향을 동쪽, y 축의 양의방향을 북쪽이라고 가정한다. 

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, ...dots] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(N, dots);

// 문제 로직

// X좌표 배열, Y좌표 배열 모으기
const X = [];
const Y = [];
dots.forEach((i) => {
  const [x, y] = i.split(' ').map((val) => +val);
  X.push(x);
  Y.push(y);
});
// console.log(X);
// console.log(Y);

// 바깥 변의 길이, 넓이 구하기
const hrzn = Math.abs(Math.max(...X) - Math.min(...X));
const vrtc = Math.abs(Math.max(...Y) - Math.min(...Y));
// console.log(hrzn, vrtc);
const width = hrzn * vrtc;
console.log(width);
