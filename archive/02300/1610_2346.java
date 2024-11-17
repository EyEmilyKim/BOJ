// https://www.acmicpc.net/problem/2346
/*
풍선 터뜨리기

1번부터 N번까지 N개의 풍선이 원형으로 놓여 있고. i번 풍선의 오른쪽에는 i+1번 풍선이 있고, 왼쪽에는 i-1번 풍선이 있다. 단, 1번 풍선의 왼쪽에 N번 풍선이 있고, N번 풍선의 오른쪽에 1번 풍선이 있다. 각 풍선 안에는 종이가 하나 들어있고, 종이에는 -N보다 크거나 같고, N보다 작거나 같은 정수가 하나 적혀있다. 이 풍선들을 다음과 같은 규칙으로 터뜨린다.

우선, 제일 처음에는 1번 풍선을 터뜨린다. 다음에는 풍선 안에 있는 종이를 꺼내어 그 종이에 적혀있는 값만큼 이동하여 다음 풍선을 터뜨린다. 양수가 적혀 있을 경우에는 오른쪽으로, 음수가 적혀 있을 때는 왼쪽으로 이동한다. 이동할 때에는 이미 터진 풍선은 빼고 이동한다.

예를 들어 다섯 개의 풍선 안에 차례로 3, 2, 1, -3, -1이 적혀 있었다고 하자. 이 경우 3이 적혀 있는 1번 풍선, -3이 적혀 있는 4번 풍선, -1이 적혀 있는 5번 풍선, 1이 적혀 있는 3번 풍선, 2가 적혀 있는 2번 풍선의 순서대로 터지게 된다.

 백준 제출 시 class명 : Main
*/

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.StringTokenizer;

public class Main {

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    int N = Integer.parseInt(br.readLine());
    StringTokenizer st = new StringTokenizer(br.readLine());

    Deque<int[]> deque = new ArrayDeque<>();
    int[] nums = new int[N];
    for (int i = 0; i < nums.length; i++) { // array 초기화
      nums[i] = Integer.parseInt(st.nextToken());
    }

    for (int i = 0; i < N; i++) { // deque 초기화
      deque.offer(new int[] {(i+1), nums[i]}); // {풍선 고류 index, 풍선에 적힌 번호}
    }

    while (!deque.isEmpty()) {
      int idx = deque.peek()[0]; // 프론트 풍선 고유 index
      int num = deque.peek()[1]; // 프론트 풍선에 적힌 번호
      // 첫 풍선 제거
      if (idx == 1) {
        bw.append(deque.remove()[0]+" ");
        // 첫번째 풍선에 적힌 숫자만큼 자리 이동
        if (num > 0) {
          num--; // 프론트 제거하면서 이미 한칸씩 앞당겼으므로 -1만큼 덜 이동하도록 설정
          while(num-- > 0){
            deque.offerLast(deque.pollFirst());
          }
        } else {
          while(num++ < 0){
            deque.offerFirst(deque.pollLast());
          }
        }
        // 다음 인덱스로 이동
        continue;
      } else {
        bw.append(deque.remove()[0]+" "); // 이전 숫자만큼 자리 이동이 완료된 상태이므로 현재 프론트를 제거하면 됨
        if (deque.size() == 0) break; // remove() 후 남은 풍선이 없으면 break;
        if (num > 0) {
          num--; // 프론트 제거하면서 이미 한칸씩 앞당겼으므로 -1만큼 덜 이동하도록 설정
          while (num-- > 0) {
            deque.offerLast(deque.pollFirst());
          }
        } else {
          while (num++ < 0) {
            deque.offerFirst(deque.pollLast());
          }
        }
      }
    }

    bw.flush();
    bw.close();
    br.close();
  }

}
