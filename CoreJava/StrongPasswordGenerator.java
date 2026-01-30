package CoreJava;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class StrongPasswordGenerator {

    private static final SecureRandom random = new SecureRandom();

    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGIT = "0123456789";
    private static final String SPECIAL = "@!#$%^&*";

    public static String generatePassword(int length) {
        if (length < 10) {
            throw new IllegalArgumentException("Password length must be at least 10");
        }

        while (true) {
            List<Character> passwordChars = new ArrayList<>();

            // Mandatory characters
            passwordChars.add(randomChar(UPPER));     // 1 uppercase
            passwordChars.add(randomChar(LOWER));     // 1 lowercase
            passwordChars.add(randomChar(DIGIT));     // 1 digit
            passwordChars.add(randomChar(SPECIAL));   // 1 special

            String allChars = UPPER + LOWER + DIGIT + SPECIAL;

            // Fill remaining characters
            while (passwordChars.size() < length) {
                passwordChars.add(randomChar(allChars));
            }

            // Shuffle characters
            Collections.shuffle(passwordChars);

            String password = toString(passwordChars);

            // Apply validations
            if (isValid(password)) {
                return password;
            }
        }
    }

    private static boolean isValid(String pwd) {
        return !isPalindrome(pwd)
                && !endsWithDigit(pwd)
                && !hasMoreThanTwoConsecutiveChars(pwd);
    }

    private static boolean isPalindrome(String s) {
        return s.equals(new StringBuilder(s).reverse().toString());
    }

    private static boolean endsWithDigit(String s) {
        return Character.isDigit(s.charAt(s.length() - 1));
    }

    private static boolean hasMoreThanTwoConsecutiveChars(String s) {
        int count = 1;
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                count++;
                if (count > 2) return true;
            } else {
                count = 1;
            }
        }
        return false;
    }

    private static char randomChar(String chars) {
        return chars.charAt(random.nextInt(chars.length()));
    }

    private static String toString(List<Character> chars) {
        StringBuilder sb = new StringBuilder();
        for (char c : chars) sb.append(c);
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(generatePassword(10));
    }
}