// https://www.acmicpc.net/problem/10699
/*
오늘 날짜

서울의 오늘 날짜를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 문제 로직
// const date = new Date().toISOString().substring(0, 10);
// console.log(date);

const [date1, time] = new Date().toISOString().split('T');
console.log(date1);

/**
 * Date 객체를 ISOString 출력하면 아래처럼 나온다.
 2024-05-14T08:30:10.521Z
 여기서 "T" 는 단순히 날짜와 시간을 구분하는 역할일 뿐
 요일이나 기타 다른 의미를 갖는 것은 아니다.
 */
