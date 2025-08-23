import java.util.Scanner;

public class RemoveSpacesManually
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the desired string: ");
        String input = sc.nextLine();

        String output = "";

        for (int i = 0 ; i < input.length(); i++)
        {
            char ch = input.charAt(i);
            if (ch != ' ')
            {
                output = output + ch;
            }
        }

        System.out.println(output);
        sc.close();
    }
}
