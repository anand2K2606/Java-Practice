import java.util.Scanner;

public class PalindromeString
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the desired string: ");
        String input = sc.nextLine().toLowerCase();

        String reverse = new StringBuilder(input).reverse().toString();
        System.out.println("The reversed string is: "+reverse);

        if (input.equals(reverse))
        {
            System.out.println("The Given String Is Palindrome: " + input);
        }
        else
        {
            System.out.println("The Given String Is Not Palindrome: " + input);
        }
        sc.close();
    }
}
