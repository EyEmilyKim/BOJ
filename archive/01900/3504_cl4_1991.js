// https://www.acmicpc.net/problem/1991
/*
트리 순회

이진 트리를 입력받아 전위 순회(preorder traversal), 중위 순회(inorder traversal), 후위 순회(postorder traversal)한 결과를 출력하는 프로그램을 작성하시오.

예를 들어 위와 같은 이진 트리가 입력되면,

- 전위 순회한 결과 : ABDCEFG // (루트) (왼쪽 자식) (오른쪽 자식)
- 중위 순회한 결과 : DBAECFG // (왼쪽 자식) (루트) (오른쪽 자식)
- 후위 순회한 결과 : DBEGFCA // (왼쪽 자식) (오른쪽 자식) (루트)
가 된다.
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직

// 트리 데이터 입력
const tree = {};
for (let i of input) {
  const [node, left, right] = i.split(' ');
  tree[node] = [left, right];
}
// console.log(tree);

// 전위 순회하는 재귀함수
let output_pre = '';
function preorder(node) {
  if (node === '.') return;
  const [left, right] = tree[node];
  output_pre += node;
  preorder(left);
  preorder(right);
}

// 중위 순회하는 재귀함수
let output_in = '';
function inorder(node) {
  if (node === '.') return;
  const [left, right] = tree[node];
  inorder(left);
  output_in += node;
  inorder(right);
}

// 후위 순회하는 재귀함수
let output_post = '';
function postorder(node) {
  if (node === '.') return;
  const [left, right] = tree[node];
  postorder(left);
  postorder(right);
  output_post += node;
}

// 작업 수행
const result = [];
preorder('A');
result.push(output_pre);
inorder('A');
result.push(output_in);
postorder('A');
result.push(output_post);
console.log(result.join('\n'));
