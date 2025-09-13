package CoreJava.Tutorial;
import java.util.Scanner;

public class BasicCalculator {
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("1st Input: ");
        int num1 = sc.nextInt();

        System.out.print("Operator (+, -, *, /): ");
        char operator = sc.next().trim().charAt(0); // It will take the 1st character of any string by removing extra spaces.

        System.out.print("2nd Input: ");
        int num2 = sc.nextInt();

        switch (operator)
        {
            case '+':
                int add = num1 + num2;
                System.out.println("Result: " + add);
                break;

            case '-':
                int sub = num1 - num2;
                System.out.println("Result: " + sub);
                break;

            case '*':
                int mul = num1 * num2;
                System.out.println("Result: " + mul);
                break;

            case '/':
                float div = (float)num1/num2;
                System.out.println("Result: " +div);
                break;
        }
        sc.close();
    }
}
