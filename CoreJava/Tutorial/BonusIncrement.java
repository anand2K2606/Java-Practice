package CoreJava.Tutorial;
import java.util.Scanner;

public class BonusIncrement
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the Salary: ");
        int salary = sc.nextInt();

        int bonus;
        if (salary >= 10000)
        {
            bonus=1000;
            System.out.println("Given Bonus is: "+ bonus);
        }
        else
        {
            bonus=2000;
            System.out.println("Given Bonus is: "+ bonus);
        }
        sc.close();
    }
}
