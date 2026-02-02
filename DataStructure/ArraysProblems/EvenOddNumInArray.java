package DataStructure.ArraysProblems;

public class EvenOddNumInArray
{
    public static void main(String[] args)
    {
        int[] num= {13,432, 322, 2142, 32423, 32};

        int evenCount = 0;
        int oddCount = 0;

        for (int i = 0; i<num.length; i++)
        {
            if (num[i]%2 == 0)
            {
                evenCount++;
            }
            else
            {
                oddCount++;
            }
        }
        System.out.println("Count of Even numbers in an array: "+ evenCount);
        System.out.println("Count of Odd numbers in an array: "+ oddCount);
    }
}