package BetterToKnow;

public class TernaryOperator
{
    public static void main(String[] args)
    {
      
        int num = 10;

        String result;
        result = (num % 2 == 0) ? "Even" : "Odd";

        System.out.println("The Given number "+num+" is: "+result);
    }
}
