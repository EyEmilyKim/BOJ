// https://www.acmicpc.net/problem/10989
/**
 수 정렬하기 3

 백준 제출 시 class명 : Main 
 */

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {

  public void solution() throws Exception{
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in)); 
    StringBuilder sb = new StringBuilder();

    int N = Integer.parseInt(br.readLine());
    int[] arr = new int[N];

    for(int i=0; i<N; i++){
      arr[i] = Integer.parseInt(br.readLine());
    }

    Arrays.sort(arr);

    for(int i = 0; i<N; i++){
      sb.append(arr[i]).append('\n');
    }

    System.out.println(sb);
    
    br.close();
  }

  public static void main(String[] args) throws Exception {
    new Main().solution();
  }
}

/**
 * 방법 2가지 참고
 1. Arrays.sort O(NlogN) ~ O(n2) <- 
 2. 카운팅 정렬 O(N) 
 */