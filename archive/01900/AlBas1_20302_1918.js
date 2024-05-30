// https://www.acmicpc.net/problem/1918
/*
후위 표기식

수식은 일반적으로 3가지 표기법으로 표현할 수 있다. 연산자가 피연산자 가운데 위치하는 중위 표기법(일반적으로 우리가 쓰는 방법이다), 연산자가 피연산자 앞에 위치하는 전위 표기법(prefix notation), 연산자가 피연산자 뒤에 위치하는 후위 표기법(postfix notation)이 그것이다. 예를 들어 중위 표기법으로 표현된 a+b는 전위 표기법으로는 +ab이고, 후위 표기법으로는 ab+가 된다.

이 문제에서 우리가 다룰 표기법은 후위 표기법이다. 후위 표기법은 위에서 말한 법과 같이 연산자가 피연산자 뒤에 위치하는 방법이다. 이 방법의 장점은 다음과 같다. 우리가 흔히 쓰는 중위 표기식 같은 경우에는 덧셈과 곱셈의 우선순위에 차이가 있어 왼쪽부터 차례로 계산할 수 없지만 후위 표기식을 사용하면 순서를 적절히 조절하여 순서를 정해줄 수 있다. 또한 같은 방법으로 괄호 등도 필요 없게 된다. 예를 들어 a+b*c를 후위 표기식으로 바꾸면 abc*+가 된다.

중위 표기식을 후위 표기식으로 바꾸는 방법을 간단히 설명하면 이렇다. 우선 주어진 중위 표기식을 연산자의 우선순위에 따라 괄호로 묶어준다. 그런 다음에 괄호 안의 연산자를 괄호의 오른쪽으로 옮겨주면 된다.

예를 들어 a+b*c는 (a+(b*c))의 식과 같게 된다. 그 다음에 안에 있는 괄호의 연산자 *를 괄호 밖으로 꺼내게 되면 (a+bc*)가 된다. 마지막으로 또 +를 괄호의 오른쪽으로 고치면 abc*+가 되게 된다.

다른 예를 들어 그림으로 표현하면 A+B*C-D/E를 완전하게 괄호로 묶고 연산자를 이동시킬 장소를 표시하면 다음과 같이 된다.

결과: ABC*+DE/-

이러한 사실을 알고 중위 표기식이 주어졌을 때 후위 표기식으로 고치는 프로그램을 작성하시오

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * 연산 우선순위
  1. 괄호 내부
  2. *, / 
  3. +, -

 * 중위 -> 후위 표기식 변환 규칙 : 식 앞에서 부터...
  1. 숫자는 그대로 출력한다.
  2. '('는 스택에 추가한다.
  3. ')'가 오면 '(' 만나기 전까지 스택을 pop 하여 출력하고 '('와 ')'는 사라진다.
  4. + , - 는 같은 depth 내에 있는 연산자 차례로 pop 해 출력 후 자기자신 push.
    '(' 만나기 전까지는 같은 depth 이다.
  5. * , / 는 스택 top 이 같은 우선순위인 *, / 이면 pop & 출력 후 자기자신 push.
  6. 모든 수식을 다 순회했다면 스택이 빌 때까지 pop하여 출력한다.
 */
const stack = [];
let result = '';
for (let i of input) {
  if (i === '(') {
    stack.push(i);
  } else if (i === ')') {
    while (stack[stack.length - 1] !== '(') {
      result += stack.pop();
    }
    stack.pop(); // '(' 삭제
  } else if (i === '+' || i === '-') {
    while (stack.length && stack[stack.length - 1] !== '(') result += stack.pop();
    stack.push(i);
  } else if (i === '*' || i === '/') {
    while ((stack.length && stack[stack.length - 1] === '*') || stack[stack.length - 1] === '/')
      result += stack.pop();
    stack.push(i);
  } else {
    result += i;
  }
  // console.log(i, '_', `stack: [${stack}]`, `result: '${result}'`);
}
while (stack.length) {
  result += stack.pop();
}
console.log(result);

/**
 * 후위 표기식 (참고)
  https://todaycode.tistory.com/73

 * 추가 예제 
  : ((A-B)*(C+D)-E)/(F+G-H)*I
  => AB-CD+*E-FG+H-/I*
 */
