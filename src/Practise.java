import java.util.Arrays;
import java.util.Scanner;

public class Practise {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter 1st number : ");
        int num1 = scanner.nextInt();

        System.out.print("Enter 2nd number : ");
        int num2 = scanner.nextInt();

        int[] num = {num1, num2};

        System.out.println(Arrays.toString(num));

        for (int ab : num)
        {
            System.out.println(ab);
        }

        System.out.println(Arrays.toString(num));
    }
}
