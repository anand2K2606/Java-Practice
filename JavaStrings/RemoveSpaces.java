import java.util.Scanner;

public class RemoveSpaces
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the desired string: ");
        String input = sc.nextLine();

        String output = input.replaceAll("\\s", "");

        System.out.println(output);
        sc.close();
    }
}
