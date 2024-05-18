// https://www.acmicpc.net/problem/24262
/*
알고리즘 수업 - 알고리즘의 수행 시간 1

입력의 크기 n이 주어지면 MenOfPassion 알고리즘 수행 시간을 예제 출력과 같은 방식으로 출력해보자.

MenOfPassion 알고리즘은 다음과 같다.

MenOfPassion(A[], n) {
    i = ⌊n / 2⌋;
    return A[i]; # 코드1
}

출력>
첫째 줄에 코드1 의 수행 횟수를 출력한다.
둘째 줄에 코드1의 수행 횟수를 다항식으로 나타내었을 때, 최고차항의 차수를 출력한다. 단, 다항식으로 나타낼 수 없거나 최고차항의 차수가 3보다 크면 4를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// // 입력값 파싱
// const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
// const input = Number(require('fs').readFileSync(path).toString().trim());
// // console.log(input);

// 문제 로직
console.log(1);
console.log(0);

/**
 * 시간 복잡도에 대한 기본 이해가 있는지를 묻는 문제.

  해당 알고리즘은 
  for 문이 0개로, 입력값 n과 상관없이 실행하게 되면 단 1번만 실행. 
  다항식으로 나타내면 0차항 + 1에 해당된다. 
  Big-O(빅오)표기법으로 O(1), 상수 시간이라고도 한다.
  따라서 실행횟수는 1, 다항식의 최고차항은 0이다.

 * 문제의 MenOfPassion 함수는 수도코드(의사코드)로 쓰여져있다.
 
 * 바닥함수와 천장함수

  바닥함수 ⌊𝑥⌋ : 정수로 내림  
    i = ⌊n / 2⌋ 
    i = n // 2
  위 2개는 같은 표현

  천장함수     : 정수로 올림
  https://ko.m.wikipedia.org/wiki/%EB%B0%94%EB%8B%A5_%ED%95%A8%EC%88%98%EC%99%80_%EC%B2%9C%EC%9E%A5_%ED%95%A8%EC%88%98

 */
