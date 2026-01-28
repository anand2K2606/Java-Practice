package CoreJava;

import java.util.Scanner;

public class ReverseTwoNumWithoutTempVariable
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the 1st number: ");
        int num1 = sc.nextInt();

        System.out.print("Enter the 2nd number: ");
        int num2 = sc.nextInt();

        num1 = num1 + num2;
        num2 = num1 - num2;
        num1 = num1 - num2;

        System.out.println("Have look into the 1st and 2nd number: "+ num1 + " and " + num2);
    }
}
