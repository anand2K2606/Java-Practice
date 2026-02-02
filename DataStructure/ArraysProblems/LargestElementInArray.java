package DataStructure.ArraysProblems;

public class LargestElementInArray
{
    public static void main(String[] args) {

        int[] num= {13,432, 322, 2142, 32423, 32};

        int max = Integer.MIN_VALUE;

        for (int i = 0; i < num.length; i++)
        {
            if (num[i] > max)
            {
                max = num[i];
            }
        }
        System.out.println("Largest element in an Array: "+ max);
    }
}