// https://www.acmicpc.net/problem/1935
/*
후위 표기식2

후위 표기식과 각 피연산자에 대응하는 값들이 주어져 있을 때, 그 식을 계산하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const sik = input.shift();
const value = input.map((i) => +i);
// console.log(N, sik, value);

// 문제 로직 - 방법 1

// 미지수에 대입할 값 딕셔너리
const eng = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const dic = {};
for (let i = 0; i < N; i++) {
  dic[eng[i]] = value[i];
}
// console.log(dic);

// 후위 표기식 계산
/**
 규칙 : 수식 앞에서부터...
 - 피연산자는 스택에
 - 연산자를 만나면 스택 2개 pop해서 계산 후 결과값 다시 스택에 
 (단, 나중에 담은 게 우항, 먼저 담은 게 좌항)
 - 수식 끝나고 스택에 남아있는게 최종 결과값 !
 */
const sikArr = Array.from(sik);
// console.log(sikArr);
const stack = [];
sikArr.forEach((i) => {
  if (eng.includes(i)) {
    stack.push(dic[i]);
  } else {
    const right = stack.pop();
    const left = stack.pop();
    switch (i) {
      case '+':
        stack.push(left + right);
        break;
      case '-':
        stack.push(left - right);
        break;
      case '*':
        stack.push(left * right);
        break;
      case '/':
        stack.push(left / right);
        break;
    }
  }
  // console.log(i, stack);
});
console.log(stack.pop().toFixed(2));
/**
 * 숫자.toFixed(n) 함수
 : 소수점 n의 자리까지 표시, n-1자리에서 반올림함.
 */

// 문제 로직 - 방법 2 : 1번 개선Ver

// 미지수에 대입할 값 딕셔너리
// console.log('A'.charCodeAt(0)); // 65
const val = {};
for (let i = 0; i < N; i++) {
  val[String.fromCharCode(65 + i)] = value[i];
}
// console.log(val);

// 연산자와 연산 함수 딕셔너리
const operators = ['+', '-', '*', '/'];
const calculator = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

// 수식에 미지수 값 대입
const sikWithVal = Array.from(sik).map((i) => (operators.includes(i) ? i : val[i]));
// console.log(sikWithVal);

// 후위 표기식 계산
/**
 규칙 : 수식 앞에서부터...
 - 피연산자는 스택에
 - 연산자를 만나면 스택 2개 pop해서 계산 후 결과값 다시 스택에 
 (단, 나중에 담은 게 우항, 먼저 담은 게 좌항)
 - 수식 끝나고 스택에 남아있는게 최종 결과값 !
 */
const stack2 = [];
sikWithVal.forEach((i) => {
  let hang = i; // 숫자면 그 값 그대로..
  // 연산자라면 스택 2개 꺼내서 계산한 걸..
  if (operators.includes(i)) {
    const right = stack2.pop();
    const left = stack2.pop();
    let calcFunc = calculator[i];
    hang = calcFunc(left, right);
  }
  stack2.push(hang); // 스택에 담음
  // console.log(i, stack);
});
console.log(stack2.pop().toFixed(2));
/**
 * 개선점 !
 1. 알파벳 26자를 다 준비해두고 .include() 검사하는 것보다
 연산자 4개를 준비해두고 검사하는 것이 더 낫다.
 2. 수식에 미지수를 미리 대입한 뒤 전개하면 
 후위 -> 중위 변환 & 계산만 신경쓰면 되므로 깔끔하다. 
 3.객체에 함수를 담아놓고 필요에 따라 꺼내서 사용할 수 있다.
 */
