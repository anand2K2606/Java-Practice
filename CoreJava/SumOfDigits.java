package CoreJava;

import java.util.Scanner;

public class SumOfDigits
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the desired number: ");
        int n = sc.nextInt();

        int sum = 0;
        while (n > 0)
        {
            int digit = n % 10;   // get last digit
            sum = sum + digit;    // add it to sum
            n = n / 10;           // remove last digit
        }
        System.out.println("Sum of the number is = "+ sum);
        sc.close();
    }
}
