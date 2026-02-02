package DataStructure.ArraysProblems;

import java.util.Scanner;

public class SearchElementInArray
{
    public static void main(String[] args)
    {
        int[] num = {13, 432, 322, 2142, 32423, 32};

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the target number: ");
        int target = sc.nextInt();

        boolean isFound = false;

        for(int i = 0; i < num.length; i++)
        {
            if (num[i] == target)
            {
                System.out.println("The element " + target + " found at index: " + i);
                isFound = true;
            }
        }

        if (!isFound)
        {
            System.out.println("The Element " + target + " not found in the array.");
        }
        sc.close();
    }
}