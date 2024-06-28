// https://www.acmicpc.net/problem/11723
/**
 집합

 백준 제출 시 class명 : Main 
 */

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main{
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    // 20 이 집합에 들어올 수 있는 가장 큰 수 (1 <= x <= 20)
    // 즉 21비트 정수로 표현할 수 있다 (비트 마스킹)
    // int 자료형은 4바이트 (8bit * 4 = 32bits) 이므로
    // int 자료형 변수 하나를 선언한다.
    int S = 0;
    // M 개의 명령 수행  
    StringTokenizer st;
    StringBuilder sb = new StringBuilder();
    int M = Integer.parseInt(br.readLine());
    while(M-- > 0){
      st = new StringTokenizer(br.readLine());
      String ope = st.nextToken();
      if(ope.equals("all")) S = (1 << 21)-1;
      else if(ope.equals("empty")) S = 0;
      else {
        int num = Integer.parseInt(st.nextToken());
        if(ope.equals("add")) S |= (1 << num);
        else if(ope.equals("remove")) S &= ~(1 << num);
        else if(ope.equals("check")) {
          int flag = (S&(1 << num)) == 0? 0: 1;
          sb.append(flag+"\n");
        }
        else if(ope.equals("toggle")) S ^= (1 << num);
      }
    }
    // 출력
    System.out.println(sb);
    br.close();
  }
}