package DataStructure.ArraysProblems;

import java.util.Arrays;

public class SortArrayInDescending
{
    public static void main(String[] args)
    {
        int[] num = {13, 432, 322, 2142, 32423, 32};

        Arrays.sort(num); // ascending

        // reverse the array
        for (int i = 0; i < num.length / 2; i++)
        {
            int temp = num[i];
            num[i] = num[num.length - 1 - i];
            num[num.length - 1 - i] = temp;
        }
        System.out.println(Arrays.toString(num));
    }
}