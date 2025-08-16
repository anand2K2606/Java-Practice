package Practice;

import java.util.Scanner;

public class PrimeNum {
    public static void main(String[] args) {

        System.out.print("Enter the desired number: ");
        Scanner num = new Scanner(System.in);
        long x = num.nextLong();

        if (x <= 1) {
            System.out.println("The given number " + x + " is NOT a Prime Number");
        } 
        else if (x == 2) {
            System.out.println("This is a Prime Number");
        } 
        else if (x % 2 == 0) {
            System.out.println("This is NOT a Prime Number");
        } 
        else {
            boolean isPrime = true;
            for (int i = 3; i * i <= x; i += 2) {  // check only odd numbers up to √x
                if (x % i == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) 
            {
                System.out.println("This is a Prime Number");
            } else {
                System.out.println("This is NOT a Prime Number");
            }
        }

        num.close();
    }
}
