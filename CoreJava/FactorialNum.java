package CoreJava;

import java.util.Scanner;

public class FactorialNum
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the desired number: ");
        int f = sc.nextInt();

        long fact = 1;
        for (int i = 1 ; i<=f ; i++)
        {
            fact = fact*i;
        }
        System.out.println(f+ "! = "+ fact);
        sc.close();
    }
}
