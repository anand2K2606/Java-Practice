import java.util.Scanner;

public class ReverseStrWithoutSB
{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the String: ");
        String str = sc.next();

        String reverse = "";
        int len = str.length();

        for (int i = len -1 ; i >= 0; i--)
        {
            reverse = reverse + str.charAt(i);
        }
        System.out.println("The reversed string: "+ reverse);
        sc.close();
    }
}
