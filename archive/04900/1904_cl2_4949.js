// https://www.acmicpc.net/problem/4949
/*
균형잡힌 세상

세계는 균형이 잘 잡혀있어야 한다. 양과 음, 빛과 어둠 그리고 왼쪽 괄호와 오른쪽 괄호처럼 말이다.

정민이의 임무는 어떤 문자열이 주어졌을 때, 괄호들의 균형이 잘 맞춰져 있는지 판단하는 프로그램을 짜는 것이다.

문자열에 포함되는 괄호는 소괄호("()") 와 대괄호("[]")로 2종류이고, 문자열이 균형을 이루는 조건은 아래와 같다.

- 모든 왼쪽 소괄호("(")는 오른쪽 소괄호(")")와만 짝을 이뤄야 한다.
- 모든 왼쪽 대괄호("[")는 오른쪽 대괄호("]")와만 짝을 이뤄야 한다.
- 모든 오른쪽 괄호들은 자신과 짝을 이룰 수 있는 왼쪽 괄호가 존재한다.
- 모든 괄호들의 짝은 1:1 매칭만 가능하다. 즉, 괄호 하나가 둘 이상의 괄호와 짝지어지지 않는다.
- 짝을 이루는 두 괄호가 있을 때, 그 사이에 있는 문자열도 균형이 잡혀야 한다.

정민이를 도와 문자열이 주어졌을 때 균형잡힌 문자열인지 아닌지를 판단해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직
const result = [];
input.forEach((i) => {
  if (i !== '.') {
    const stack = [];
    for (let c of i) {
      if (c === '(' || c === '[') {
        stack.push(c);
      } else if (c === ')') {
        if (stack[stack.length - 1] === '(') stack.pop();
        else stack.push(c);
      } else if (c === ']') {
        if (stack[stack.length - 1] === '[') stack.pop();
        else stack.push(c);
      }
    }
    result.push(stack.length > 0 ? 'no' : 'yes');
  }
});
console.log(result.join('\n'));

/**
 * 예시 입출력 자세히 확인
 => '.'하나만 있으면 빈 문자열로 간주하고 판단 X
 */

/**
 * for (let c in i) 와 for (let c of i) 차이점
 * for...of 문법은 반복 가능한 객체(iterable, 예: 배열, 문자열, Map, Set 등)의 값을 순회합니다.
 * for...in 문법은 객체의 열거 가능한 속성의 인덱스를 순회할 때 사용합니다. 모든 열거 가능한 속성을 대상으로 하기 때문에 배열이나 객체 모두에 사용할 수 있습니다. 하지만 배열의 경우 여러 가지 이유로 for...in보다 for...of 또는 일반적인 for 루프를 사용하는 것이 더 적절할 수 있습니다.

const i = 'love';
for (let c of i) {
  console.log(c); // l, o, v, e (문자열의 각 문자)
}
for (let c in i) {
  console.log(c); // 0, 1, 2, 3 (문자열의 인덱스)
}

 */
