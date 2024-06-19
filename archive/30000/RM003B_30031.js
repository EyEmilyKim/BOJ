// https://www.acmicpc.net/problem/30031
/*
지폐 세기

대한민국 지폐는 천 원권, 오천 원권, 만 원권, 오만 원권으로 총 네 종류가 있다. 각 지폐의 세로 길이는 68mm로 모두 같지만, 가로 길이는 모두 다르다. 천 원권의 가로 길이는 136mm, 오천 원권의 가로 길이는 142mm, 만 원권의 가로 길이는 148mm, 오만 원권의 가로 길이는 154mm이다. 따라서 가로의 길이를 통해서 지폐의 종류를 구분할 수 있다.

수민이는 대한민국 지폐 
N장을 가지고 있다. 수민이는 종이의 크기를 재는 기계를 이용하여 각 지폐의 가로, 세로 길이를 알아냈다. 수민이가 가진 지폐의 총액을 구해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직

const dic = {
  136: 1000,
  142: 5000,
  148: 10000,
  154: 50000,
};
// console.log(dic);

let total = 0;
input.forEach((i) => {
  const width = i.split(' ')[0];
  total += dic[width];
});
console.log(total);
