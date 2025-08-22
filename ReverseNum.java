package Practice;
import java.util.Scanner;

public class ReverseNum
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter The Desired Number: ");
        int n = sc.nextInt();

        int rev  = 0;
        while (n > 0)
        {
            int digit = n%10;
            rev = rev*10+digit;
            n = n/10;
        }
        System.out.println("The Reverse Of Given Number Is: "+ rev);
        sc.close();
    }
}
