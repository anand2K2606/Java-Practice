package Practice;

import java.util.Scanner;

public class EvenOrOdd {
    public static void main(String[] args)
    {
        System.out.print("Enter Your Desired Number: ");
        Scanner num = new Scanner(System.in);
        int n= num.nextInt();

        if (n%2==0)
        {
            
            System.out.println("Number is Even");

        }
        else
        {
            System.out.println("Number is Odd");

        }
        
    }

}
