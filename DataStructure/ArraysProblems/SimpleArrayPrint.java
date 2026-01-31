package DataStructure.ArraysProblems;

import java.util.Scanner;

public class SimpleArrayPrint
{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the size of Array: ");
        int size = sc.nextInt();
        System.out.println();

        // Array declaration
        String[] names = new String[size];

        // Input with prompts
        for (int i = 0; i < size; i++)
        {
            System.out.print("Enter the name at index " + i + " is: ");
            names[i] = sc.next();
        }

        System.out.println();

        // Output
        for (int i = 0; i < names.length; i++)
        {
            System.out.println("name at "+ i + " index is: " + names[i]);
        }
        sc.close();
    }
}