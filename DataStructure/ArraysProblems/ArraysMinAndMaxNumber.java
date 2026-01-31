package DataStructure.ArraysProblems;

import java.util.Scanner;

public class ArraysMinAndMaxNumber
{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the size of Array: ");
        int size = sc.nextInt();

        int[] numbers = new int[size];

        for (int i = 0; i < size; i++)
        {
            System.out.print("Enter the number at index " + i + " is: ");
            numbers[i] = sc.nextInt();
        }

        int min = Integer.MAX_VALUE;  // Start with largest possible value
        int max = Integer.MIN_VALUE;  // Start with smallest possible value

        int i = 0;
        while (i < numbers.length)
        {
            if (numbers[i] < min)
            {
                min = numbers[i];
            }
            if (numbers[i] > max)
            {
                max = numbers[i];
            }

            i++;
        }

        System.out.println("Minimum number is: " + min);
        System.out.println("Maximum number is: " + max);

        sc.close();
    }
}