package DataStructure.ArraysProblems;

import java.util.Arrays;

public class ReverseOfArray
{
    public static void main(String[] args)
    {
        int[] num= {13,432, 322, 2142, 32423, 32};
        
        int[] reverse = new int[num.length];

        int j = 0;

        for (int i = (num.length -1); i >= 0; i--)
        {
            reverse[j] = num[i];
            j++;
        }
        System.out.println("Reverse is: " + Arrays.toString(reverse));
    }
}
