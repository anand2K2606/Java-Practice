package DataStructure.ArraysProblems;

public class SmallestElementInArray
{
    public static void main(String[] args) {

        int[] num= {13,432, 322, 2142, 32423, 32};

        int min = Integer.MAX_VALUE;

        for (int i = 0; i < num.length; i++)
        {
            if (min > num[i])
            {
                min = num[i];
            }
        }
        System.out.println("Smallest element in an Array: "+ min);
    }
}