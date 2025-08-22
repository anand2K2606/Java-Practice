package Practice;

import java.util.Scanner;

public class NumLargestThree
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the 1st Number: ");
        int num1 = sc.nextInt();

        System.out.print("Enter the 2nd Number: ");
        int num2 = sc.nextInt();

        System.out.print("Enter the 3rd Number: ");
        int num3 = sc.nextInt();

        if (num1 == num2 && num2 == num3)
        {
            System.out.println("All Three Entered number is same .");
        }
        else if (num1 >= num2 && num1 >= num3)
        {
            System.out.println(num1 + " Is the largest number among three");
        }
        else if (num2 >= num1 && num2 >= num3)
        {
            System.out.println(num2 + " Is the largest number among three");
        }
        else
        {
            System.out.println(num3 + " Is the largest number among three");
        }

        sc.close();
    }
}
