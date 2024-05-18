// https://www.acmicpc.net/problem/14681
/*
사분면 고르기

점의 좌표를 입력받아 그 점이 어느 사분면에 속하는지 알아내는 프로그램을 작성하시오. 단, x좌표와 y좌표는 모두 양수나 음수라고 가정한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split('\n');
const [x, y] = input.map((val) => +val);

// 문제 로직
let qdr = 0;
if (x > 0) {
  y > 0 ? (qdr = 1) : (qdr = 4);
} else if (x < 0) {
  y > 0 ? (qdr = 2) : (qdr = 3);
}
console.log(qdr);

/**
 * 백준 런타임 에러로 fs.readFileSync('/dev/stdin') 대신
 * ( EACCES : permission denied (권한 거부됨) )
 * fs.readFileSync(0, 'utf-8') 을 사용하면 통과된다.
 * 0 : 파일 경로로 별도의 파일이 아닌 표준 파일(standard input)을 의미하는 0 전달.
 * 'utf-8' : 인코딩 방법.
 *
 * 이 밖에 fs 모듈 대신 readline 모듈 사용하는 법도 있으나 pass.
 */
