import java.util.Scanner;

public class CountVowelConsonants
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the Desired String: ");
        String input = sc.nextLine().toLowerCase();

        //Initialise the Variable
        int vowels = 0;
        int consonants = 0;
        int spcialchar = 0;

        for (int i = 0; i < input.length(); i++)
        {
            char temp = input.charAt(i);

            if ((temp == 'a') || (temp == 'e') || (temp == 'i') || (temp == 'o') || (temp == 'u'))
            {
                vowels++;
            }
            else if(Character.isLetter(temp)) //Character.isLetter(temp) -> ensures spaces, digits, punctuation, etc. are ignored (no miscounting).
            {
                consonants++;
            }
            else
            {
                spcialchar++;
            }
        }
        System.out.println("Total vowels: " + vowels);
        System.out.println("Total consonants: " + consonants);
        System.out.println("Rest are entered Special characters: " + spcialchar);
        sc.close(); //closes Scanner class
    }
}
