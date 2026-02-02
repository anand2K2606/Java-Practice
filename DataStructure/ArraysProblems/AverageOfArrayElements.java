package DataStructure.ArraysProblems;

public class AverageOfArrayElements
{
    public static void main(String[] args)
    {
        int[] num = {13, 432, 322, 2142, 32423, 32};

        double sum = 0;

        for (int i = 0; i < num.length; i++)
        {
           sum = sum + num[i];
        }
        double avg = sum/num.length;
        System.out.println("The average of given Array is: "+avg);
    }
}
