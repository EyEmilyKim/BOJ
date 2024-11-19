// https://www.acmicpc.net/problem/2096
/*
내려가기

N줄에 0 이상 9 이하의 숫자가 세 개씩 적혀 있다. 내려가기 게임을 하고 있는데, 이 게임은 첫 줄에서 시작해서 마지막 줄에서 끝나게 되는 놀이이다.

먼저 처음에 적혀 있는 세 개의 숫자 중에서 하나를 골라서 시작하게 된다. 그리고 다음 줄로 내려가는데, 다음 줄로 내려갈 때에는 다음과 같은 제약 조건이 있다. 바로 아래의 수로 넘어가거나, 아니면 바로 아래의 수와 붙어 있는 수로만 이동할 수 있다는 것이다. 이 제약 조건을 그림으로 나타내어 보면 다음과 같다.

...

별표는 현재 위치이고, 그 아랫 줄의 파란 동그라미는 원룡이가 다음 줄로 내려갈 수 있는 위치이며, 빨간 가위표는 원룡이가 내려갈 수 없는 위치가 된다. 숫자표가 주어져 있을 때, 얻을 수 있는 최대 점수, 최소 점수를 구하는 프로그램을 작성하시오. 점수는 원룡이가 위치한 곳의 수의 합이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class Main {

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    
    int N = Integer.parseInt(br.readLine());
    int[] maxDp = new int[3]; // 각 칸으로 내려오며 누적 최대값 갱신
    int[] minDp = new int[3]; // 각 칸으로 내려오며 누적 최소값 갱신

    // N줄에 걸쳐 반복
    for (int i=0; i<N; i++) {
      StringTokenizer st = new StringTokenizer(br.readLine());

      int cur0 = Integer.parseInt(st.nextToken());
      int cur1 = Integer.parseInt(st.nextToken());
      int cur2 = Integer.parseInt(st.nextToken());

      if (i == 0) {
        maxDp[0] = minDp[0] = cur0;
        maxDp[1] = minDp[1] = cur1;
        maxDp[2] = minDp[2] = cur2;
      } else {
        // 누적 최대값 갱신
        int prevMaxDp_0 = maxDp[0];
        int prevMaxDp_2 = maxDp[2];
        maxDp[0] = Math.max(maxDp[0], maxDp[1]) + cur0;
        maxDp[2] = Math.max(maxDp[1], maxDp[2]) + cur2;
        maxDp[1] = Math.max(Math.max(prevMaxDp_0, prevMaxDp_2), maxDp[1]) + cur1;
        // 누적 최소값 갱신
        int prevMinDp_0 = minDp[0];
        int prevMinDp_2 = minDp[2];
        minDp[0] = Math.min(minDp[0], minDp[1]) + cur0;
        minDp[2] = Math.min(minDp[1], minDp[2]) + cur2;
        minDp[1] = Math.min(Math.min(prevMinDp_0, prevMinDp_2), minDp[1]) + cur1;
      }
    }

    int max = Math.max(Math.max(maxDp[0],maxDp[1]), maxDp[2]);
    int min = Math.min(Math.min(minDp[0],minDp[1]), minDp[2]);  
    bw.write( max + " " + min);

    bw.flush();
    bw.close();
    br.close();
  }

}  
