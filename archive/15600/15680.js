// https://www.acmicpc.net/problem/15680
/*
연세대학교

연세대학교의 영문명은 YONSEI, 슬로건은 Leading the Way to the Future이다.

이를 출력하는 프로그램을 작성해보도록 하자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
console.log(input === 1 ? 'Leading the Way to the Future' : 'YONSEI');
