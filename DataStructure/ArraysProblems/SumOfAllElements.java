package DataStructure.ArraysProblems;

public class SumOfAllElements
{
    public static void main(String[] args) {

        int[] num = {2,3,4,54,5,6};
        int sum = 0;
        for (int i = 0; i < num.length;i++)
        {

            sum = sum + num[i];
        }
        System.out.println("Sum of All Elements: "+ sum);
    }
}
