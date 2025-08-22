import java.util.Scanner;

public class ReverseString
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the String: ");
        String str = sc.next();

        StringBuilder Str2 = new StringBuilder(str).reverse();

        String str3 = String.valueOf(Str2);
        System.out.println(str3);

        sc.close();
    }

}