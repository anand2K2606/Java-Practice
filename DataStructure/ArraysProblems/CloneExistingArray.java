package DataStructure.ArraysProblems;

import java.util.Arrays;

public class CloneExistingArray
{
    public static void main(String[] args)
    {
        int[] num = {13, 432, 322, 2142, 32423, 32};

        int[] copy = Arrays.copyOf(num, num.length);

        System.out.println("Original: " + Arrays.toString(num));

        System.out.println("Copy: " + Arrays.toString(copy));
    }
}

