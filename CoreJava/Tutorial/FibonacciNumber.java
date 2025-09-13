package CoreJava.Tutorial;
import java.util.Scanner;

public class FibonacciNumber {
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the index to know the Fibonacci number: ");
        int index = sc.nextInt();

        if (index == 0 || index == 1)
        {
            System.out.println("The Given Fibonacci is: "+ index);
        }
        else
        {
            int first = 0;
            int second = 1;

            int count = 2;
            while (count <= index)
            {
                int temp = second;
                second = first + second;
                first = temp;
                count++;
            }
            System.out.println("For the given index Fibonacci number is: " + second);
        }
        sc.close();
    }
}
